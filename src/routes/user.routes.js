'use strict'

import express from 'express'
import { createUser, deleteUser, getUser, getUserClient, getUsers, login, updateUser, updateUserClient } from '../controllers/user.controller.js'
import { validateJwt, isAdmin } from '../middlewares/validate-jwt.js'

const api = express.Router()

//Rutas publicas
api.post('/login', login)

//Rutas Admin
api.post('/createUser', [validateJwt, isAdmin] ,createUser)
api.put('/deleteUser/:id', [validateJwt, isAdmin], deleteUser)
api.put('/updateUser/:id', [validateJwt, isAdmin], updateUser)
api.get('/getUser/:id', [validateJwt, isAdmin], getUser)
api.get('/getUsers', [validateJwt, isAdmin], getUsers)

//Rutas User
api.get('/getUserClient/:id', [validateJwt], getUserClient)
api.put('/updateUserClient/:id', [validateJwt], updateUserClient)

export default api