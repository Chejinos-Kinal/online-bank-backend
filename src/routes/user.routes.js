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

import { validateJwt, isAdmin } from '../middlewares/validate-jwt.js';

const router = express.Router();

router.use(productsRoutes);

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
router.get('/cart', /* isLoggedIn, */ getCart);
router.post('/cart', /* isLoggedIn, */ addTocart);
router.post('/cart/purchase', /* isLoggedIn, */ purchase);
router.delete('/cart/delete/:productId', /* isLoggedIn, */ removeFromCart);

// Purchases
router.get('/purchases', /* isLoggedIn, */ getPurchases);

export default router;
