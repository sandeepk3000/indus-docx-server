export const MESSAGES = {
  SUCCESS: {
    OK: "Request successful",
    CREATED: "Resource created successfully",
    USER_FETCHED: "User fetched successfully",
    USER_UPDATED: "User updated successfully",
    USER_DELETED: "User deleted successfully",
    SEVER_RUNED:(port:number)=> `Server running on port ${port}`,
    DATABASE_CONNECTED:"✅ Database connected successfully"
  },

  ERROR: {
    BAD_REQUEST: "Invalid request",
    VALIDATION_FAILED: "Validation failed",
    UNAUTHORIZED: "Authentication required",
    FORBIDDEN: "You do not have permission",
    NOT_FOUND: "Resource not found",
    ROUTE_NOT_FOUND: "Route not found",
    EMAIL_ALREADY_EXISTS: "Email already exists",
    INTERNAL_SERVER_ERROR: "Internal server error",
    DATABASE_UNAVAILABLE: "Database is temporarily unavailable",
    SEVER_FAILED:"❌ Server startup failed",
    DATABASE_CONNECTION_FAILED:"Database connection/verification failed",
    COURSE_SLUG_ALREADY_EXISTS: "Course slug already exists",
  },
} as const;