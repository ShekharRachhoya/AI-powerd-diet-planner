import { Router } from 'express';

import profileController from './profile.controller.js';
import auth from '../../middlewares/auth.middleware.js';
import validate from '../../middlewares/validate.middleware.js';

import {
  profileSchema,
  updateProfileSchema
} from './profile.validation.js';

const router = Router();

router.get(
  '/',
  auth,
  profileController.get
);

router.post(
  '/',
  auth,
  validate(profileSchema),
  profileController.createOrUpdate
);

router.patch(
  '/',
  auth,
  validate(updateProfileSchema),
  profileController.createOrUpdate
);

router.delete(
  '/',
  auth,
  profileController.delete
);

export default router;