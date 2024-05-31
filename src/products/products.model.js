'use strict';

import { Schema, model } from 'mongoose';

const productsSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    dateCreation: {
        type: Date,
        required: true
    },
    dateModified: {
        type: Date,
        required: true
    },
    changeStatus: {
        type: Boolean,
        required: true,
        default: true
    }
});

export default model('Products', productsSchema)