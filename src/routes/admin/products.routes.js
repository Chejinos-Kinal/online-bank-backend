import express from 'express';

import {
  addProduct,
  updateProduct,
  deleteProduct,
} from '../../controllers/products.controller.js';

const router = express.Router();

// NOTE: products routes
router.post('/add/product', addProduct);
router.put('/update/product/:productId', updateProduct);
router.delete('/delete/product/:productId', deleteProduct);

export default router;
