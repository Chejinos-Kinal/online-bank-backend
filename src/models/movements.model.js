'use strict';

import { Schema, model } from 'mongoose';

const movementsSchema = new Schema({
    id: {
        type: String,
        required: true,
        unique: true
    },
    numberAccountOrigin: {
        type: String,
        required: true
    },
    numberAccountDestination: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    typeMovement: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    state: {
        type: String,  // Assuming 'Tipo' should be 'String'
        required: true
    },
    description: {
        type: String,
        required: true
    },
    idProduct: {
        type: String,
        required: true
    }
});

export default model('Movements', movementsSchema);