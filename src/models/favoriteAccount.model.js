'use strict';

import { Schema, model } from 'mongoose';

const favoriteAccountSchema = new Schema(
  {
    accountNumber: {
      type: String,
      required: true,
    },
    idUser: {
      type: Schema.ObjectId,
      ref: 'User',
      required: true,
    },
    alias: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

export default model('FavoriteAccount', favoriteAccountSchema);
