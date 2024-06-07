'use strict';

import express from 'express';

import {
  addMovement,
  /* deleteMovement, */ getMovements,
  getMovementsAsc,
  getMovementsDes,
  getMyMovements,
  updateMovement,
} from '../controllers/movements.controller.js';

import { validateJwt, isAdmin } from '../middlewares/validate-jwt.js';

const api = express.Router();

api.post('/addMovement', [validateJwt], addMovement);
api.put('/updateMovement/:id', [validateJwt, isAdmin], updateMovement);
/* api.delete('/deleteMovement/:id', [validateJwt, isAdmin], deleteMovement) */
api.get('/getMovements', [validateJwt], getMovements);
api.get('/getMyMovements', [validateJwt], getMyMovements);
api.get('/getMovementsAsc', [validateJwt, isAdmin], getMovementsAsc);
api.get('/getMovementsDes', [validateJwt, isAdmin], getMovementsDes);
export default api;
