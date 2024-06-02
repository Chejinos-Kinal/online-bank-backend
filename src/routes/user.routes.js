'use strict'

import express from 'express'
import { createUser, deleteUser, login, updateUser } from '../controllers/user.controller.js'
import { validateJwt, isAdmin } from '../middlewares/validate-jwt.js'

const api = express.Router()

api.post('/login', login)
api.post('/createUser', [validateJwt, isAdmin] ,createUser)
api.put('/deleteUser/:id', [validateJwt, isAdmin], deleteUser)
api.put('/updateUser/:id', [validateJwt, isAdmin], updateUser)

export default api