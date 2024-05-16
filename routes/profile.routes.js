import { Router } from "express";
import { authRequired } from "../middlewares/validateToken.js";
import {
  getProfile,
  createProfile,
  updateProfile,
  deleteProfile,
  getAllProfiles,
} from "../controllers/profile.controller.js";
import { validateSchema } from "../middlewares/validator.middleware.js";
import { createTaskSchema } from "../schemas/task.schema.js";
import verifyRole from "../middlewares/authMiddleware.js";

const router = Router();

router.get("/profile/:id", verifyRole("superadmin"), getProfile);
router.get("/profile", verifyRole("superadmin"), getAllProfiles);
router.post(
  "/profile",
  verifyRole("superadmin"),
  validateSchema(createTaskSchema),
  createProfile
);
router.delete("/profile/:id", verifyRole("superadmin"), deleteProfile);
router.put("/profile/:id", verifyRole("superadmin"), updateProfile);

export default router;
