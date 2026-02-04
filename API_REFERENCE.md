# API Endpoints Quick Reference

Base URL: `http://localhost:4000`

## 🔓 Public Endpoints (No Auth Required)

### Health Checks

```bash
GET /api/v1/app/ping              # AppService health check
GET /api/v1/github/ping           # DataService health check
```

### User Authentication

```bash
POST /api/v1/app/register         # Register new user
POST /api/v1/app/login            # User login
POST /api/v1/app/send-otp         # Resend OTP for verification
POST /api/v1/app/check-otp        # Verify OTP code
POST /api/v1/app/forgot           # Forgot password (sends OTP)
POST /api/v1/app/reset-password   # Reset password with OTP
```

### Admin Authentication

```bash
POST /api/v1/app/admin/register   # Register new admin
POST /api/v1/app/admin/login      # Admin login
POST /api/v1/app/admin/forgot     # Admin forgot password
POST /api/v1/app/admin/otp        # Resend admin OTP
POST /api/v1/app/admin/verify     # Verify admin OTP
```

### Contact Form

```bash
POST /api/v1/app/contact          # Submit contact form
```

### GitHub Data (Public)

```bash
GET /api/v1/github/fetch/:year    # Fetch recap data by year (from DB)
GET /api/v1/github/search?q=...   # Search GitHub repos (cached)
GET /api/v1/github/user/:username # Get user profile (cached)
GET /api/v1/github/user/:username/repos # Get user repos (cached)
```

---

## 🔐 Protected Endpoints (Auth Required)

**Note**: Must include JWT cookie from login response

### User Profile

```bash
GET /api/v1/app/me                # Get current user profile
PATCH /api/v1/app/edit            # Update user profile
GET /api/v1/app/logout            # Logout (clear cookies)
```

### Admin Profile

```bash
GET /api/v1/app/admin/logout      # Admin logout
PATCH /api/v1/app/admin/edit      # Update admin profile
DELETE /api/v1/app/admin/delete/:id? # Delete admin (self or by ID)
```

### Admin Data Management

```bash
POST /api/v1/github/admin/refresh # Fetch from GitHub API + save to DB
POST /api/v1/github/admin/purge   # Delete ALL recap data
POST /api/v1/github/admin/delete  # Delete recap data by year
```

---

## 📝 Request/Response Examples

### 1️⃣ Admin Register

```bash
curl -X POST http://localhost:4000/api/v1/app/admin/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@example.com",
    "username": "admin123",
    "name": "Admin User",
    "contact": "+1234567890",
    "password": "SecurePass123"
  }'
```

**Response**:

```json
{
  "status": "success",
  "message": "Admin registered. Please verify your email.",
  "code": 201,
  "data": {
    "adminId": "65a1b2c3d4e5f6789abcdef0"
  }
}
```

---

### 2️⃣ Admin Login

```bash
curl -X POST http://localhost:4000/api/v1/app/admin/login \
  -H "Content-Type: application/json" \
  -c cookies.txt \
  -d '{
    "email": "admin@example.com",
    "password": "SecurePass123"
  }'
```

**Response**:

```json
{
  "status": "success",
  "message": "Admin logged in successfully",
  "code": 200,
  "data": {
    "id": "65a1b2c3d4e5f6789abcdef0",
    "email": "admin@example.com",
    "username": "admin123",
    "name": "Admin User",
    "contact": "+1234567890",
    "role": "admin",
    "isVerified": true
  }
}
```

**Cookies Set**:

- `accessToken`: JWT (15min expiry)
- `refreshToken`: JWT (7 days expiry)

---

### 3️⃣ Admin Refresh (Fetch GitHub Data)

