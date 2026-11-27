export const swaggerSpec = {
  openapi: "3.0.0",
  info: {
    title: "Eventify REST API",
    version: "1.0.0",
    description: "Backend API for Eventify Event Management System, providing full event discovery, filtering, user authentication, and event registrations."
  },
  servers: [
    {
      url: "http://localhost:5001",
      description: "Local development server"
    }
  ],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT"
      }
    }
  },
  paths: {
    "/api/health": {
      get: {
        summary: "Check backend and database health status",
        responses: {
          "200": {
            description: "Backend is operational and connected to PostgreSQL"
          }
        }
      }
    },
    "/api/auth/signup": {
      post: {
        summary: "Register a new user (Attendee or Organizer)",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                required: ["name", "email", "password"],
                properties: {
                  name: { type: "string", example: "John Doe" },
                  email: { type: "string", example: "johndoe@example.com" },
                  password: { type: "string", example: "secret123" },
                  role: { type: "string", enum: ["attendee", "organizer"], example: "organizer" }
                }
              }
            }
          }
        },
        responses: {
          "201": { description: "User registered with JWT" },
          "400": { description: "Validation error" },
          "409": { description: "Email already registered" }
        }
      }
    },
    "/api/auth/login": {
      post: {
        summary: "Log in an existing user and get JWT",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                required: ["email", "password"],
                properties: {
                  email: { type: "string", example: "admin@eventify.com" },
                  password: { type: "string", example: "password123" }
                }
              }
            }
          }
        },
        responses: {
          "200": { description: "Login successful with token" },
          "401": { description: "Invalid credentials" }
        }
      }
    },
    "/api/auth/me": {
      get: {
        summary: "Get current authenticated user profile",
        security: [{ bearerAuth: [] }],
        responses: {
          "200": { description: "User profile returned" },
          "401": { description: "Unauthorized" }
        }
      }
    },
    "/api/events": {
      get: {
        summary: "Get all events with filters (matches events.html & events.js)",
        parameters: [
          { in: "query", name: "search", schema: { type: "string" }, description: "Search by title keywords" },
          { in: "query", name: "location", schema: { type: "string" }, description: "Filter by city" },
          { in: "query", name: "category", schema: { type: "string" }, description: "Filter by category (technology, music, education, arts, business)" },
          { in: "query", name: "price", schema: { type: "string", enum: ["all", "free", "paid"] }, description: "Filter by free or paid" },
          { in: "query", name: "sort", schema: { type: "string", enum: ["default", "price-low", "price-high", "name"] }, description: "Sort order" },
          { in: "query", name: "featured", schema: { type: "boolean" }, description: "Filter featured homepage events" }
        ],
        responses: {
          "200": { description: "List of matching events" }
        }
      },
      post: {
        summary: "Create a new event in the database",
        security: [{ bearerAuth: [] }],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                required: ["title", "category", "event_date", "location", "price"],
                properties: {
                  title: { type: "string", example: "AI & Cloud Summit 2027" },
                  category: { type: "string", example: "technology" },
                  event_date: { type: "string", example: "FEB 10, 2027" },
                  location: { type: "string", example: "Hyderabad, India" },
                  price: { type: "number", example: 399 },
                  is_featured: { type: "boolean", example: true },
                  description: { type: "string", example: "Deep dive into generative AI workflows." }
                }
              }
            }
          }
        },
        responses: {
          "201": { description: "Event created successfully" },
          "401": { description: "Unauthorized" }
        }
      }
    },
    "/api/events/{id}": {
      get: {
        summary: "Get single event details by ID",
        parameters: [
          { in: "path", name: "id", required: true, schema: { type: "integer" } }
        ],
        responses: {
          "200": { description: "Event details" },
          "404": { description: "Event not found" }
        }
      }
    },
    "/api/events/{id}/register": {
      post: {
        summary: "Register attendee for an event",
        parameters: [
          { in: "path", name: "id", required: true, schema: { type: "integer" } }
        ],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                required: ["attendee_name", "attendee_email"],
                properties: {
                  attendee_name: { type: "string", example: "Jane Smith" },
                  attendee_email: { type: "string", example: "jane@example.com" }
                }
              }
            }
          }
        },
        responses: {
          "201": { description: "Registration confirmed" },
          "404": { description: "Event not found" }
        }
      }
    }
  }
};
