'use strict';

import { Schema, model } from 'mongoose';

const accountSchema = new Schema(
  {
    accountNumber: {
      type: String,
      required: true,
      unique: true,
    },
    balance: {
      type: Number,
      required: true,
    },
    typeAccount: {
      type: Schema.Types.ObjectId,
      ref: 'TypeAccount',
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

export default model('Account', accountSchema);
