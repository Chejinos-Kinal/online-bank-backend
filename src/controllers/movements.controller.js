'use strict'

import Movement from '../models/movements.model.js'
import Account from '../models/account.model.js'

import User from '../models/user.model.js'


export const addMovement = async(req, res)=> {
    try {
        let data = req.body

        let id = req.user._id

        let user = await User.findById(id)

        let accountUser = await Account.findById(user.idAccount)
        data.user = id
        data.account = accountUser
        let movement = new Movement(data)
        await movement.save()


        // Encuentra la cuenta de destino y actualiza su balance
        await Account.findOneAndUpdate(
            { accountNumber: data.numberAccountDestination },
            { $inc: { balance: data.amount } },
            { new: true } 
        );
        return res.status(200).send({message: 'Movement has been created.'})
    } catch (err) {
        console.error(err)
        return res.status(500).send({message: 'Error saving the movement.'})
    }
}


export const updateMovement = async(req, res)=>{
    try {
        let data = req.body
        let {id} = req.params
        let userId = req.user._id

        let user = await User.findById(userId)

        let accountToDeposit = await Account.findOne({account: data.numberAccountDestination})

        let resetBalance = 0

        if(user.role != 'ADMIN') return res.status(401).send({message: 'You cannot update the movements, please contact an admin to help you.'})

        let existingMovement = await Movement.findById(id)
        if(existingMovement == null) return res.status(404).send({message: 'Movement not found'})

        let updateMovement = await Movement.findOneAndUpdate(
            { _id: id },
            data,
            { new: true }
        )

        

        if(data.numberAccountDestination!=null || data.amount != null){
            
            if(accountToDeposit == data.numberAccountDestination){
                await Account.findOneAndUpdate(
                    { accountNumber: existingMovement.numberAccountDestination },
                    { $inc: { resetBalance } },
                    { new: true } 
                );
                await Account.findOneAndUpdate(
                    { accountNumber: data.numberAccountDestination },
                    { $inc: { balance: data.amount } },
                    { new: true } 
                );
            } else{
                await Account.findOneAndUpdate(
                    { accountNumber: data.numberAccountDestination },
                    { $inc: { balance: data.amount } },
                    { new: true } 
                );
            }

        }else{
            return res.status(401).send({message: 'You have to send the new account and new amount.'})
        }

        if (!updateMovement) return res.status(404).send({message: 'Movement not found, not updated.'})
        return res.send({message: 'Movement updated successfully.', updateMovement})


    } catch (err) {
        console.error(err)
        return res.status(500).send({message: 'Error updating the movement.'})
    }
} 



export const deleteMovement = async(req, res)=>{
    try {
        let {id} = req.params
        let userId = req.user._id
        let user = await User.findById(userId)
    
        if(user.role!= 'ADMIN') return res.status(401).send({message: 'You cannot delete the movements, please contact an admin to help you.'})
            
        let deletedMovement = await Movement.findOneAndDelete(id)
        if(!deletedMovement) return res.status(404).send({message: 'Movement not found, not deleted.'})
            
        return res.send({message: 'Movement deleted successfully.', deletedMovement})
        
    } catch (err) {
        console.error(err)
        return res.status(500).send({message: 'Error deleting the movement.'})
    }
}


export const getMovements = async(req, res)=>{
    try {
        let movements = await Movement.find()
        return res.send({message: 'Movements found successfully.', movements})
        
    } catch (err) {
        console.error(err)
        return res.status(500).send({message: 'Error getting the movements.'})
    }
}

export const getMyMovements = async(req, res)=>{
    try {

        let userId = req.user._id

        let movements = await Movement.find({user: userId})

        return res.send({message: 'Movements found successfully.', movements})
    } catch (err) {
        console.error(err)
        return res.status(500).send({message: 'Error getting the movements.'})
    }
}





