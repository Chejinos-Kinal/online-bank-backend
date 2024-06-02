import express from 'express';
import {config} from 'dotenv';
import morgan from 'morgan';
import helmet from 'helmet';
import cors from 'cors'
import { defaultAdmin } from '../src/controllers/user.controller.js';
import userRoutes from '../src/routes/user.routes.js'
import productsRoutes from '../src/routes/products.routes.js'

const app = express()
config()
const port = process.env.PORT || 3200

app.use(express.urlencoded({extended: false}))
app.use(express.json())
app.use(cors())
app.use(helmet())
app.use(morgan('dev'))
app.use('/user', userRoutes)
app.use('/products', productsRoutes)

export const initServer = () => {
    defaultAdmin()
    app.listen(port)
    console.log(`Server running on port ${port}`)
}

