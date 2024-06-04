'use strict';

import { Router } from 'express';

import {
    saveProduct,
    test,
    updateProduct,
    changeStatus,
    searchProduct,
    getProduct,
    searchFalseProducts
} from '../controllers/products.controller.js'

import {
    validateJwt, isAdmin
} from '../middlewares/validate-jwt.js'

const api = Router()

api.get('/test', test)
api.post('/saveProduct', [validateJwt, isAdmin], saveProduct)
api.put('/updateProduct/:id', [validateJwt, isAdmin], updateProduct)
api.get('/searchFalseProducts', [validateJwt, isAdmin], searchFalseProducts)
api.put('/changeStatus/:id', [validateJwt, isAdmin], changeStatus)
api.get('/searchProduct/:id', [validateJwt, isAdmin], searchProduct)
api.get('/getProduct', [validateJwt],getProduct)

api.get('/test', test)

export default api
