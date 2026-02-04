# Single Database Configuration

## Overview

The GitHubRecap backend uses **one MongoDB database** for all services. This is optimal for your use case with max 2-3 admins and minimal data storage.

---

## Database Structure

**Connection String**: Single `DATABASE_URL` in `back.env`

```
mongodb+srv://githubRecap:githubRecap@cluster0.6tgxrro.mongodb.net/
```

**Collections** (3 total):

### 1. `users` collection (appService)

- User accounts for public access
- Fields: email, username, password, otpCode, refreshToken, isVerified
- Access via: `appService/src/prisma.js`

### 2. `admins` collection (appService)

- Admin accounts (max 2-3 admins)
- Fields: email, username, name, contact, password, role, otpCode, refreshToken, isVerified
- Access via: `appService/src/prisma.js`

### 3. `recap_data` collection (dataService)

- GitHub recap data by year
- Fields: year (unique), title, payload (comprehensive GitHub data), imageUrl
- Access via: `dataService/src/prisma.js`

---

## Why Single Database?

✅ **Simplicity**: One connection string to manage  
✅ **Cost Effective**: No need for multiple databases  
✅ **Small Scale**: Max 2-3 admins, minimal data volume  
✅ **Clear Separation**: Different collections prevent data conflicts  
✅ **Easier Deployment**: Single DATABASE_URL environment variable  
✅ **MongoDB Atlas Free Tier**: 512MB storage is more than enough

---

## Collection Separation

Each service has its own Prisma schema pointing to the same DATABASE_URL:

### appService Prisma Schema

```prisma
// backend/appService/prisma/schema.prisma
datasource db {
  provider = "mongodb"
  url      = env("DATABASE_URL")  // Same URL
}

model User { ... }      // Creates 'users' collection
model Admin { ... }     // Creates 'admins' collection
```

### dataService Prisma Schema

```prisma
// backend/dataService/prisma/schema.prisma
datasource db {
  provider = "mongodb"
  url      = env("DATABASE_URL")  // Same URL
}

model RecapData {
  ...
  @@map("recap_data")   // Creates 'recap_data' collection
}
```

**Result**: Both services connect to the same database but work with different collections, maintaining clean separation.

---

## Setup Commands

### 1. Generate Prisma Clients

```bash
npm run build:prisma
```

Runs:

- `prisma generate --schema=./appService/prisma/schema.prisma`
- `prisma generate --schema=./dataService/prisma/schema.prisma`

Each generates its own Prisma Client pointing to the same database.

### 2. Push Schemas to MongoDB

```bash
npm run db:push        # Creates: users, admins collections
npm run db:push:data   # Creates: recap_data collection
```

Both commands connect to the same `DATABASE_URL` but create their respective collections.

---

## Data Isolation

Even though all data is in one database, there's complete isolation:

| Service     | Collections       | Access Pattern                        |
| ----------- | ----------------- | ------------------------------------- |
| appService  | `users`, `admins` | Only queries users/admins collections |
| dataService | `recap_data`      | Only queries recap_data collection    |

**No Cross-Service Queries**: Services don't access each other's collections, maintaining proper boundaries.

---

## Scaling Considerations

### Current (Small Scale)

- Max 2-3 admins
- Limited recap data (one record per year)
- Single database is perfect

### Future (If Needed)

If your app scales to:

- 100+ admins
- High traffic (1M+ requests/day)
- Large data volume (10GB+)

**Then consider**:

- Separate databases for services
- MongoDB Atlas cluster with sharding
- Read replicas for better performance

But for now, **single database is the optimal choice**! 🎯

---

## Environment Configuration

### backend/back.env

```bash
# Single database for all services
DATABASE_URL=mongodb+srv://user:pass@cluster.mongodb.net/githubRecap
```

### Why No Database Name in URL?

MongoDB Atlas connection strings don't require a database name in the URL. Prisma automatically:

1. Connects to the cluster
2. Uses the database name from the connection (or creates it if needed)
3. Creates collections based on your models

---

## Collection Names

| Prisma Model | Collection Name | Reason                           |
| ------------ | --------------- | -------------------------------- |
| `User`       | `users`         | Default pluralization            |
| `Admin`      | `admins`        | Default pluralization            |
| `RecapData`  | `recap_data`    | Custom via `@@map("recap_data")` |

**Why `@@map("recap_data")`?**  
Without it, Prisma would create `RecapData` or `recapdatas` (ugly!). Using `@@map` gives us clean, consistent naming.

---

## Benefits Summary

### ✅ Advantages

- **Single connection string** to manage
- **Lower complexity** in deployment
- **Cost effective** for small scale
- **Fast setup** - no multi-DB configuration
- **Perfect for your use case** (2-3 admins, minimal data)

### ⚠️ When to Switch

Only consider separate databases if:

- You have 50+ admins
- High concurrent write operations
- Need different backup schedules per service
- Compliance requires data isolation

For your current requirements (max 2-3 admins, recap data only), **single database is ideal**! 🚀

---

## MongoDB Atlas Dashboard

You can view all collections in one place:

1. Login to [MongoDB Atlas](https://cloud.mongodb.com)
2. Navigate to your cluster
3. Click "Browse Collections"
4. You'll see:
   - `users` (0-10 documents estimated)
   - `admins` (2-3 documents max)
   - `recap_data` (1 document per year)

Total estimated data: **< 10 MB** (well within free tier!)

---

## Quick Verification

After running `db:push` commands, verify collections exist:

```bash
# Using MongoDB Compass or Atlas UI
Collections:
- users (empty or with user accounts)
- admins (empty or with admin accounts)
- recap_data (empty until first refresh)
```

Or via MongoDB shell:

```javascript
use githubRecap
show collections
// Output:
// users
// admins
// recap_data
```

---

## Summary

✅ **Configuration**: Single `DATABASE_URL` in `back.env`  
✅ **Collections**: 3 separate collections (users, admins, recap_data)  
✅ **Isolation**: Services only access their own collections  
✅ **Optimal**: Perfect for small scale (2-3 admins, minimal data)  
✅ **Simple**: One database to manage and deploy

**Your setup is production-ready with this single database approach!** 🎉
