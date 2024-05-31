'use strict'

import Product from './products.model.js'
import { checkUpdate } from '../utils/validator.js'

export const test = (req, res) => {
    return res.send({ message: 'Function test is running | Product' })
}

export const saveProduct = async (req, res) => {
    try {
        let data = req.body
        data.status = true
        let product = new Product(data)
        await product.save()
        return res.status(200).send({ message: 'Product saved successfully.' })
    } catch (err) {
        console.error(err)
        return res.status(500).send({ message: 'Error saving the product.', err })
    }
}


export const updateProduct = async (req, res) => {
    try {
        let { id } = req.params
        let data = req.body
        let update = checkUpdate(data, id)
        if (!update) return res.status(400).send({ message: 'Have submitted some data that cannot be updated or missing data.' })
        let updateProduct = await Product.findOneAndUpdate(
            { _id: id },
            data,
            { new: true }
        )
        if (!updateProduct) return res.status(404).send({ message: 'Product not found, not updated.' })
        return res.send({ message: 'Product updated successfully.', updateProduct })
    } catch (err) {
        console.error(err)
        return res.status(500).send({ message: 'Error updating product.', err })
    }
}

export const changeStatus = async (req, res) => {
    try {
        let { id } = req.params
        let data = req.body
        data.changeStatus = false
        if ((data.name != null) || (data.description != null) || (data.type != null) || (data.price != null) || (data.dateCreation != null) || (data.dateModified != null)) {
            return res.status(401).send({ message: 'You only can update the status.' })
        }
        let update = checkUpdate(data, id)
        if (!update) return res.status(400).send({ message: 'Have submitted some data that cannot be updated or missing data.' })
        let updateProductFalse = await Product.findOneAndUpdate(
            { _id: id },
            data,
            { new: true }
        )
        if (!updateProductFalse) return res.status(404).send({ message: 'Product not found, not updated.' })
        return res.send({ message: 'Product updated succesfully.', updateProductFalse })
    } catch (err) {
        console.error(err)
        return res.status(500).send({ message: 'Error updating product.', err })
    }
}


export const searchFalseProducts = async (req, res) => {
    try {
        const falseProducts = await Product.find({ changeStatus: false })
        if (falseProducts.length === 0) {
            return res.status(404).json({ message: 'No false products.' })
        }
        res.status(200).json(falseProducts)
    } catch (error) {
        console.error('Error searching for products.', error)
        res.status(500).json({ message: 'Internal Server Error.' })
    }
}

export const searchProduct = async (req, res) => {
    try {
        let { id } = req.params
        let products = await Product.findOne({ _id: id })
        if (!products) return res.status(404).send({ message: 'Product not found.' })
        return res.status(200).send({ message: 'Product found.', products })
    } catch (err) {
        console.error(err)
        return res.status(500).send({ message: 'Error searching product', err })
    }
}

export const getProduct = async (req, res) => {
    try {
        let products = await Product.find()
        return res.send({ products })
    } catch (err) {
        console.error(err)
        return res.status(500).send({ message: 'Error getting product.' })
    }
}
