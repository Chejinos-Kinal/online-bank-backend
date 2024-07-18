'use strict';

import express from 'express';

import {
  getAccounts,
  updateAccount,
  deleteAccount,
  getAccount,
} from '../controllers/account.controller.js';

const router = express.Router();

api.get('/', getAccounts);
api.put('/update/account/:id', updateAccount);
api.delete('/delete/account/:id', deleteAccount);
api.get('/get/account', getAccount);

export default router;
