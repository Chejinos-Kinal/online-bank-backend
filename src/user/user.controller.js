'use strict'

import User from './user.model.js'
import { encrypt, checkPassword } from '../utils/validator.js'
import { createToken } from '../utils/jwt.js'

// ----------------------------------------------- ADMIN -----------------------------------------------
export const defaultAdmin = async () => {
    try {
        let existingAdmin = await User.findOne({ role: 'ADMIN' })
        if (!existingAdmin) {
            let data = {
                name: 'Admin',
                surname: 'Default',
                username: 'ADMINB',
                DPI: '1234567890101',
                address: 'Calle 123',
                phoneNumber: '12345678',
                email: 'admin@gmail.com',
                password: await encrypt('ADMINB'),
                nameJob: 'Admin',
                monthlySalary: 0,
                role: 'ADMIN'
            }
            let user = new User(data)
            await user.save()
            return console.log('Admin by default created')
        } else {
            return console.log('Admin by default already exist')
        }
    } catch (error) {
        console.error(error)
    }
}

export const login = async (req, res) => {
    try {
        let { username, password, email } = req.body
        let user = await User.findOne({
            $or: [
                { username: username },
                { email: email }
            ]
        })
        if (user && await checkPassword(password, user.password)) {
            let loggedUser = {
                uid: user._id,
                username: user.username,
                name: user.name,
                surname: user.surname,
                role: user.role,
                DPI: user.DPI
            }
            let token = await createToken(loggedUser)
            return res.send({
                message: `Welcome ${user.name}`,
                loggedUser,
                token
            })
        }
        return res.status(404).send({ message: 'Invalid credentials' })
    } catch (error) {
        console.error(error)
        return res.status(500).send({ message: 'Error logging in' })
    }
}