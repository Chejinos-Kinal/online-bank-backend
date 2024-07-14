'use strict';

import express from 'express';

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
router.get('/', getProducts);
router.get('/most-sold', getProductsMostSold);
router.post('/search', searchProducts);
router.get('/category/:categoryName', getProductsByCategory);
router.get('/sold-out', getProductsSoldOut);

export default router;
