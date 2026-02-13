# GitHub Recap API – cURL Reference

## Auth

### Register

**POST** `/api/auth/register`

```json
Request Body:
{
  "email": "user@example.com",
  "username": "username",
  "password": "YourPassword123!"
}
```

**cURL:**

```sh
curl -X POST http://localhost:4000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"user@example.com","username":"username","password":"YourPassword123!"}'
```

**Response:**  
`{ success: true, message: "...", data: { ...user } }`

---

### Login

**POST** `/api/auth/login`

```json
Request Body:
{
  "email": "user@example.com",
  "password": "YourPassword123!"
}
```

**cURL:**

```sh
curl -X POST http://localhost:4000/api/auth/login \
  -H "Content-Type: application/json" \
  -c cookie.txt \
  -d '{"email":"user@example.com","password":"YourPassword123!"}'
```

**Response:**  
`{ success: true, message: "...", data: { ...user } }`

---

### Forgot Password

**POST** `/api/auth/forgot-password`

```json
Request Body:
{
  "email": "user@example.com"
}
```

**cURL:**

```sh
curl -X POST http://localhost:4000/api/auth/forgot-password \
  -H "Content-Type: application/json" \
  -d '{"email":"user@example.com"}'
```

**Response:**  
`{ success: true, message: "OTP sent to email", data: null }`

---

### Verify OTP

**POST** `/api/auth/verify-otp`

```json
Request Body:
{
  "email": "user@example.com",
  "otp": "123456"
}
```

**cURL:**

```sh
curl -X POST http://localhost:4000/api/auth/verify-otp \
  -H "Content-Type: application/json" \
  -d '{"email":"user@example.com","otp":"123456"}'
```

**Response:**  
`{ success: true, message: "...", data: { valid: true } }`

---

### Change Password

**POST** `/api/auth/change-password`

```json
Request Body:
{
  "email": "user@example.com",
  "otp": "123456",
  "newPassword": "NewPassword123!"
}
```

**cURL:**

```sh
curl -X POST http://localhost:4000/api/auth/change-password \
  -H "Content-Type: application/json" \
  -d '{"email":"user@example.com","otp":"123456","newPassword":"NewPassword123!"}'
```

**Response:**  
`{ success: true, message: "Password changed", data: null }`

---

### Passwordless Login (Send Link)

**POST** `/api/auth/passwordless`

```json
Request Body:
{
  "email": "user@example.com"
}
```

**cURL:**

```sh
curl -X POST http://localhost:4000/api/auth/passwordless \
  -H "Content-Type: application/json" \
  -d '{"email":"user@example.com"}'
```

**Response:**  
`{ success: true, message: "Passwordless link sent", data: null }`

---

### Verify Passwordless

**POST** `/api/auth/verify-passwordless`

```json
Request Body:
{
  "token": "passwordless_token"
}
```

**cURL:**

```sh
curl -X POST http://localhost:4000/api/auth/verify-passwordless \
  -H "Content-Type: application/json" \
  -d '{"token":"passwordless_token"}'
```

**Response:**  
`{ success: true, message: "Passwordless login successful", data: { ...user } }`

---

### Logout

**POST** `/api/auth/logout`
**cURL:**

```sh
curl -X POST http://localhost:4000/api/auth/logout \
  -b cookie.txt
```

**Response:**  
`{ success: true, message: "Logged out", data: null }`

---

## User

### Edit User

**PUT** `/api/user/edit`

```json
Request Body:
{
  "username": "newUsername",
  "otherField": "value"
}
```

**cURL:**

```sh
curl -X PUT http://localhost:4000/api/user/edit \
  -H "Content-Type: application/json" \
  -b cookie.txt \
  -d '{"username":"newUsername"}'
```

**Response:**  
`{ success: true, message: "User updated", data: { ...user } }`

---

## GitHub Recap

### Get GitHub Recap

**GET** `/api/github/recap/:username`
**cURL:**

```sh
curl http://localhost:4000/api/github/recap/username
```

**Response:**  
`{ success: true, message: "...", data: { user, repos } }`

---

### Update GitHub Recap (Manual Fetch)

**POST** `/api/github/update/:username`
**cURL:**

```sh
curl -X POST http://localhost:4000/api/github/update/username
```

**Response:**  
`{ success: true, message: "...", data: { user, repos } }`

---
