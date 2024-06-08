'use strict';

import express from 'express';
import { validateJwt } from '../middlewares/validate-jwt.js';

import {
  getAccounts,
  updateAccount,
  deleteAccount,
} from '../controllers/account.controller.js';

const api = express.Router();

api.get('/getAccounts', [validateJwt], getAccounts);
api.put('/updateAccount/:id', [validateJwt], updateAccount);
api.delete('/deleteAccount/:id', [validateJwt], deleteAccount);

export default api;
