'use strict';

import { Schema, model } from 'mongoose';

const productSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: false,
    },
    price: {
      type: Number,
      min: 0,
      required: true,
    },
    stock: {
      type: Number,
      min: 0,
      required: true,
    },
    timesSold: {
      type: Number,
      default: 0,
      required: false,
    },
    // NOTE: This may be useful for future implementations
    // category: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: 'Category',
    //   required: true,
    // },
  },
  {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    },
    versionKey: false,
  },
);
export default model('Product', productSchema);
