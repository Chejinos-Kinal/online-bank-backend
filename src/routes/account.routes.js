'use strict';

import express from 'express';

import { getAccount } from '../controllers/account.controller.js';

const router = express.Router();

router.get('/get/account', getAccount);

export default router;
