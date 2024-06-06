import express from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import cors from 'cors';
import 'dotenv/config.js';

import connection from './db/mongo.js';
import { defaultAdmin } from './controllers/user.controller.js';
import { defaultTypeAccount } from './controllers/typeAccount.controller.js';

// NOTE: Routes
import userRoutes from './routes/user.routes.js';
import productsRoutes from './routes/products.routes.js';
import typeAccountRoutes from './routes/typeAccount.routes.js';

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
app.use('/products', productsRoutes);
app.use('/typeAccount', typeAccountRoutes);

connection()
  .then(() => {
    defaultAdmin();
    defaultTypeAccount();
  })
  .catch((error) => {
    console.error(error);
  })
  .finally(() => {
    app.listen(port, () => {
      console.log('Server on port', port);
    });
  });
