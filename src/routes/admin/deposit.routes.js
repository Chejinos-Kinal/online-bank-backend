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

router.post('/add/deposit', [validateJwt, isAdmin], newDeposit);
router.get(
  '/get/depositsUser',
  [validateJwt, isAdmin],
  getDepositsByLoggedUser,
);
router.put('/update/deposit/:id', [validateJwt, isAdmin], updateDeposit);
router.put('/revert/deposit/:id', [validateJwt, isAdmin], revertDeposit);
router.get('/get/deposits', [validateJwt, isAdmin], getDeposits);

export default router;
