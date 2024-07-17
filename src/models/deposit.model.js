'use strict';

import { Schema, model } from 'mongoose';

const depositSchema = new Schema(
  {
    accountNumber: {
      type: Number,
      ref: 'Account',
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    status: {
      type: Boolean,
      required: true,
      default: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

export default model('Deposits', depositSchema);
