'use strict'

import jwt from 'jsonwebtoken'

const secretKey = '@LlaveSecreta@'

export const createToken = async (payload) => {
    try {
        return jwt.sign(payload, secretKey, {
            expiresIn: '3h',
            algorithm: 'HS256'
        })
    } catch (err) {
        console.error(err)
        return err
    }
}