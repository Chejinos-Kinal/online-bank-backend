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

export const updateMovement = async (req, res) => {
  try {
    let data = req.body;
    let { id } = req.params;
    let userAdmin = req.user._id;

    let user = await User.findById(userAdmin);

    if (user.role !== 'ADMIN')
      return res.status(401).send({
        message:
          'You cannot update the movements, please contact an admin to help you.',
      });

    let existingMovement = await Movement.findById(id);
    if (!existingMovement)
      return res.status(404).send({ message: 'Movement not found' });

    let userClient = await User.findOne({ _id: existingMovement.user });

    let accountClient = await Account.findById(userClient.idAccount);

    let accountDestination = await Account.findOne({
      accountNumber: existingMovement.numberAccountDestination,
    });

    if (!accountDestination)
      return res
        .status(404)
        .send({ message: 'Account of the user not found.' });
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
      let previousBalance =
        Number(accountDestination.balance) - Number(existingMovement.amount); // Calcula el saldo anterior restando el monto del movimiento anterior
      if (previousBalance < 0) {
        console.log('Error, the last balance cannot be under 0.');
        previousBalance = 0;
      }

      let updatedBalance = Number(previousBalance) + Number(data.amount); // Calcula el nuevo saldo sumando el monto del movimiento actual

      // Actualiza el saldo de la cuenta del destinatario con el nuevo saldo calculado
      await Account.findOneAndUpdate(
        { accountNumber: existingMovement.numberAccountDestination },
        { balance: updatedBalance },
        { new: true },
      );

      let previousBalanceClient =
        Number(accountClient.balance) + Number(existingMovement.amount);
      let updatedBalanceClient = previousBalanceClient - Number(data.amount);
      // Actualiza el saldo de la cuenta del remitente restando el monto del movimiento actual
      await Account.findOneAndUpdate(
        { _id: userClient.idAccount },
        { balance: updatedBalanceClient },
        { new: true },
      );
    }

    return res.send({
      message: 'Movement updated successfully.',
      updateMovement,
    });
  } catch (err) {
    console.log(err);
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

    // Encuentra el movimiento por su ID
    let movement = await Movement.findById(id);
    if (!movement) {
      return res.status(404).send({ message: 'Movement not found' });
    }

    // Calcula la diferencia de tiempo entre createdAt y el momento actual
    let createdAt = new Date(movement.createdAt);
    let now = new Date();
    let timeDifference = now - createdAt;

    // Permite la actualización solo si la diferencia es menor a una hora (3600000 ms)
    if (timeDifference > 3600000) {
      return res
        .status(400)
        .send({
          message: 'Status can only be changed within one hour of creation.',
        });
    }

    // Actualiza el estado del movimiento
    let updatedMovement = await Movement.findOneAndUpdate(
      { _id: id },
      { status: false },
      { new: true },
    );

    return res
      .status(200)
      .send({
        message: 'Movement status updated successfully.',
        updatedMovement,
      });
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .send({ message: 'Error updating the movement status.' });
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
