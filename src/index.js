import express from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import cors from 'cors';
import 'dotenv/config.js';

import connection from './db/mongo.js';
import { users, createAllUsers } from './default-data/user.data.js';
import {
  typeAccounts,
  createAllTypeAccounts,
} from './default-data/typeAccount.data.js';
import {
  createAllCategories,
  categories,
} from './default-data/category.data.js';
import { createAllProducts, products } from './default-data/products.data.js';

// NOTE: Routes
import userRoutes from './routes/user.routes.js';
import adminRoutes from './routes/admin/admin.routes.js';
import movementsRoutes from './routes/movements.routes.js';

const app = express();
const port = process.env.PORT || 3200;

// NOTE: Middlewares
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(morgan('dev'));

// NOTE: Routes
// NOTE: Product Routes are called from /user
app.use('/user', userRoutes);
app.use('/admin', adminRoutes);
app.use('/movement', movementsRoutes);

connection()
  .then(async () => {
    await createAllUsers(users);
    await createAllTypeAccounts(typeAccounts);
    await createAllCategories(categories);
    await createAllProducts(products);
  })
  .catch((error) => {
    console.error(error);
  })
  .finally(() => {
    app.listen(port, () => {
      console.log('Server on port', port);
    });
  });
