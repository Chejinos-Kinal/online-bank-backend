'use strict';

import FavoriteAccount from '../models/favoriteAccount.model.js';

import Account from '../models/account.model.js';

import User from '../models/user.model.js';

export const test = (req, res) => {
  return res.send({ message: 'Function test is running | Favorite Account' });
};

export const saveFavoriteAccount = async (req, res) => {
  try {
    const data = req.body;

    let id = req.user._id;

    data.idUser = id;

    if (!data.accountNumber) {
      return res.status(400).send({ message: 'Account number is required.' });
    }

    let existingFav = await FavoriteAccount.findOne({
      accountNumber: data.accountNumber,
      idUser: id,
    });
    if (existingFav) {
      return res
        .status(400)
        .send({ message: 'Favorite account already exists.' });
    }

    let account = await Account.findOne({ accountNumber: data.accountNumber });
    if (!account) {
      return res.status(404).send({ message: 'Account not found.' });
    }

    let myUser = await User.findById({ _id: id });
    if (myUser.idAccount.equals(account._id)) {
      return res
        .status(400)
        .send({ message: 'You cannot favorite your own account.' });
    }

    const favoriteAccount = new FavoriteAccount(data);
    await favoriteAccount.save();
    return res
      .status(200)
      .send({ message: 'Favorite account saved successfully.' });
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .send({ message: 'Error saving the favorite account.', err });
  }
};

export const updateFavoriteAccount = async (req, res) => {
  try {
    const { id } = req.params;
    const { alias } = req.body;
    if (!alias) {
      return res.status(400).send({ message: 'Alias is required for update.' });
    }
    const updatedFavoriteAccount = await FavoriteAccount.findOneAndUpdate(
      { _id: id },
      { alias },
      { new: true },
    );
    if (!updatedFavoriteAccount) {
      return res
        .status(404)
        .send({ message: 'Favorite account not found, not updated.' });
    }

    return res.send({
      message: 'Favorite account updated successfully.',
      updatedFavoriteAccount,
    });
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .send({ message: 'Error updating favorite account.', err });
  }
};

export const getFavoriteAccount = async (req, res) => {
  try {
    const { _id } = req.user;
    const favoriteAccounts = await FavoriteAccount.find({ idUser: _id });
    return res.status(200).json(favoriteAccounts);
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .send({ message: 'Error getting favorite accounts.' });
  }
};

export const deleteFavoriteAccount = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedFavoriteAccount = await FavoriteAccount.findByIdAndDelete(id);
    if (!deletedFavoriteAccount)
      return res
        .status(404)
        .send({ message: 'Favorite account not found, not deleted.' });
    return res.send({
      message: 'Favorite account deleted successfully.',
      deletedFavoriteAccount,
    });
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .send({ message: 'Error deleting favorite account.', err });
  }
};
