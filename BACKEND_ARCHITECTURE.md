# Backend Architecture - Service Separation Guide

## Overview

The backend is organized into **microservices** with clear separation of concerns:

- **appService**: User & Admin authentication/management
- **dataService**: GitHub API integration & recap data management
- **gateway**: API proxy & routing
- **sharedService**: Common utilities (mail, upload, middleware, etc.)

---

## Service Boundaries

### ✅ appService (Port 4001)

**Purpose**: Authentication, user management, admin management

**Responsibilities**:

- User registration, login, OTP verification
- Admin CRUD operations (register, login, edit, delete)
- Password reset flows
- Contact form handling
- JWT token management

**Database**: MongoDB (`DATABASE_URL`) - Shared single database

- **User** collection: email, username, password, otpCode, refreshToken, isVerified
- **Admin** collection: email, username, name, contact, password, role, otpCode, refreshToken, isVerified

**Key Files**:

```
appService/
├── controllers/
│   ├── adminRegister.controller.js
│   ├── adminLogin.controller.js
│   ├── adminLogout.controller.js
│   ├── adminForgot.controller.js
│   ├── adminSendOtp.controller.js
│   ├── adminVerify.controller.js
│   ├── adminEdit.controller.js
│   ├── adminDelete.controller.js
│   └── contact.controller.js
├── services/
│   └── adminService.js
├── repo/
│   └── adminRepository.js
└── validators/
    ├── adminRegister.schema.js
    ├── adminLogin.schema.js
    ├── adminForgot.schema.js
    ├── adminOtp.schema.js
    ├── adminVerify.schema.js
    ├── adminEdit.schema.js
    └── contact.schema.js
```

**Routes** (`/api/v1/app`):

```javascript
POST   /register              // User registration
POST   /login                 // User login
POST   /send-otp             // User OTP resend
POST   /check-otp            // User OTP verification
POST   /forgot               // User forgot password
POST   /reset-password       // User password reset
GET    /logout               // User logout
GET    /me                   // Get current user (auth)
PATCH  /edit                 // Edit user profile (auth)

POST   /admin/register       // Admin registration
POST   /admin/login          // Admin login
GET    /admin/logout         // Admin logout (auth)
POST   /admin/forgot         // Admin forgot password
POST   /admin/otp            // Admin OTP resend
POST   /admin/verify         // Admin OTP verification
PATCH  /admin/edit           // Admin profile edit (auth)
DELETE /admin/delete/:id?    // Admin deletion (auth)

POST   /contact              // Contact form submission
```

---

### ✅ dataService (Port 4002)

**Purpose**: GitHub API integration, recap data storage & retrieval

**Responsibilities**:

- Fetch GitHub user data (profile, repos, events, commits)
- Calculate yearly statistics
- Store recap data in database
- Serve cached recap data (no GitHub API cost on fetch)
- Admin operations: refresh, purge, delete by year

**Database**: MongoDB (`DATABASE_URL`) - Shared single database

- **recap_data** collection: year (unique), title, payload (JSON), imageUrl

**Key Files**:

```
dataService/
├── controllers/
│   ├── fetchByYear.controller.js      // Public: fetch from DB
│   ├── adminRefresh.controller.js     // Admin: fetch from GitHub API + save
│   ├── adminPurge.controller.js       // Admin: delete all
│   └── adminDeleteYear.controller.js  // Admin: delete by year
├── services/
│   ├── recapService.js               // Recap CRUD operations
│   ├── githubRecapService.js         // GitHub API fetching logic
│   └── dataService.js                // GitHub search/user data (cached)
├── repo/
│   ├── recapRepository.js            // Database operations
│   └── githubRepository.js           // GitHub API axios calls
└── validators/
    ├── refresh.schema.js             // year, username, githubToken
    └── delete.schema.js              // year
```

**Routes** (`/api/v1/github`):

