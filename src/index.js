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

// NOTE: Routes
import userRoutes from './routes/user.routes.js';
/* import productsRoutes from './routes/products.routes.js'; */
import typeAccountRoutes from './routes/typeAccount.routes.js';
import movementRoutes from '../src/routes/movements.routes.js';

const app = express();
const port = process.env.PORT || 3200;

// NOTE: Middlewares
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(morgan('dev'));

// NOTE: Routes
app.use('/user', userRoutes);
/* app.use('/products', productsRoutes); */
app.use('/typeAccount', typeAccountRoutes);
app.use('/movement', movementRoutes);

connection()
  .then(() => {
    createAllUsers(users);
    createAllTypeAccounts(typeAccounts);
  })
  .catch((error) => {
    console.error(error);
  })
  .finally(() => {
    app.listen(port, () => {
      console.log('Server on port', port);
    });
  });
