import express from 'express';

import {
  getTypeAccount,
  getTypeAccounts,
  saveTypeAccount,
  updateTypeAccount,
  deleteTypeAccount,
} from '../../controllers/typeAccount.controller.js';

const router = express.Router();

// NOTE: typeAccount routes
router.get('/get/typeAccount', getTypeAccount);
router.get('/get/typeAccounts', getTypeAccounts);
router.post('/save/typeAccount', saveTypeAccount);
router.put('/update/typeAccount/:typeAccountId', updateTypeAccount);
router.delete('/delete/typeAccount/:typeAccountId', deleteTypeAccount);

export default router;
