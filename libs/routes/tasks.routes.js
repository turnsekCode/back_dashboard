import { Router } from "express";
import { authRequired } from "../middlewares/validateToken.js";
import {
  getTask,
  createTask,
  updateTask,
  deleteTask,
  getTaskSlug,
  getAllTasks,
} from "../controllers/tasks.controller.js";
import { validateSchema } from "../middlewares/validator.middleware.js";
import { createTaskSchema } from "../schemas/task.schema.js";
import verifyRole from "../middlewares/authMiddleware.js";

const router = Router();

router.get("/projects/:id", getTask);
router.get("/project/:slug", getTaskSlug);
router.get("/projects", getAllTasks);
router.post("/projects", validateSchema(createTaskSchema), createTask);
router.delete("/projects/:id", deleteTask);
router.put("/projects/:id", updateTask);

export default router;
