
import express, { type Express, type NextFunction, type Request, type Response } from "express";
import cors from "cors";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import "dotenv/config";
import userRouter from "./modules/users/users.routes";
import courseRouter from "./modules/courses/courses.routes"
import { globalErrorHandler } from "./middlewares/error.middleware";
import { notFoundHandler } from "./middlewares/not-found.middleware";
import moduleRourer from "./modules/learningModules/modules.routes"
import mediaRouter from "./modules/media/media.routes"
import muxWebhookRoutes from "./webhooks/mux.webhook"
const app: Express = express();

// Security headers
app.use(helmet());

// CORS configuration
app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:4000",
    credentials: true,
  })
);
app.use(
  "/api/v1/webhooks/mux",
  express.raw({ type: "application/json" }),
  muxWebhookRoutes,
);
// Request body parsing
app.use(express.json({ limit: "1mb" }));
app.use(cookieParser())
app.use(express.urlencoded({ extended: true, limit: "1mb" }));

// Health check — app process running hai ya nahi
app.get("/health", (_req, res) => {
  res.status(200).json({
    success: true,
    message: "Server is healthy",
  });
});


// 404 handler


// // Central error handler



app.use("/api/v1/users",userRouter)

app.use("/api/v1/courses",courseRouter)

app.use("/api/v1/modules",moduleRourer)

app.use("/api/v1/media",mediaRouter)

app.use(notFoundHandler);
app.use(globalErrorHandler);

export default app;
