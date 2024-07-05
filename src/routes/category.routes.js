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

router.get('/', validateJwt, getCategories);

export default router;
