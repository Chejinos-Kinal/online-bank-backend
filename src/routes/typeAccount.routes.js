'use strict'

import express from 'express'

import { saveTypeAccount } from '../controllers/typeAccount.controller.js'

import { validateJwt, isAdmin } from '../middlewares/validate-jwt.js'

const api = express.Router()

api.post('/saveTypeAccount', [validateJwt, isAdmin], saveTypeAccount)

export default api
