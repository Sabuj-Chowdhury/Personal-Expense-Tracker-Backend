# Personal Expense Tracker API

This is the backend for the **Personal Expense Tracker** — a secure RESTful API that handles user authentication and expense management using Express.js, TypeScript, MongoDB, and JWT.

## 🔗 Live API Endpoint

**Base URL:** [`https://expense-tracker-backend-gamma-silk.vercel.app`](https://expense-tracker-backend-gamma-silk.vercel.app)

---

## 🔐 Features

- JWT Authentication with token validation middleware
- Bcrypt password hashing
- CRUD operations for expense records
- Middleware-based global error handling
- MongoDB integration with Mongoose
- TypeScript-powered for strong typing and maintainability
- Secure routes with role/user-based access via JWT
- Logout (client-controlled)
- Environment-based config management

---

## ⚙️ Technologies Used

- **Node.js + Express**
- **TypeScript**
- **MongoDB + Mongoose**
- **JWT (jsonwebtoken)** for secure authentication
- **bcryptjs** for hashing passwords
- **dotenv** for environment management
- **CORS** for cross-origin resource sharing

---

## 📁 Project Structure

```
/src
  /app
    /middleware
      - checkAuth.ts         // JWT middleware
      - errorHandler.ts      // Global error handler
    /module
      /auth                  // Login / Logout
      /expenses              // CRUD operations
      /user                  // Registration
  /config
    - env.ts                 // Loads env variables
  server.ts                  // Entry point
```

---

## 🧪 API Endpoints

| Method | Endpoint         | Description                | Protected |
| ------ | ---------------- | -------------------------- | --------- |
| POST   | `/auth/login`    | Login user                 | ❌        |
| POST   | `/auth/logout`   | Logout user                | ❌        |
| POST   | `/user/register` | Register new user          | ❌        |
| GET    | `/expenses`      | Get all expenses           | ✅        |
| POST   | `/expenses`      | Add a new expense          | ✅        |
| PATCH  | `/expenses/:id`  | Update an existing expense | ✅        |
| DELETE | `/expenses/:id`  | Delete an expense          | ✅        |

> ⚠️ All protected routes require `Authorization` header with a valid JWT token.

---

## 🔐 Authentication Logic

JWT token is issued upon successful login and must be passed in the request headers:

```http
Authorization: your_token_here
```

Tokens are verified inside `checkAuth.ts` middleware.

---

## 🛠️ Installation & Setup (Local)

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/expense-tracker-backend.git
cd expense-tracker-backend
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Create a `.env` file at root:

```env
PORT=5000
MONGODB_URI=your_mongodb_uri_here
JWT_ACCESS_SECRET=your_jwt_secret
```

### 4. Run the Server (in Dev Mode)

```bash
npm run dev
```

---

## 🔒 Middleware

### ✅ `checkAuth.ts`

Verifies JWT from headers and attaches the user payload to requests.

### ⚠️ `errorHandler.ts`

Catches unhandled errors or 404 routes globally.

---

## 🧪 Dev Dependencies

```json
{
  "@types/express", "@types/jsonwebtoken", "@types/bcryptjs",
  "@types/cors", "@types/dotenv",
  "ts-node-dev", "typescript"
}
```

---

## 📦 Main Dependencies

```json
{
  "express", "mongoose", "jsonwebtoken", "bcryptjs", "cors", "dotenv"
}
```

---

## 👨‍💻 Author

Sabuj Chowdhury
