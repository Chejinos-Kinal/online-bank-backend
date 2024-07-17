'use strict';

import express from 'express';

import {
  getAccounts,
  updateAccount,
  deleteAccount,
} from '../../controllers/account.controller.js';

const router = express.Router();

router.get('/', getAccounts);
router.put('/update/account/:id', updateAccount);
router.delete('/delete/account/:id', deleteAccount);

export default router;
