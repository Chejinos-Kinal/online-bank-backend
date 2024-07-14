'use strict';

import express from 'express';

import {
  saveFavoriteAccount,
  updateFavoriteAccount,
  getFavoriteAccount,
  deleteFavoriteAccount,
} from '../controllers/favoriteAccount.controller.js';

const router = express.Router();

router.get('/', getFavoriteAccount);
router.post('/save/favorite/account', saveFavoriteAccount);
router.put('/update/favorite/account/:id', updateFavoriteAccount);
router.delete('/delete/favorite/account/:id', deleteFavoriteAccount);

export default router;
