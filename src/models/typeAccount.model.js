'use strict';

import { Schema, model } from 'mongoose';

const typeAccountSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    description: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

export default model('TypeAccount', typeAccountSchema);