```javascript
GET    /ping                       // Health check
GET    /search                     // Search GitHub repos (cached)
GET    /user/:username             // Get user profile (cached)
GET    /user/:username/repos       // Get user repos (cached)

// Public recap data (reads from DB, no GitHub API calls)
GET    /fetch/:year                // Get recap data by year

// Admin recap operations (requires auth via gateway)
POST   /admin/refresh              // Fetch from GitHub + save (username, token, year, file)
POST   /admin/purge                // Delete all recap data
POST   /admin/delete               // Delete recap by year
```

---

### ✅ gateway (Port 4000)

**Purpose**: API proxy, authentication forwarding

**Responsibilities**:

- Route requests to appropriate services
- Verify JWT tokens for protected routes
- Inject `x-authenticated` and `x-user-id` headers for downstream services
- Apply rate limiting & security headers

**Routes**:

```javascript
/api/v1/app/*      → appService:4001
/api/v1/github/*   → dataService:4002 (with auth headers if authenticated)
```

**Authentication Flow**:

1. Client sends request with JWT cookie
2. Gateway verifies token
3. Gateway injects headers: `x-authenticated: true`, `x-user-id: <userId>`
4. Downstream service (dataService) checks `dataAuth` middleware
5. Protected routes only accessible if headers are present

---

## Data Flow Examples

### 🔹 Admin Refresh Flow (Manual GitHub Data Fetch)

```
Client → Gateway → dataService
```

**Request**:

```bash
POST /api/v1/github/admin/refresh
Headers:
  Cookie: accessToken=<JWT>
  Content-Type: multipart/form-data
Body:
  year: 2024
  username: nishuR31
  githubToken: ghp_xxxxxxxxxxxxx
  title: "My 2024 Recap" (optional)
  image: <file> (optional)
```

**Flow**:

1. Gateway verifies JWT → injects `x-authenticated: true`
2. dataService `dataAuth` middleware checks headers
3. `adminRefresh.controller` validates request
4. `githubRecapService.fetchGitHubRecapData()` calls GitHub API:
   - GET /users/{username}
   - GET /users/{username}/repos
   - GET /users/{username}/events/public
   - GET /search/commits (author commits in year)
5. Calculate stats (repos created, stars, languages, commits by month, etc.)
6. Upload image to imgBB (if provided)
7. Save comprehensive payload to `RecapData` model
8. Return summary (no full payload to avoid large response)

**Response**:

```json
{
  "status": "success",
  "message": "GitHub recap data for nishuR31 (2024) refreshed successfully",
  "code": 200,
  "data": {
    "year": 2024,
    "title": "nishuR31's 2024 GitHub Recap",
    "username": "nishuR31",
    "imageUrl": "https://i.ibb.co/...",
    "recordsCount": {
      "repositories": 12,
      "events": 87,
      "commits": 245
    }
  }
}
```

---

### 🔹 Public Fetch Flow (No GitHub API Cost)

```
Client → Gateway → dataService → MongoDB
```

**Request**:

```bash
GET /api/v1/github/fetch/2024
```

**Flow**:

1. Gateway routes to dataService (no auth required)
2. `fetchByYear.controller` queries `RecapData` by year
3. Returns full payload with stats, or `{}` if not found

**Response**:

```json
{
  "status": "success",
  "message": "Recap data fetched",
  "code": 200,
  "data": {
    "year": 2024,
    "title": "nishuR31's 2024 GitHub Recap",
    "imageUrl": "https://i.ibb.co/...",
    "username": "nishuR31",
    "profile": { "followers": 42, "publicRepos": 15 },
    "repositories": [...],
    "events": [...],
    "commits": [...],
    "stats": {
      "repositories": { "total": 12, "created": 5, "totalStars": 89 },
      "activity": { "totalCommits": 245, "commitsByMonth": [...] },
      "contributions": { "pushEvents": 67, "pullRequests": 12 }
    }
  }
}
```

---

### 🔹 Admin Login Flow

```
Client → Gateway → appService
```

**Request**:

```bash
POST /api/v1/app/admin/login
Body:
  email: admin@example.com
  password: SecurePass123
```

