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

export default model('Account', accountSchema);