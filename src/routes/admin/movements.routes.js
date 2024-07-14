import express from 'express';

import {
  updateMovement,
  changeStatus,
} from '../../controllers/movements.controller.js';

const router = express.Router();

// NOTE: movements routes
router.put('/update/movement/:movementId', updateMovement);
router.delete('/change/status/:movementId', changeStatus);

export default router;
