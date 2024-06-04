'use strict';

import { Schema, model } from 'mongoose';

const productSchema = new Schema(
  {
    /* id: {
        type: String,
        required: true,
        unique: true
    }, */
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    changeStatus: {
      type: Boolean,
      required: true,
      default: true,
    },
  },
  {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    },
  },
);
export default model('Product', productSchema);
