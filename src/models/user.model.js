'use strict';

import { Schema, model } from 'mongoose';

const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    surname: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    idAccount: {
        type: Schema.Types.ObjectId,
        ref: 'Account',
        required: false,
        unique: true
    },
    DPI: {
        type: String,
        required: true,
        unique: true,
        maxlength: 13
    },
    address: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    nameJob: {
        type: String,
        required: true
    },
    monthlySalary: {
        type: Number,
        required: true
    },
    role: {
        type: String,
        uppercase: true,
        enum: ['ADMIN', 'USER'],
        required: true
    }
});

export default model('User', userSchema);