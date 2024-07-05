'use strict';

import express from 'express';
import { validateJwt } from '../middlewares/validate-jwt.js';

import {
  getAccounts,
  updateAccount,
  deleteAccount,
  getAccount
} from '../controllers/account.controller.js';

const api = express.Router();

api.get('/', [validateJwt], getAccounts);
api.put('/update/account/:id', [validateJwt], updateAccount);
api.delete('/delete/account/:id', [validateJwt], deleteAccount);
api.get('/get/account/:idUser', [validateJwt], getAccount)

export default api;
