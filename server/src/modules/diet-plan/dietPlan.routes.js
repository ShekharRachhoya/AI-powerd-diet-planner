import { Router } from 'express';
import auth from '../../middlewares/auth.middleware.js';
import dietPlanController from './dietPlan.controller.js';

const router = Router();

router.post(
  '/generate',
  auth,
  dietPlanController.generate
);

router.get(
  '/latest',
  auth,
  dietPlanController.latest
);

export default router;