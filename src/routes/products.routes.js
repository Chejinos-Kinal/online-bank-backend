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
router.get('/products', validateJwt, getProducts);
router.get('/products/most-sold', validateJwt, getProductsMostSold);
router.post('/search/products', validateJwt, searchProducts);
router.get(
  '/products/category/:categoryName',
  validateJwt,
  getProductsByCategory,
);
router.get('/products/sold-out', validateJwt, getProductsSoldOut);

// Admin routes
router.post('/add/product', [validateJwt, isAdmin], addProduct);
router.put('/update/product/:productId', [validateJwt, isAdmin], updateProduct);
router.delete(
  '/delete/product/:productId',
  [validateJwt, isAdmin],
  deleteProduct,
);

export default router;
