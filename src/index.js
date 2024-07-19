import express from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import cors from 'cors';
import 'dotenv/config.js';

import connection from './db/mongo.js';
import {
  users,
  createAllUsers,
  accounts,
  createAllAccounts,
} from './default-data/user.data.js';
import {
  typeAccounts,
  createAllTypeAccounts,
} from './default-data/typeAccount.data.js';
import {
  createAllCategories,
  categories,
} from './default-data/category.data.js';
import { createAllProducts, products } from './default-data/products.data.js';
import { validateJwt, isAdmin } from './middlewares/validate-jwt.js';

// NOTE: Routes
import userRoutes from './routes/user.routes.js';
import adminRoutes from './routes/admin/admin.routes.js';
import { login } from './controllers/user.controller.js';

const app = express();
const port = process.env.PORT || 3200;

// NOTE: Middlewares
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(morgan('dev'));

// NOTE: Routes
app.post('/user/login', login);
app.use('/user', [validateJwt], userRoutes);
app.use('/admin', [validateJwt, isAdmin], adminRoutes);

connection()
  .then(async () => {
    await createAllTypeAccounts(typeAccounts);
    await createAllCategories(categories);
    await createAllProducts(products);
    await createAllAccounts(accounts);
    await createAllUsers(users);
  })
  .catch((error) => {
    console.error(error);
  })
  .finally(() => {
    app.listen(port, () => {
      console.log('Server on port', port);
    });
  });
