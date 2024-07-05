import express from 'express';

import { validateJwt, isAdmin } from '../../middlewares/validate-jwt.js';

import {
  addProduct,
  updateProduct,
  deleteProduct,
} from '../../controllers/products.controller.js';

const router = express.Router();

// NOTE: products routes
router.post('/add/product', [validateJwt, isAdmin], addProduct);
router.put('/update/product/:productId', [validateJwt, isAdmin], updateProduct);
router.delete(
  '/delete/product/:productId',
  [validateJwt, isAdmin],
  deleteProduct,
);

export default router;
