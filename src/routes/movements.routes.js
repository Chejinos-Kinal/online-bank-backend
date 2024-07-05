'use strict';

import express from 'express';

import {
  addMovement,
  changeStatus,
  getMovements,
  getMyMovements,
  updateMovement,
} from '../controllers/movements.controller.js';

import { validateJwt, isAdmin } from '../middlewares/validate-jwt.js';

const api = express.Router();

api.get('/', [validateJwt], getMovements);
api.get('/getMyMovements', [validateJwt], getMyMovements);
api.post('/addMovement', [validateJwt], addMovement);

export default api;
