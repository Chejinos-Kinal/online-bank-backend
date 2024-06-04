'use strict';

import { Schema, model } from 'mongoose';

const movementsSchema = new Schema({
  id: {
    type: String,
    required: true,
    unique: true,
  },
  account: {
    type: Schema.Types.ObjectId,
    ref: 'Account',
    required: true,
  },
  numberAccountDestination: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  typeMovement: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  state: {
    type: String, // Assuming 'Tipo' should be 'String'
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  products: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Product',
      required: true,
    },
  ],
});

export default model('Movements', movementsSchema);
