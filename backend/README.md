# Eventify - Backend API

Robust backend REST API built with **Node.js, Express, TypeScript, and PostgreSQL** for the Eventify Event Management System.

---

## 🚀 Live Demo & Interactive Documentation
With the server running, visit:
👉 **[http://localhost:5001/api-docs](http://localhost:5001/api-docs)** for the interactive Swagger UI to test all endpoints in your browser.

---

## 🛠️ Tech Stack
- **Runtime:** Node.js (v24+) & TypeScript
- **Framework:** Express.js
- **Database:** PostgreSQL (`eventify_db`)
- **Authentication:** JWT (JSON Web Tokens) & bcryptjs password hashing
- **API Documentation:** OpenAPI 3.0 / Swagger UI (`swagger-ui-express`)
- **CORS:** Enabled for frontend integration

---

## 📦 Database Schema & Features
1. **`users` Table:**
   - User registration (Attendees & Organizers)
   - Secure salted password hashing (`bcryptjs`)
   - Role-based fields (`attendee` / `organizer`)

2. **`events` Table:**
   - Pre-seeded with the 6 events from the frontend UI (`Future Tech Summit`, `Live Music Night`, `Creative Design Workshop`, etc.)
   - Full search & filter indexing:
     - Search title keyword (`?search=`)
     - City/Location (`?location=`)
     - Category (`?category=technology|music|arts|education|business`)
     - Price filter (`?price=free|paid`)
     - Sort (`?sort=price-low|price-high|name`)
     - Homepage featured events (`?featured=true`)

3. **`registrations` Table:**
   - Allows users/attendees to register for specific events (`POST /api/events/:id/register`).

---

## 🔌 API Endpoints Reference

| Method | Endpoint | Description | Auth Required |
|---|---|---|---|
| `GET` | `/api/health` | Service & PostgreSQL health check | No |
| `POST` | `/api/auth/signup` | Create account (returns JWT token) | No |
| `POST` | `/api/auth/login` | Login user (returns JWT token) | No |
| `GET` | `/api/auth/me` | Fetch authenticated user profile | Bearer JWT |
| `GET` | `/api/events` | List events with search/filter/sort | No |
| `GET` | `/api/events/:id` | Get single event details | No |
| `POST` | `/api/events` | Create new event in PostgreSQL | Bearer JWT |
| `POST` | `/api/events/:id/register` | Register attendee for an event | No / Optional |

---

## 🏃 Running Locally

```bash
cd backend

# Install dependencies
npm install

# Run database setup & seed matching events
npm run seed

# Run development mode with hot reload
npm run dev

# Or build & start production
npm run build
npm run start
```
