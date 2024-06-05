'use strict';

import express from 'express';

import { deleteTypeAccount, getTypeAccount, getTypeAccounts, saveTypeAccount, updateTypeAccount } from '../controllers/typeAccount.controller.js';

import { validateJwt, isAdmin } from '../middlewares/validate-jwt.js';

const api = express.Router();

api.post('/saveTypeAccount', [validateJwt, isAdmin], saveTypeAccount);
api.delete('/deleteTypeAccount/:id', [validateJwt, isAdmin], deleteTypeAccount);
api.put('/updateTypeAccount/:id', [validateJwt, isAdmin], updateTypeAccount);
api.get('/getTypeAccount', [validateJwt, isAdmin], getTypeAccount);
api.get('/getTypeAccounts', [validateJwt, isAdmin], getTypeAccounts);

export default api;
