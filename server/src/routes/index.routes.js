import { Router } from "express";
import healthRoutes from "../health/health.routes.js";
import authRoutes from "../modules/auth/auth.routes.js";
import profileRoutes from
'../modules/profile/profile.routes.js';
import dietPlanRoutes
from '../modules/diet-plan/dietPlan.routes.js';



const router = Router();

router.use(
  "/health",
  healthRoutes
);

router.use(
  "/auth",
  authRoutes
);


router.use(
  '/profile',
  profileRoutes
);


router.use(
  '/diet-plans',
  dietPlanRoutes
);

export default router;