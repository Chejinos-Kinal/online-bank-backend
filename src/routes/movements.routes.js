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

api.post('/addMovement', [validateJwt], addMovement);
api.put('/updateMovement/:id', [validateJwt, isAdmin], updateMovement);
api.delete('/changeStatus/:id', [validateJwt, isAdmin], changeStatus);
api.get('/getMovements', [validateJwt], getMovements);
api.get('/getMyMovements', [validateJwt], getMyMovements);
export default api;
