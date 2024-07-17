'use strict';

import express from 'express';

import {
  getAccounts,
  updateAccount,
  deleteAccount,
  getAccount,
} from '../controllers/account.controller.js';

const router = express.Router();

api.get('/', [validateJwt], getAccounts);
api.put('/update/account/:id', [validateJwt], updateAccount);
api.delete('/delete/account/:id', [validateJwt], deleteAccount);
api.get('/get/account', [validateJwt], getAccount);

export default router;
