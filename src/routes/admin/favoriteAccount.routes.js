'use strict';

import { validateJwt } from '../../middlewares/validate-jwt.js';
import express from 'express';

import {
  saveFavoriteAccount,
  updateFavoriteAccount,
  getFavoriteAccount,
  deleteFavoriteAccount,
} from '../../controllers/favoriteAccount.controller.js';

const api = express.Router();

api.get('/', [validateJwt], getFavoriteAccount);
api.post('/save/favorite/account', [validateJwt], saveFavoriteAccount);
api.put('/update/favorite/account/:id', [validateJwt], updateFavoriteAccount);
api.delete(
  '/delete/favorite/account/:id',
  [validateJwt],
  deleteFavoriteAccount,
);

export default api;
