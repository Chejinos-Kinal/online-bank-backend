import express from 'express';

import {
  addCategory,
  updateCategory,
  deleteCategory,
} from '../../controllers/category.controller.js';

const router = express.Router();

// NOTE: categories routes
router.post('/add/category', addCategory);
router.put('/update/category/:categoryId', updateCategory);
router.delete('/delete/category/:categoryId', deleteCategory);

export default router;