**Flow**:

1. Gateway routes to appService
2. `adminLogin.controller` validates credentials
3. `adminService.login()` verifies password via `adminRepository`
4. Generate JWT tokens (access + refresh)
5. Set httpOnly cookies with `sameSite`, `secure` flags
6. Return admin profile (without password/tokens)

**Response**:

```json
{
  "status": "success",
  "message": "Admin logged in successfully",
  "code": 200,
  "data": {
    "id": "...",
    "email": "admin@example.com",
    "username": "admin123",
    "name": "Admin User",
    "role": "admin"
  }
}
```

---

## Environment Variables

### Required in `backend/back.env`:

```bash
# General
MODE=dev
LOG_LEVEL=info
APP_VERSION=1.0.0

# Ports
APP_PORT=4001
DATA_SERVICE_PORT=4002
GATEWAY_PORT=4000

# Database (Single MongoDB for all services)
# Collections: users, admins (appService) | recap_data (dataService)
DATABASE_URL=mongodb+srv://user:pass@cluster.mongodb.net/githubRecap

# JWT
ACCESS_KEY=your-super-secret-access-key-min-32-chars
REFRESH_KEY=your-super-secret-refresh-key-min-32-chars

# Redis (for caching)
REDIS=redis://localhost:6379
TTL=86400

# GitHub API
GITHUB_TOKEN=ghp_your_github_personal_access_token
GITHUB_CACHE_TTL=86400        # 1 day (in seconds)
GITHUB_DEBOUNCE_MS=300        # 300ms debounce

# Mail (Gmail SMTP)
MAIL_HOST=smtp.gmail.com
MAIL_PORT=587
MAIL_FROM=your-email@gmail.com
MAIL_PASS=your-app-password   # Generate from Google Account

# Image Upload
IMGBB_API_KEY=your-imgbb-api-key
```

---

## Database Models

**Single MongoDB Database with 3 Collections**

All services use the same `DATABASE_URL`, but store data in separate collections:

- `users` - User accounts (appService)
- `admins` - Admin accounts (appService)
- `recap_data` - GitHub recap data (dataService)

### Collection: `users` (appService)

```prisma
model User {
  id           String   @id @default(auto()) @map("_id") @db.ObjectId
  email        String   @unique
  username     String   @unique
  password     String
  refreshToken String?
  otpCode      String?
  otpExpiry    DateTime?
  isVerified   Boolean  @default(false)
  createdAt    DateTime @default(now())
  updatedAt    DateTime @updatedAt
}
```

### Collection: `admins` (appService)

```prisma
model Admin {
  id           String   @id @default(auto()) @map("_id") @db.ObjectId
  email        String   @unique
  username     String   @unique
  name         String
  contact      String
  password     String
  role         String   @default("admin")
  refreshToken String?
  otpCode      String?
  otpExpiry    DateTime?
  isVerified   Boolean  @default(false)
  createdAt    DateTime @default(now())
  updatedAt    DateTime @updatedAt
}
```

### Collection: `recap_data` (dataService)

```prisma
model RecapData {
  id        String   @id @default(auto()) @map("_id") @db.ObjectId
  year      Int      @unique
  title     String
  payload   Json     // Full GitHub data with stats
  imageUrl  String?
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  @@map("recap_data")
}
```

**Why Single Database?**

- Small scale: Max 2-3 admins, minimal data
- Simpler deployment: One connection string
- Cost effective: No need for multiple databases
- Clear separation: Different collections prevent conflicts

---

## Setup Instructions

### 1. Install Dependencies

```bash
cd backend
npm install
```

### 2. Generate Prisma Clients

```bash
npm run build:prisma
```

This runs:

- `prisma generate --schema=./appService/prisma/schema.prisma`
- `prisma generate --schema=./dataService/prisma/schema.prisma`

### 3. Push Schemas to MongoDB

```bash
# Both push to the same DATABASE_URL but create separate collections
npm run db:push        # Creates: users, admins collections
npm run db:push:data   # Creates: recap_data collection
```

