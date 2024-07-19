import express from 'express';

import {
  createUser,
  deleteUser,
  getUser,
  getUsers,
  updateUser,
  updateUserForAdmin,
} from '../../controllers/user.controller.js';

const router = express.Router();

//Rutas Admin
router.get('/', getUsers);
router.get('/user/:id', getUser);
router.post('/create/user', createUser);
router.put('/update/user/:id', updateUser);
router.delete('/delete/user/:id', deleteUser);
router.put('/update/userA/:id', updateUserForAdmin);
export default router;
