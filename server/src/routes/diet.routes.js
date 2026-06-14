// routes/diet.js
import express from "express";
import { createDietPlan } from "../controllers/diet.controller.js";
import { protect } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/generate", protect, createDietPlan);

export default router;