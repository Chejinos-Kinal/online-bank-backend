'use strict';

import express from 'express';

import { getAccounts } from '../controllers/account.controller.js';

const router = express.Router();

router.get('/', getAccounts);

export default router;
