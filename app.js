import express from "express";
import morgan from "morgan";
import cookieParser from "cookie-parser";
//import cors from "cors";
import fileUpload from "express-fileupload";

import authRoutes from "./routes/auth.routes.js";
import taskRoutes from "./routes/tasks.routes.js";
import profileRoutes from "./routes/profile.routes.js";

const app = express();

// app.use(
//   cors({
//     //origin: "https://admin.pixeltech.es",
//     origin: "https://admin.isolution.site",
//     //origin: "http://192.168.1.106:3030",
//     //methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
//     credentials: true,
//     //optionsSuccessStatus: 204,
//   })
// );
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
