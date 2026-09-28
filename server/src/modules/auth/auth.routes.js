import { Router } from "express";

import validate from "../../middlewares/validate.middleware.js";

import {
  googleLoginSchema,
  refreshSchema
} from "./auth.validation.js";

import {
  googleLogin,
  refresh,
  logout,
  logoutAll
} from "./auth.controller.js";

import authMiddleware from "./auth.middleware.js";

const router = Router();

router.post(
  "/google",
  validate(
    googleLoginSchema
  ),
  googleLogin
);

router.post(
  "/refresh",
  validate(
    refreshSchema
  ),
  refresh
);

router.post(
  "/logout",
  authMiddleware,
  logout
);

router.post(
  "/logout-all",
  authMiddleware,
  logoutAll
);

export default router;