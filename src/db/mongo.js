'use strict';

import mongoose from 'mongoose';
import 'dotenv/config';

export default async function connection() {
  try {
    mongoose.connection.on('error', () => {
      console.log('Failed to connect database');
      mongoose.disconnect();
    });

    mongoose.connection.on('connected', () =>
      console.log('MongoDB | Connected to mongo'),
    );

    mongoose.connection.on('open', () =>
      console.log('MongoDB | Connected to database'),
    );

    await mongoose.connect(process.env.MONGODB_CNN, {});
  } catch (error) {
    console.error({ message: 'Database connection error', error });
  }
}
