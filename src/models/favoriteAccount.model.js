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
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    },
    versionKey: false,
  },
);

export default model('FavoriteAccount', favoriteAccountSchema);
