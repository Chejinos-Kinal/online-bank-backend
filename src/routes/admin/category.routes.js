import express from 'express';

import { validateJwt, isAdmin } from '../../middlewares/validate-jwt.js';

import {
  addCategory,
  updateCategory,
  deleteCategory,
} from '../../controllers/category.controller.js';

const router = express.Router();

// NOTE: categories routes
router.post('/add/category', [validateJwt, isAdmin], addCategory);
router.put(
  '/update/category/:categoryId',
  [validateJwt, isAdmin],
  updateCategory,
);
router.delete(
  '/delete/category/:categoryId',
  [validateJwt, isAdmin],
  deleteCategory,
);

export default router;
