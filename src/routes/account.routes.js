'use strict';

import express from 'express';

import {
  getAccounts,
  updateAccount,
  deleteAccount,
  getAccount,
} from '../controllers/account.controller.js';

const router = express.Router();

router.get('/', getAccounts);
router.put('/update/account/:id', updateAccount);
router.delete('/delete/account/:id', deleteAccount);
router.get('/get/account', getAccount);

export default router;
