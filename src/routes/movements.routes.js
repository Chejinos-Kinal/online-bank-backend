'use strict';

import express from 'express';

import {
  addMovement,
  changeStatus,
  getMovements,
  getMyMovements,
  updateMovement,
} from '../controllers/movements.controller.js';

const router = express.Router();

router.get('/', getMovements);
router.get('/getMyMovements', getMyMovements);
router.post('/addMovement', addMovement);

export default router;
