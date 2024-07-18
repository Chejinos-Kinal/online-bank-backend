'use strict';

import Deposit from '../models/deposit.model.js';
import Account from '../models/account.model.js';
import User from '../models/user.model.js';

export const newDeposit = async (req, res) => {
  try {
    let data = req.body;
    let account = await Account.findOne({ accountNumber: data.accountNumber });
    if (!account) {
      return res.status(404).send({ message: 'Account not found.' });
    }
    let deposit = new Deposit(data);
    await deposit.save();
    await Account.findOneAndUpdate(
      { accountNumber: data.accountNumber },
      { $inc: { balance: deposit.amount } },
      { new: true },
    );
    return res.send({ message: 'Deposit created successfully.', deposit });
  } catch (error) {
    console.error(error);
    return res.status(500).send({ message: 'Error creating deposit.', error });
  }
};

export const updateDeposit = async (req, res) => {
  try {
    let deposit = await Deposit.findById(req.params.id);
    if (!deposit) {
      return res.status(404).send({ message: 'Deposit not found.' });
    }
    let data = req.body;
    if (!data.amount)
      return res.send({ message: 'Only the amount can be changed.' });

    let amountDifference = data.amount - deposit.amount;
    await Account.findOneAndUpdate(
      { accountNumber: deposit.accountNumber },
      { $inc: { balance: amountDifference } },
      { new: true },
    );

    deposit.amount = data.amount;
    await deposit.save();

    return res.send({ message: 'Deposit updated successfully.', deposit });
  } catch (error) {
    console.error(error);
    return res.status(500).send({ message: 'Error updating deposit.', error });
  }
};

export const revertDeposit = async (req, res) => {
  try {
    let deposit = await Deposit.findById(req.params.id);
    if (!deposit) {
      return res.status(404).send({ message: 'Deposit not found.' });
    }
    let currentTime = new Date();
    let depositTime = new Date(deposit.createdAt);
    let timeDifference = (currentTime - depositTime) / 1000 / 60;

    if (timeDifference > 1) {
      return res
        .status(400)
        .send({ message: 'Deposit cannot be reverted after 1 minute.' });
    }

    await Account.findOneAndUpdate(
      { accountNumber: deposit.accountNumber },
      { $inc: { balance: -deposit.amount } },
      { new: true },
    );

    deposit.status = false;
    await deposit.save();

    return res
      .status(200)
      .send({ message: 'Deposit reverted successfully.', deposit });
  } catch (error) {
    console.error(error);
    return res.status(500).send({ message: 'Error reverting deposit.', error });
  }
};

export const getDepositsByAccount = async (req, res) => {
  try {
    let deposits = await Deposit.find({
      accountNumber: req.params.accountNumber,
    });
    return res.send({ message: 'Deposits found', deposits });
  } catch (error) {
    console.error(error);
    return res.status(500).send({ message: 'Error getting deposits.' });
  }
};

export const getDepositsByLoggedUser = async (req, res) => {
  try {
    let userId = req.user._id;
    let user = await User.findOne({ _id: userId });
    let account = await Account.findOne({ _id: user.accountNumber });
    let deposits = await Deposit.find({ accountNumber: account.accountNumber });
    if (deposits.length >= 0)
      return res.send({ message: 'Deposits not found' });
    return res.send({ message: 'Deposits found', deposits });
  } catch (error) {
    console.error(error);
    return res.status(500).send({ message: 'Error getting deposits.' });
  }
};

export const getDeposits = async (req, res) => {
  try {
    let deposits = await Deposit.find();
    return res.send({ message: 'Deposits found', deposits });
  } catch (error) {
    console.error(error);
    return res.status(500).send({ message: 'Error getting deposits.' });
  }
};
