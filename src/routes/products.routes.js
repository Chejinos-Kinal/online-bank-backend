'use strict'

import { Router } from 'express'

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
    validateJwt,
} from '../middlewares/validate-jwt.js'

const api = Router()


api.get('/test', test)
api.post('/saveProduct', [validateJwt], saveProduct)
api.put('/updateProduct/:id', [validateJwt], updateProduct)
api.get('/searchFalseProducts', [validateJwt], searchFalseProducts)
api.put('/changeStatus/:id', [validateJwt], changeStatus)
api.get('/searchProduct/:id', [validateJwt], searchProduct)
api.get('/getProduct', getProduct)

api.get('/test', test)

export default api
