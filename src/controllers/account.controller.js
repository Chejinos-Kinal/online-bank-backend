'use strict';

import Account from '../models/account.model.js';

export const getAccounts = async (req, res) => {
  try {
    const accounts = await Account.find().populate('typeAccount');
    return res.json(accounts);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Error fetching accounts.', error });
  }
};

export const updateAccount = async (req, res) => {
  try {
    const { id } = req.params;
    const data = req.body;
    const updatedAccount = await Account.findByIdAndUpdate(id, data, {
      new: true,
    });
    if (!updatedAccount) {
      return res.status(404).json({ message: 'Account not found.' });
    }
    return res.json({
      message: 'Account updated successfully.',
      updatedAccount,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Error updating account.', error });
  }
};

export const deleteAccount = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedAccount = await Account.findByIdAndDelete(id);
    if (!deletedAccount) {
      return res.status(404).json({ message: 'Account not found.' });
    }
    return res.json({
      message: 'Account deleted successfully.',
      deletedAccount,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Error deleting account.', error });
  }
};
