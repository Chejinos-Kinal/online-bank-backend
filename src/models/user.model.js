'use strict';

import { Schema, model } from 'mongoose';

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    surname: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
      unique: true,
    },
    // FIXME: This must be unique: true but the problem is we must create and then add the idAccount (_id) to the user
    idAccount: {
      type: Schema.Types.ObjectId,
      ref: 'Account',
      required: false,
      unique: false,
    },
    DPI: {
      type: String,
      required: true,
      unique: true,
      maxlength: 13,
    },
    address: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    //NOTE: May this should be a reference to a collection of jobs
    nameJob: {
      type: String,
      required: true,
    },
    monthlySalary: {
      type: Number,
      required: true,
    },
    role: {
      type: String,
      uppercase: true,
      enum: ['ADMIN', 'USER'],
      required: true,
    },
    //NOTE: This may should be deleted
    status: {
      type: Boolean,
      required: true,
      default: true,
    },
    cart: [
      {
        product: {
          type: Schema.Types.ObjectId,
          ref: 'Product',
          required: false,
        },
        quantity: {
          type: Number,
          required: false,
        },
      },
    ],
    purchases: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Purchase',
        required: false,
        default: [],
      },
    ],
  },
  {
    versionKey: false,
    timestamps: true,
  },
);

export default model('User', userSchema);
