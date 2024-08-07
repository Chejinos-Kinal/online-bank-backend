import express from 'express';

import productsRoutes from './products.routes.js';
import categoryRoutes from './category.routes.js';
import movementsRoutes from './movements.routes.js';
import typeAccountRoutes from './typeAccount.routes.js';
import userRoutes from './user.routes.js';
import accountRoutes from './account.routes.js';
import depositRoutes from './deposit.routes.js';

const router = express.Router();

// NOTE: user routes
router.use('/users', userRoutes);

// NOTE: products routes
router.use('/products', productsRoutes);

// NOTE: category routes
router.use('/categories', categoryRoutes);

// NOTE: movements routes
router.use('/movements', movementsRoutes);

// NOTE: type account routes
router.use('/typeAccount', typeAccountRoutes);

// NOTE: type account routes
router.use('/accounts', accountRoutes);

// NOTE: deposit routes
router.use('/deposits', depositRoutes);

export default router;
