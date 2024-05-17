import express from "express";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import cors from "cors";
import fileUpload from "express-fileupload";

import authRoutes from "./routes/auth.routes.js";
import taskRoutes from "./routes/tasks.routes.js";
import profileRoutes from "./routes/profile.routes.js";

const app = express();

app.use(cors({
  origin: 'https://admin.isolution.site',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['X-Requested-With', 'Content-Type', 'Authorization'],
  credentials: true
}));
app.use(morgan("dev"));
app.use(express.json());
app.use(cookieParser());
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "../upload",
  })
);

app.use("/api", authRoutes);
app.use("/api", taskRoutes);
app.use("/api", profileRoutes);

export default app;
