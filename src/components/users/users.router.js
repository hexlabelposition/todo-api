import { Router } from "express";
import { getAllUsers, getUserById } from "./users.controller.js";

const router = Router();

router.get("/", getAllUsers);
router.get("/:userId", getUserById);

export default router;