'use strict';

import { validateJwt } from '../middlewares/validate-jwt.js';
import express from 'express';

import {
  saveFavoriteAccount,
  updateFavoriteAccount,
  getFavoriteAccount,
  deleteFavoriteAccount,
} from '../controllers/favoriteAccount.controller.js';

const api = express.Router();

api.post('/saveFavoriteAccount', [validateJwt], saveFavoriteAccount);
api.put('/updateFavoriteAccount/:id', [validateJwt], updateFavoriteAccount);
api.delete('/deleteFavoriteAccount/:id', [validateJwt], deleteFavoriteAccount);
api.get('/getFavoriteAccount', [validateJwt], getFavoriteAccount);

export default api;
