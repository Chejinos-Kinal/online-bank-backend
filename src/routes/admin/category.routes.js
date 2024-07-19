import express from 'express';

import {
  addCategory,
  updateCategory,
  deleteCategory,
  getCategories,
} from '../../controllers/category.controller.js';

const router = express.Router();

// NOTE: categories routes
router.get('/get/categories', getCategories);
router.post('/add/category', addCategory);
router.put('/update/category/:categoryId', updateCategory);
router.delete('/delete/category/:categoryId', deleteCategory);

export default router;
