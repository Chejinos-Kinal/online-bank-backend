'use strict';

import express from 'express';
import {
  createUser,
  deleteUser,
  getUser,
  getUserClient,
  getUsers,
  login,
  updateUser,
  updateUserClient,
  getCart,
  addTocart,
  purchase,
  removeFromCart,
  getPurchases,
} from '../controllers/user.controller.js';

import productsRoutes from './products.routes.js';
import movementsRoutes from './movements.routes.js';
import typeAccountRoutes from './typeAccount.routes.js';
import categoriesRoutes from './category.routes.js';
import favoriteAccountRoutes from './favoriteAccount.routes.js';
import accountRoutes from './account.routes.js';

import { validateJwt, isAdmin } from '../middlewares/validate-jwt.js';

const router = express.Router();

// NOTE: this routes are called from /user
router.use(productsRoutes);
router.use(categoriesRoutes);
router.use('/movement', movementsRoutes);
router.use('/typeAccount', typeAccountRoutes);
router.use('/account', accountRoutes);
router.use('/favoriteAccount', favoriteAccountRoutes);

//Rutas publicas
router.post('/login', login);

//Rutas Admin
router.post('/createUser', [validateJwt, isAdmin], createUser);
router.put('/deleteUser/:id', [validateJwt, isAdmin], deleteUser);
router.put('/updateUser/:id', [validateJwt, isAdmin], updateUser);
router.get('/getUser/:id', [validateJwt, isAdmin], getUser);
router.get('/getUsers', [validateJwt, isAdmin], getUsers);

//Rutas User
router.get('/getUserClient/:id', [validateJwt], getUserClient);
router.put('/updateUserClient/:id', [validateJwt], updateUserClient);

// Cart
router.get('/cart', validateJwt, getCart);
router.post('/cart', validateJwt, addTocart);
router.post('/cart/purchase', validateJwt, purchase);
router.delete('/cart/delete/:productId', validateJwt, removeFromCart);

// Purchases
router.get('/purchases', validateJwt, getPurchases);

export default router;
