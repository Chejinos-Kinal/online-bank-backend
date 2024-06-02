'use strict'

import User from '../models/user.model.js'
import Account from '../models/account.model.js'
import { encrypt, checkPassword } from '../utils/validator.js'
import { createToken } from '../utils/jwt.js'

// ----------------------------------------------- ADMIN -----------------------------------------------
export const defaultAdmin = async() => {
    try {
        let existingAdmin = await User.findOne({role: 'ADMIN'})
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

const generateAccountNumber = () => {
    let accountNumber = ''
    for (let i = 0; i < 11; i++) {
        accountNumber += Math.floor(Math.random() * 10).toString()
    }
    return accountNumber
}

export const createUser = async(req, res) => {
    try {
        let data = req.body
        data.password = await encrypt(data.password)
        let existingUser = await User.findOne({
            $or: [
                {username: data.username},
                {email: data.email}
            ]
        })
        if(existingUser) return res.status(400).send({message: 'User already exist'})
        let accountNumber = generateAccountNumber()
        let account = new Account({
            accountNumber: accountNumber,
            balance: 0,
            typeAccount: data.typeAccount
        })
        await account.save()
        data.idAccount = account._id
        let user = new User(data)
        await user.save()
        return res.send({ message: 'User created succesfully' })
    } catch (error) {
        console.error(error)
        return res.status(500).send({ message: 'Error creating user' })
    }
}

export const deleteUser = async(req, res) => {
    try {
        let eliminateUser = req.params.id
        let userId = req.user._id
        let existingUser = await User.findOne({_id: eliminateUser, status: true})
        if(!existingUser) return res.status(401).send({ message: 'User not found and not deleted' })
        if((existingUser.role === 'ADMIN') && (userId != eliminateUser)) return res.status(400).send({ message: 'You can not delete another admin'})
        let deleteUser = await User.findOneAndUpdate(
            {_id: eliminateUser},
            {status: false},
            {new: true}
        )
        if(!deleteUser) return res.status(401).send({ message: 'User not found and not deleted' })
        return res.send({ message: `User ${existingUser.username} deleted succesfully` })
    } catch (error) {
        console.error(error)
        return res.status(500).send({message: 'Error deleting user'})
    }
}

export const updateUser = async(req,res) => {
    try {
        let data = req.body
        let updateUser = req.params.id
        let userId = req.user._id
        let existingUser = await User.findOne({_id: updateUser})
        if((existingUser.role == 'ADMIN') && (updateUser != userId)) return res.status(400).send({ message: 'You can not update another admin'})
        if(data.DPI || data.password) return res.status(401).send({ message:'The DPI or password cannot be changed'})
        let updatedUser = await User.findOneAndUpdate(
            {_id: updateUser},
            data,
            {new: true}
        )
        if (!updatedUser) return res.status(404).send({message: 'User not found and not updated'})
        return res.send({ message: `User ${updatedUser.username} updated succesfully`})    
    } catch (error) {
        console.error(error)
        return res.status(500).send({ message: 'Error updating user' })
    }
}

export const login = async(req, res) => {
    try {
        let {username, password, email} = req.body
        let user = await User.findOne({
            $or: [
                {username: username},
                {email: email}
            ]
        })
        if(user && await checkPassword(password, user.password)){
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