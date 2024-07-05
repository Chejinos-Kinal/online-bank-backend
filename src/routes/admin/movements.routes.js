import express from 'express';

import { validateJwt, isAdmin } from '../../middlewares/validate-jwt.js';

import {
  updateMovement,
  changeStatus,
} from '../../controllers/movements.controller.js';

const router = express.Router();

// NOTE: movements routes
router.put(
  '/update/movement/:movementId',
  [validateJwt, isAdmin],
  updateMovement,
);
router.delete(
  '/change/status/:movementId',
  [validateJwt, isAdmin],
  changeStatus,
);

export default router;
