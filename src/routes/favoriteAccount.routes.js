'use strict';

import { validateJwt } from '../middlewares/validate-jwt.js';
import express from 'express';

import {
  saveFavoriteAccount,
  updateFavoriteAccount,
  getFavoriteAccount,
  deleteFavoriteAccount,
} from '../controllers/favoriteAccount.controller.js';

const router = express.Router();

router.get('/', [validateJwt], getFavoriteAccount);
router.post('/save/favorite/account', [validateJwt], saveFavoriteAccount);
router.put(
  '/update/favorite/account/:id',
  [validateJwt],
  updateFavoriteAccount,
);
router.delete(
  '/delete/favorite/account/:id',
  [validateJwt],
  deleteFavoriteAccount,
);

export default router;