```bash
curl -X POST http://localhost:4000/api/v1/github/admin/refresh \
  -H "Content-Type: multipart/form-data" \
  -b cookies.txt \
  -F "year=2024" \
  -F "username=nishuR31" \
  -F "githubToken=ghp_yourGitHubTokenHere" \
  -F "title=My 2024 Recap" \
  -F "image=@./cover.jpg"
```

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
    "imageUrl": "https://i.ibb.co/abc123/cover.jpg",
    "recordsCount": {
      "repositories": 15,
      "events": 127,
      "commits": 342
    }
  }
}
```

**What happens**:

1. Calls GitHub API to fetch:
   - User profile
   - Repositories (created/updated in 2024)
   - Public events in 2024
   - User commits in 2024
2. Calculates comprehensive statistics
3. Uploads image to imgBB (optional)
4. Saves full payload to MongoDB
5. Returns summary (not full data to keep response small)

---

### 4️⃣ Public Fetch (Get Recap Data)

```bash
curl http://localhost:4000/api/v1/github/fetch/2024
```

**Response**:

```json
{
  "status": "success",
  "message": "Recap data fetched",
  "code": 200,
  "data": {
    "year": 2024,
    "title": "nishuR31's 2024 GitHub Recap",
    "imageUrl": "https://i.ibb.co/abc123/cover.jpg",
    "username": "nishuR31",
    "profile": {
      "followers": 42,
      "following": 35,
      "publicRepos": 18,
      "publicGists": 5
    },
    "repositories": [
      {
        "name": "scafe",
        "description": "Full-stack restaurant app",
        "language": "JavaScript",
        "stargazers_count": 12,
        "forks_count": 3,
        "created_at": "2024-03-15T10:30:00Z"
      }
      // ... more repos
    ],
    "events": [
      {
        "type": "PushEvent",
        "repo": { "name": "nishuR31/scafe" },
        "created_at": "2024-12-25T14:20:00Z"
      }
      // ... more events
    ],
    "commits": [
      {
        "sha": "abc123...",
        "commit": {
          "message": "Add admin dashboard",
          "author": {
            "name": "nishuR31",
            "date": "2024-12-20T09:15:00Z"
          }
        }
      }
      // ... more commits
    ],
    "stats": {
      "profile": {
        "followers": 42,
        "following": 35,
        "publicRepos": 18,
        "publicGists": 5
      },
      "repositories": {
        "total": 15,
        "created": 8,
        "totalStars": 87,
        "totalForks": 23,
        "languages": {
          "JavaScript": 8,
          "TypeScript": 4,
          "Python": 2,
          "Go": 1
        }
      },
      "activity": {
        "totalEvents": 127,
        "totalCommits": 342,
        "eventTypes": {
          "PushEvent": 89,
          "PullRequestEvent": 23,
          "IssuesEvent": 15
        },
        "commitsByMonth": [45, 38, 52, 29, 31, 28, 35, 19, 27, 0, 0, 38],
        "mostActiveRepo": "nishuR31/scafe"
      },
      "contributions": {
        "pushEvents": 89,
        "pullRequests": 23,
        "issues": 15,
        "reviews": 7
      }
    },
    "fetchedAt": "2024-12-31T18:45:00Z"
  }
}
```

**Benefits**:

- ✅ No GitHub API calls (reads from DB)
- ✅ Fast response time
- ✅ No rate limits
- ✅ Comprehensive data with calculated stats

---

### 5️⃣ Admin Purge (Delete All Data)

```bash
curl -X POST http://localhost:4000/api/v1/github/admin/purge \
  -b cookies.txt
```

**Response**:

```json
{
  "status": "success",
  "message": "Data purged",
  "code": 200,
  "data": {
    "deletedCount": 5
  }
}
```

---

### 6️⃣ Admin Delete Year

```bash
curl -X POST http://localhost:4000/api/v1/github/admin/delete \
  -H "Content-Type: application/json" \
  -b cookies.txt \
  -d '{ "year": 2024 }'
```

**Response**:

```json
{
  "status": "success",
  "message": "Recap data for year 2024 deleted successfully",
  "code": 200,
  "data": {
    "deletedCount": 1
  }
}
```

---

### 7️⃣ Contact Form

```bash
curl -X POST http://localhost:4000/api/v1/app/contact \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "subject": "Question about API",
    "message": "Hi, I have a question about the refresh endpoint..."
  }'
```

**Response**:

```json
{
  "status": "success",
  "message": "Contact form submitted successfully",
  "code": 200
}
```

**What happens**:

1. Validates input (name, email, subject, message)
2. Adds job to BullMQ mail queue
3. Worker sends email using contact template
4. Returns success immediately (async email)

---

### 8️⃣ Admin Edit Profile

```bash
curl -X PATCH http://localhost:4000/api/v1/app/admin/edit \
  -H "Content-Type: application/json" \
  -b cookies.txt \
  -d '{
    "name": "Admin Updated",
    "contact": "+9876543210",
    "username": "newadmin123"
  }'
```

**Response**:

```json
{
  "status": "success",
  "message": "Admin profile updated successfully",
  "code": 200,
  "data": {
    "id": "65a1b2c3d4e5f6789abcdef0",
    "email": "admin@example.com",
    "username": "newadmin123",
    "name": "Admin Updated",
    "contact": "+9876543210",
    "role": "admin"
  }
}
```

---

### 9️⃣ Admin Delete Self

```bash
curl -X DELETE http://localhost:4000/api/v1/app/admin/delete \
  -b cookies.txt
```

**Response**:

```json
{
  "status": "success",
  "message": "Admin account deleted successfully",
  "code": 200
}
```

---

### 🔟 Admin Delete by ID

```bash
curl -X DELETE http://localhost:4000/api/v1/app/admin/delete/65a1b2c3d4e5f6789abcdef0 \
  -b cookies.txt
