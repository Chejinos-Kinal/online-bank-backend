'use strict';

import { validateJwt } from '../middlewares/validate-jwt.js';
import express from 'express';

import {
  getCategories,
  addCategory,
  updateCategory,
  deleteCategory,
} from '../controllers/category.controller.js';

const api = express.Router();

api.post('/addCategory', [validateJwt], addCategory);
api.put('/updateCategory/:id', [validateJwt], updateCategory);
api.delete('/deleteCategory/:id', [validateJwt], deleteCategory);
api.get('/getCategories', [validateJwt], getCategories);

export default api;
