'use strict';

import express from 'express';
import { validateJwt, isAdmin } from '../middlewares/validate-jwt.js';

// Controllers
import {
  getProducts,
  getProductsMostSold,
  searchProducts,
  getProductsByCategory,
  getProductsSoldOut,
  addProduct,
  updateProduct,
  deleteProduct,
} from '../controllers/products.controller.js';

const router = express.Router();

// Public routes
router.get('/', validateJwt, getProducts);
router.get('/most-sold', validateJwt, getProductsMostSold);
router.post('/search', validateJwt, searchProducts);
router.get('/category/:categoryName', validateJwt, getProductsByCategory);
router.get('/sold-out', validateJwt, getProductsSoldOut);

export default router;
