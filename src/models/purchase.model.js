'use strict';

import { Schema, model } from 'mongoose';

const purchaseSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    products: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Product',
        required: true,
      },
    ],
  },
  {
    timestamps: true,
  },
);

export default model('Purchase', purchaseSchema);
