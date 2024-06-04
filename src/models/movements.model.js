'use strict';

import { Schema, model } from 'mongoose';

const movementsSchema = new Schema({
    user:{
        type:Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    account:{
        type:Schema.Types.ObjectId,
        ref:'Account',
        required:true
    },
    numberAccountDestination: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        required: true,
        default: Date.now()
    },
    status: {
        type: Boolean,  // Assuming 'Tipo' should be 'String'
        required: true,
        default: true
    },
    description: {
        type: String,
        required: true
    }/* ,
    products:[{
        type:Schema.Types.ObjectId,
        ref:'Product',
        required:true
    }] */
});

export default model('Movements', movementsSchema);