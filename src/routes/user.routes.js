'use strict'
 
import express from 'express'
import { login } from '../controllers/user.controller.js'
 
const api = express.Router()
 
api.post('/login', login)
 
export default api

