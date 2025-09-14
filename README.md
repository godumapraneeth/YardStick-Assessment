
Multi-Tenant SaaS Notes Application
A complete full-stack, multi-tenant "Notes" application built with a Node.js backend (using Next.js API routes) and a React frontend. The application is designed for a SaaS environment, featuring strict data isolation between tenants, role-based access control, and subscription-based feature gating. The entire project is deployed on Vercel.

Live Frontend URL: [https://yard-stick-assessment-dp7q.vercel.app/](https://yard-stick-assessment-dp7q.vercel.app/)

Live Backend API URL: [https://yard-stick-assessment-zf9k.vercel.app/](https://yard-stick-assessment-zf9k-a9fz6c6lx-goduma-praneeths-projects.vercel.app/api/health)

Core Features
Multi-Tenancy: Securely supports multiple distinct tenants (companies) with complete data isolation.

Authentication & Authorization: Implements secure JWT-based authentication and role-based access control (RBAC).

Subscription Plans: Features a "Free" plan with note creation limits and a "Pro" plan with unlimited notes.

CRUD API: A full suite of RESTful API endpoints for managing notes.

Full-Stack Deployment: The backend API and frontend client are independently deployed and seamlessly integrated on Vercel.

Technical Deep Dive
Multi-Tenancy Architecture
This application uses a shared schema with a tenant ID column approach. This is a highly scalable and efficient strategy for multi-tenant SaaS applications.

How it Works: All data for all tenants resides within the same MongoDB database and collections.

Data Isolation: Every database model that contains tenant-specific data (like Users and Notes) includes a mandatory tenantId field. Every single database query is filtered by the tenantId of the authenticated user, which is extracted from their JWT. This robust application-layer control guarantees that one tenant can never access another tenant's data.

Authentication and Authorization
JWT-Based Login: User authentication is handled via JSON Web Tokens. Upon successful login, a token containing the user's ID, role, and tenantId is generated and sent to the client.

Authorization Middleware: A custom requireAuth middleware protects all sensitive API endpoints. This middleware validates the JWT and can enforce role-specific permissions (e.g., ensuring only an "admin" can access the upgrade endpoint).

Subscription Feature Gating
The application enforces subscription limits at the API level.

When a user on a Free Plan attempts to create a new note, the API first queries the database to count the existing notes for that tenant.

If the count has reached the limit (3 notes), the API responds with a 403 Forbidden error, preventing the creation of new notes and prompting the user to upgrade.

Getting Started
Test Accounts
The following test accounts have been seeded in the database. The password for all accounts is password.

Email	Role	Tenant
admin@acme.test	Admin	Acme
user@acme.test	Member	Acme
admin@globex.test	Admin	Globex
user@globex.test	Member	Globex
Local Development Setup
Clone the repository:

Bash

git clone https://github.com/godumapraneeth/YardStick-Assessment.git
cd YardStick-Assessment
Backend Setup:

Bash

cd backend
npm install
# Create a .env.local file with MONGO_URI and JWT_SECRET
npm run dev
Frontend Setup:

Bash

cd ../frontend
npm install
# Create a .env file with VITE_API_URL=http://localhost:3000/api
npm run dev



| **Method** | **Endpoint**                 | **Description**                              | **Access**    |
| ---------- | ---------------------------- | -------------------------------------------- | ------------- |
| **GET**    | `/api/health`                | Health check endpoint.                       | Public        |
| **POST**   | `/api/auth/login`            | Authenticate a user and receive a JWT.       | Public        |
| **GET**    | `/api/notes`                 | List all notes for the authenticated tenant. | Member, Admin |
| **POST**   | `/api/notes`                 | Create a new note for the tenant.            | Member, Admin |
| **GET**    | `/api/notes/:id`             | Retrieve a specific note by its ID.          | Member, Admin |
| **PUT**    | `/api/notes/:id`             | Update a specific note.                      | Member, Admin |
| **DELETE** | `/api/notes/:id`             | Delete a specific note.                      | Member, Admin |
| **POST**   | `/api/tenants/:slug/upgrade` | Upgrade a tenant’s plan from **Free → Pro**. | Admin only    |

