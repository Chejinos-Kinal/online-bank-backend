'use strict';

import express from 'express';

// Controllers
import {
  getCategories,
  addCategory,
  updateCategory,
  deleteCategory,
} from '../controllers/category.controller.js';

const router = express.Router();

router.get('/', getCategories);

export default router;