```

**Response**:

```json
{
  "status": "success",
  "message": "Admin account deleted successfully",
  "code": 200,
  "data": {
    "deletedId": "65a1b2c3d4e5f6789abcdef0"
  }
}
```

---

## 🔑 Authentication Headers

### For Protected Routes:

All protected endpoints require JWT cookie from login response.

**Option 1: Using Cookie File (curl)**

```bash
# Save cookies during login
curl -X POST .../login -c cookies.txt -d '{...}'

# Use cookies in subsequent requests
curl -X GET .../me -b cookies.txt
```

**Option 2: Manual Cookie Header**

```bash
curl -X GET http://localhost:4000/api/v1/app/me \
  -H "Cookie: accessToken=eyJhbGc..."
```

**Option 3: Frontend (Automatic)**

```javascript
// Cookies sent automatically with fetch/axios if credentials: 'include'
fetch("http://localhost:4000/api/v1/app/me", {
  credentials: "include",
});
```

---

## ❌ Error Responses

### 400 Bad Request

```json
{
  "status": "error",
  "message": "Validation failed",
  "code": 400,
  "errors": [
    "\"email\" must be a valid email",
    "\"password\" length must be at least 8 characters long"
  ]
}
```

### 401 Unauthorized

```json
{
  "status": "error",
  "message": "Invalid credentials",
  "code": 401
}
```

### 403 Forbidden

```json
{
  "status": "error",
  "message": "Access denied",
  "code": 403
}
```

### 404 Not Found

```json
{
  "status": "error",
  "message": "Resource not found",
  "code": 404
}
```

### 500 Internal Server Error

```json
{
  "status": "error",
  "message": "Internal server error",
  "code": 500,
  "error": "Detailed error message"
}
```

---

## 🧪 Testing Workflow

### 1. Start Services

```bash
cd backend
npm run start:worker    # Terminal 1 (mail queue)
npm run start          # Terminal 2 (all services)
```

### 2. Test Admin Flow

```bash
# Register admin
curl -X POST http://localhost:4000/api/v1/app/admin/register \
  -H "Content-Type: application/json" \
  -d '{ "email": "test@admin.com", "username": "testadmin", "name": "Test", "contact": "+123", "password": "Pass1234" }'

# Verify OTP (check email or logs)
curl -X POST http://localhost:4000/api/v1/app/admin/verify \
  -H "Content-Type: application/json" \
  -d '{ "email": "test@admin.com", "otp": "123456" }'

# Login
curl -X POST http://localhost:4000/api/v1/app/admin/login \
  -H "Content-Type: application/json" \
  -c cookies.txt \
  -d '{ "email": "test@admin.com", "password": "Pass1234" }'

# Refresh recap data
curl -X POST http://localhost:4000/api/v1/github/admin/refresh \
  -b cookies.txt \
  -F "year=2024" \
  -F "username=YOUR_GITHUB_USERNAME" \
  -F "githubToken=YOUR_GITHUB_TOKEN"
```

### 3. Test Public Access

```bash
# Fetch recap (no auth needed)
curl http://localhost:4000/api/v1/github/fetch/2024
```

---

## 📊 Data Payload Structure

### RecapData.payload (JSON):

```javascript
{
  username: "nishuR31",
  year: 2024,
  profile: {
    login: "nishuR31",
    name: "Nishu",
    bio: "Full-stack developer",
    avatar_url: "https://...",
    followers: 42,
    following: 35,
    public_repos: 18
  },
  repositories: [...],  // Full repo objects from GitHub
  events: [...],        // Full event objects from GitHub
  commits: [...],       // Full commit objects from GitHub
  stats: {
    year: 2024,
    profile: { followers, following, publicRepos, publicGists },
    repositories: { total, created, totalStars, totalForks, languages },
    activity: { totalEvents, totalCommits, eventTypes, commitsByMonth, mostActiveRepo },
    contributions: { pushEvents, pullRequests, issues, reviews }
  },
  fetchedAt: "2024-12-31T18:45:00Z"
}
```

---

## 🚀 Production Deployment Tips

1. **Environment Variables**: Use secrets manager (AWS Secrets, Azure Key Vault)
2. **CORS**: Update gateway to allow only production frontend URL
3. **Rate Limiting**: Adjust limits based on expected traffic
4. **Redis**: Use managed Redis (AWS ElastiCache, Redis Cloud)
5. **MongoDB**: Use MongoDB Atlas with connection pooling
6. **GitHub Token**: Use organization token with higher rate limits
7. **Logging**: Send logs to centralized service (CloudWatch, Datadog)
8. **Monitoring**: Set up health check endpoints with uptime monitoring

---

## 📚 Additional Resources

- [GitHub API Docs](https://docs.github.com/en/rest)
- [Prisma Docs](https://www.prisma.io/docs)
- [BullMQ Docs](https://docs.bullmq.io)
- [JWT Best Practices](https://tools.ietf.org/html/rfc8725)
- [imgBB API Docs](https://api.imgbb.com)
