'use strict';

import express from 'express';

// Controllers
import {
  getCategories,
  addCategory,
  updateCategory,
  deleteCategory,
} from '../controllers/category.controller.js';

import { validateJwt, isAdmin } from '../middlewares/validate-jwt.js';

const router = express.Router();

router.get('/categories', validateJwt, getCategories);
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
