import express from 'express';

import { validateJwt, isAdmin } from '../../middlewares/validate-jwt.js';

import {
  getTypeAccount,
  getTypeAccounts,
  saveTypeAccount,
  updateTypeAccount,
  deleteTypeAccount,
} from '../../controllers/typeAccount.controller.js';

const router = express.Router();

// NOTE: typeAccount routes
router.get('/get/typeAccount', [validateJwt, isAdmin], getTypeAccount);
router.get('/get/typeAccounts', [validateJwt, isAdmin], getTypeAccounts);
router.post('/save/typeAccount', [validateJwt, isAdmin], saveTypeAccount);
router.put(
  '/update/typeAccount/:typeAccountId',
  [validateJwt, isAdmin],
  updateTypeAccount,
);
router.delete(
  '/delete/typeAccount/:typeAccountId',
  [validateJwt, isAdmin],
  deleteTypeAccount,
);

export default router;
