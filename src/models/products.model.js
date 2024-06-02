'use strict';

import { Schema, model } from 'mongoose';


const productsSchema = new Schema({
    /* id: {
        type: String,
        required: true,
        unique: true
    }, */
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
    fechaCreacion: {
        type: Date,
        required: true
    },
    fechaModificacion: {
        type: Date,
        required: true
    },
    changeStatus:{
        type: Boolean,
        required: true,
        default: true
    }
});

export default model('Products', productsSchema)