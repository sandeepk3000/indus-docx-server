# IndusDocx Backend

IndusDocx backend is the server-side application for a modern learning platform. It manages user authentication, course data, modular learning content, and media operations. The API layer enables frontend clients to securely interact with the system while enforcing access control and business rules.

This project is built using Node.js, Express, TypeScript, PostgreSQL, and Prisma. It is designed to support a scalable education platform with roles such as Admin, Instructor, and Student.

## Overview

The backend is responsible for:

- User registration and login
- Course creation and retrieval
- Learning module and lesson management
- Media upload authentication and video workflow support
- Role-based authorization
- Secure API communication with authenticated requests

## Key Features

- JWT-based authentication
- Role-based access control for different user types
- REST API structure for modular services
- PostgreSQL database integration via Prisma ORM
- Secure headers and CORS configuration
- Health check endpoint for service monitoring
- Media integration support for image and video workflows

## Tech Stack

- Node.js
- Express.js
- TypeScript
- PostgreSQL
- Prisma ORM
- JWT
- CORS
- Helmet
- dotenv

## Project Structure

```bash
server/
├── src/
│   ├── app.ts
│   ├── server.ts
│   ├── config/
│   ├── constants/
│   ├── middlewares/
│   ├── modules/
│   │   ├── users/
│   │   ├── courses/
│   │   ├── lessons/
│   │   ├── media/
│   │   └── learningModules/
│   └── utils/
├── .env.example
├── .gitignore
├── package.json
├── prisma.config.ts
├── tsconfig.json
├── README.md
└── migrations/
```

## Prerequisites

Before running the project, ensure you have:

- Node.js v18 or newer
- npm
- PostgreSQL database running locally or remotely
- Basic understanding of environment variables and terminal commands

## Installation

Navigate to the server directory and install dependencies:

```bash
cd server
npm install
```

## Environment Configuration

Create a `.env` file in the `server` directory based on `.env.example`:

```bash
copy .env.example .env
```

Then update the variables with your actual values:

```env
PORT=3000
CLIENT_URL=http://localhost:4000
DATABASE_URL="postgresql://username:password@localhost:5432/your_database"
ACCESS_TOKEN_SECRET=your_access_secret
REFRESH_TOKEN_SECRET=your_refresh_secret
IMAGEKIT_PUBLIC_KEY=your_imagekit_public_key
IMAGEKIT_PRIVATE_KEY=your_imagekit_private_key
MUX_TOKEN_ID=your_mux_token_id
MUX_TOKEN_SECRET=your_mux_token_secret
FRONTEND_URL=http://localhost:4000
```

Important:
- Never commit your `.env` file to version control.
- Keep all secrets secure and use environment-specific credentials for production.

## Database Setup

Generate Prisma client and apply migrations:

```bash
npx prisma generate
npx prisma migrate dev
```

If the project is set up correctly, Prisma will connect to your PostgreSQL database and apply the schema changes.

## Running the Server

Start the backend in development mode:

```bash
npm run dev
```

The server will run on the configured port, defaulting to `3000` if not overridden.

## Health Check

A simple health endpoint is available to verify the server is running:

```bash
http://localhost:3000/health
```

Expected response:

```json
{
  "success": true,
  "message": "Server is healthy"
}
```

## API Modules

### Users

- `POST /api/v1/users` — Create a new user
- `GET /api/v1/users` — Get all users
- `POST /api/v1/users/login` — User login
- `GET /api/v1/users/:email` — Get a user by email

### Courses

- `POST /api/v1/courses` — Create a course
- `GET /api/v1/courses` — Fetch course list
- `GET /api/v1/courses/:courseId` — Fetch course details by ID
- `GET /api/v1/courses/:courseId/curriculum` — Fetch curriculum for a course
- `GET /api/v1/courses/slug/:slug` — Fetch course by slug

### Modules and Lessons

- `POST /api/v1/modules/:courseId` — Create a new module
- `GET /api/v1/modules/:moduleId/lessons` — Get lessons in a module
- `POST /api/v1/modules/:moduleId/lessons` — Create a lesson

### Media

- `GET /api/v1/media/images/upload-auth` — Generate image upload auth
- `POST /api/v1/media/videos/upload-url/:passThrough` — Generate a video upload URL

## Roles and Authorization

The platform supports the following roles:

- `ADMIN`
- `INSTRUCTOR`
- `STUDENT`

Authorization is enforced through middleware to restrict access based on user role and token validity. This ensures that only permitted users can access protected routes and sensitive data.

## Available Scripts

```bash
npm run dev
npm run build
npm run start
npm run typecheck
npm run lint
```

### Script Explanation

- `npm run dev` — Start the project in development mode with hot reloading
- `npm run build` — Compile the TypeScript project
- `npm run start` — Run the production build
- `npm run typecheck` — Validate TypeScript correctness
- `npm run lint` — Run lint checks

## Common Troubleshooting

### Server is not starting

Check the following:

- `.env` file exists and contains valid values
- `DATABASE_URL` is correct
- PostgreSQL is running
- JWT secrets are configured

### Prisma errors

Run the following command:

```bash
npx prisma migrate dev
```

If there is still an issue, verify the database connection string and schema state.

### Missing dependencies

If the project is missing modules or fails to compile, reinstall dependencies:

```bash
rm -rf node_modules package-lock.json
npm install
```

## Notes

This project contains the backend API only. The frontend application is expected to be separate and will consume these endpoints for user interaction, course browsing, and educational content management.

## Summary

IndusDocx backend provides the foundation for a learning platform by handling user access, content management, media workflows, and secure API services. It is structured to scale cleanly with separate modules for users, courses, media, lessons, and learning content.

The main business logic is organized under the `src/modules` directory, which is the best place to start when working on feature development or debugging application behavior.

Happy coding.