### 4. Start Services

```bash
# Start mail worker (processes email queue)
npm run start:worker

# Start all services (in separate terminals or use PM2)
npm run start:appService    # Port 4001
npm run start:dataService   # Port 4002
npm run start:gateway       # Port 4000

# Or start all at once (parallel)
npm run start
```

### 5. Test Endpoints

```bash
# Health checks
curl http://localhost:4000/api/v1/app/ping
curl http://localhost:4000/api/v1/github/ping

# Admin register
curl -X POST http://localhost:4000/api/v1/app/admin/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@test.com",
    "username": "admin123",
    "name": "Admin User",
    "contact": "+1234567890",
    "password": "SecurePass123"
  }'

# Admin login
curl -X POST http://localhost:4000/api/v1/app/admin/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@test.com",
    "password": "SecurePass123"
  }'

# Fetch recap (public)
curl http://localhost:4000/api/v1/github/fetch/2024
```

---

## Security Best Practices

1. **JWT Tokens**: Stored in httpOnly cookies (not accessible via JavaScript)
2. **CORS**: Configured in gateway to allow only trusted origins
3. **Rate Limiting**: Applied in gateway (100 req/15min per IP)
4. **Helmet**: Security headers in all services
5. **Input Validation**: Joi schemas for all endpoints
6. **GitHub Token**: Never exposed to client, only used server-side in refresh
7. **Password Hashing**: bcrypt with salt rounds
8. **Environment Vars**: Never committed, use `.env` files

---

## Cost Optimization Strategy

### Problem: GitHub API has rate limits (5000 req/hour for authenticated)

### Solution:

1. **Admin Refresh**: Manually trigger once per year/user → fetches from GitHub API
2. **Public Fetch**: Reads from MongoDB → no GitHub API calls
3. **Caching**: GitHub search/user data cached in Redis (1 day TTL)
4. **Debouncing**: Search requests debounced (300ms) to prevent spam

### Cost Breakdown:

- **Before**: Every user fetch = 4 GitHub API calls
- **After**: Admin refresh once = 4 API calls, unlimited public fetches = 0 API calls

---

## Troubleshooting

### Issue: "GitHub API rate limit exceeded"

**Solution**: Wait for rate limit reset or use different token

### Issue: "Invalid GitHub token"

**Solution**: Generate new token at https://github.com/settings/tokens with `repo`, `user` scopes

### Issue: "Prisma Client not found"

**Solution**: Run `npm run build:prisma` to generate clients

### Issue: "Mail not sending"

**Solution**:

1. Enable 2FA on Gmail
2. Generate App Password: https://myaccount.google.com/apppasswords
3. Use app password in `MAIL_PASS`

### Issue: "Redis connection failed"

**Solution**: Start Redis server or update `REDIS` env var

---

## File Organization Summary

### ✅ Correct Placement:

- **appService**: All admin auth, user auth, contact → controllers, services, repos, validators
- **dataService**: GitHub API, recap data CRUD → controllers, services, repos, validators
- **gateway**: Routing, auth middleware → no business logic
- **sharedService**: Mail, upload, queue, utilities → reusable across services

### ❌ Incorrect (Fixed):

- ~~Admin delete in dataService routes~~ → Fixed to use `adminDeleteYear` for recap data deletion
- ~~User/Admin logic mixed in dataService~~ → All auth in appService

---

## Next Steps

1. ✅ Admin authentication complete
2. ✅ GitHub API integration complete
3. ✅ Recap data storage complete
4. ⏳ Frontend integration needed
5. ⏳ Admin dashboard UI
6. ⏳ Public recap viewer page

---

## Questions?

- **How to add new admin route?** → Add to `appService/routes/app.route.js`
- **How to add new data endpoint?** → Add to `dataService/routes/data.route.js`
- **How to modify GitHub data fetching?** → Edit `dataService/services/githubRecapService.js`
- **How to change email templates?** → Edit `sharedService/mail/mailTemplates.js`
