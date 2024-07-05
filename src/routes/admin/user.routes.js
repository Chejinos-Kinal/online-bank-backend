import express from 'express';

import { validateJwt, isAdmin } from '../../middlewares/validate-jwt.js';

import {
  createUser,
  deleteUser,
  getUser,
  getUsers,
  updateUser,
} from '../../controllers/user.controller.js';

//Rutas Admin
router.get('/', [validateJwt, isAdmin], getUsers);
router.get('/user/:id', [validateJwt, isAdmin], getUser);
router.post('/create/user', [validateJwt, isAdmin], createUser);
router.put('/update/user/:id', [validateJwt, isAdmin], updateUser);
router.delete('/delete/user/:id', [validateJwt, isAdmin], deleteUser);

export default router;
