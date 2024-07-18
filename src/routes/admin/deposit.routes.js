import express from 'express';

import { validateJwt, isAdmin } from '../../middlewares/validate-jwt.js';

import {
  getDeposits,
  getDepositsByLoggedUser,
  newDeposit,
  revertDeposit,
  updateDeposit,
} from '../../controllers/deposits.controller.js';

const router = express.Router();

router.post('/add/deposit', newDeposit);
router.get('/get/depositsUser', getDepositsByLoggedUser);
router.put('/update/deposit/:id', updateDeposit);
router.put('/revert/deposit/:id', revertDeposit);
router.get('/get/deposits', getDeposits);

export default router;
