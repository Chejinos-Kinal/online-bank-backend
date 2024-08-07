'use strict';

import express from 'express';
import {
  getUserClient,
  updateMyUser,
  getCart,
  addTocart,
  purchase,
  removeFromCart,
  getPurchases,
  getUser,
} from '../controllers/user.controller.js';

import productsRoutes from './products.routes.js';
import movementsRoutes from './movements.routes.js';
import categoriesRoutes from './category.routes.js';
import favoriteAccountRoutes from './favoriteAccount.routes.js';
import accountRoutes from './account.routes.js';

const router = express.Router();

// NOTE: this routes are called from /user
router.use('/products', productsRoutes);
router.use('/categories', categoriesRoutes);
router.use('/movements', movementsRoutes);
router.use('/accounts', accountRoutes);
router.use('/favoriteAccounts', favoriteAccountRoutes);

//Rutas User
router.get('/getUserClient/:id', getUserClient);
router.put('/updateUserClient', updateMyUser);
router.get('/getUser', getUser);

// Cart
router.get('/cart', getCart);
router.get('/cart/purchase', purchase);
router.post('/cart', addTocart);
router.delete('/cart/delete/:productId', removeFromCart);

// Purchases
router.get('/purchases', getPurchases);

export default router;
