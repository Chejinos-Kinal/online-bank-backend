'use strict';

import express from 'express';

import {
  deleteTypeAccount,
  getTypeAccount,
  getTypeAccounts,
  saveTypeAccount,
  updateTypeAccount,
} from '../controllers/typeAccount.controller.js';

import { validateJwt, isAdmin } from '../middlewares/validate-jwt.js';

const router = express.Router();

router.post('/saveTypeAccount', [validateJwt, isAdmin], saveTypeAccount);
router.delete(
  '/deleteTypeAccount/:id',
  [validateJwt, isAdmin],
  deleteTypeAccount,
);
router.put('/updateTypeAccount/:id', [validateJwt, isAdmin], updateTypeAccount);
router.get('/getTypeAccount', [validateJwt, isAdmin], getTypeAccount);
router.get('/getTypeAccounts', [validateJwt, isAdmin], getTypeAccounts);

export default router;
