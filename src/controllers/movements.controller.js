'use strict';

import Movement from '../models/movements.model.js';
import Account from '../models/account.model.js';

import User from '../models/user.model.js';

export const addMovement = async (req, res) => {
  try {
    let data = req.body;

    let id = req.user._id;

    let user = await User.findById(id);

    let accountUser = await Account.findById(user.idAccount);
    data.user = id;
    data.account = accountUser;
    let movement = new Movement(data);
    await movement.save();

    // Encuentra la cuenta de destino y actualiza su balance
    await Account.findOneAndUpdate(
      { accountNumber: data.numberAccountDestination },
      { $inc: { balance: data.amount } },
      { new: true },
    );

    await Account.findOneAndUpdate(
      { _id: user.idAccount },
      { balance: accountUser.balance - data.amount },
      { new: true },
    );
    return res.status(200).send({ message: 'Movement has been created.' });
  } catch (err) {
    console.error(err);
    return res.status(500).send({ message: 'Error saving the movement.' });
  }
};

/* export const updateMovement = async (req, res) => {
    try {
        let data = req.body;
        let { id } = req.params;
        let userId = req.user._id;

        let user = await User.findById(userId);

         let accountToDeposit = await Account.findOne({ accountNumber: data.numberAccountDestination }); 

        if (user.role !== 'ADMIN') return res.status(401).send({ message: 'You cannot update the movements, please contact an admin to help you.' });

        let existingMovement = await Movement.findById(id);
        if (!existingMovement) return res.status(404).send({ message: 'Movement not found' });

        let updateMovement = await Movement.findOneAndUpdate(
            { _id: id },
            data,
            { new: true }
        );

        if (!updateMovement) return res.status(404).send({ message: 'Movement not found, not updated.' });

        if ( data.numberAccountDestination != null ||  data.amount != null) {
            if (!accountToDeposit) {
                return res.status(404).send({ message: 'Account to deposit not found' });
            } 
            let resetBalance = 0; // Assuming resetBalance is the value to reset the balance to zero before adding the amount
            if (accountToDeposit.accountNumber === existingMovement.numberAccountDestination) {
                await Account.findOneAndUpdate(
                    { accountNumber: data.numberAccountDestination },
                    { balance: resetBalance }, // Resetting balance to zero before adding the new amount
                    { new: true }
                );
                await Account.findOneAndUpdate(
                    { accountNumber: data.numberAccountDestination },
                    { $inc: { balance: data.amount } }, // Incrementing the balance by the new amount
                    { new: true }
                );
            } else {
                await Account.findOneAndUpdate(
                    { accountNumber: data.numberAccountDestination },
                    { $inc: { balance: data.amount } }, // Incrementing the balance by the new amount
                    { new: true }
                );
            }
        }  else {
            return res.status(400).send({ message: 'You have to send the new account and new amount.' });
        }
 
        return res.send({ message: 'Movement updated successfully.', updateMovement });
    } catch (err) {
        console.error(err);
        return res.status(500).send({ message: 'Error updating the movement.' });
    }
} */

export const updateMovement = async (req, res) => {
  try {
    let data = req.body;
    let { id } = req.params;
    let userId = req.user._id;

    let user = await User.findById(userId);

    if (user.role !== 'ADMIN')
      return res
        .status(401)
        .send({
          message:
            'You cannot update the movements, please contact an admin to help you.',
        });

    let existingMovement = await Movement.findById(id);
    if (!existingMovement)
      return res.status(404).send({ message: 'Movement not found' });

    if (
      data.user != null ||
      data.account != null ||
      data.numberAccountDestination != null ||
      data.date != null ||
      data.status != null
    ) {
      return res
        .status(401)
        .send({ message: 'You only can update the amount.' });
    }

    let updateMovement = await Movement.findOneAndUpdate({ _id: id }, data, {
      new: true,
    });

    if (!updateMovement)
      return res
        .status(404)
        .send({ message: 'Movement not found, not updated.' });

    if (data.amount != null) {
      let resetBalance = 0;

      await Account.findOneAndUpdate(
        { accountNumber: existingMovement.numberAccountDestination },
        { balance: resetBalance },
        { new: true },
      );
      await Account.findOneAndUpdate(
        { accountNumber: existingMovement.numberAccountDestination },
        { $inc: { balance: data.amount } },
        { new: true },
      );
    }

    return res.send({
      message: 'Movement updated successfully.',
      updateMovement,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).send({ message: 'Error updating the movement.' });
  }
};
/* export const deleteMovement = async(req, res)=>{
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
 */

export const changeStatus = async (req, res) => {
  try {
    let { id } = req.params;

    let deleteMovement = await Movement.findOneAndUpdate(
      { _id: id },
      { status: false },
      { new: true },
    );

    return res
      .status(200)
      .send({ message: 'Movement deleted successfully.', deleteMovement });
  } catch (err) {
    console.error(err);
    return res.status(500).send({ message: 'Error deleting the movement' });
  }
};

export const getMovements = async (req, res) => {
  try {
    let movements = await Movement.find();
    return res.send({ message: 'Movements found successfully.', movements });
  } catch (err) {
    console.error(err);
    return res.status(500).send({ message: 'Error getting the movements.' });
  }
};

export const getMyMovements = async (req, res) => {
  try {
    let userId = req.user._id;

    let movements = await Movement.find({ user: userId });

    return res.send({ message: 'Movements found successfully.', movements });
  } catch (err) {
    console.error(err);
    return res.status(500).send({ message: 'Error getting the movements.' });
  }
};
