'use strict';

import TypeAccount from '../models/typeAccount.model.js';
import Account from '../models/account.model.js';

export const saveTypeAccount = async (req, res) => {
  try {
    let data = req.body;
    let existingTypeAccount = await TypeAccount.findOne({ name: data.name });
    if (existingTypeAccount)
      return res.status(409).send({ message: 'Type account already exists.' });
    let typeAccount = new TypeAccount(data);
    await typeAccount.save();
    return res
      .status(200)
      .send({ message: 'Type account saved successfully.', typeAccount });
  } catch (err) {
    console.error(err);
    return res.status(500).send({ message: 'Error saving type account.', err });
  }
};

export const updateTypeAccount = async (req, res) => {
  try {
    let data = req.body;
    let typeAccountId = req.params.id;
    let defaultTypeAccount = await TypeAccount.findOne({ name: 'Default' });
    if (defaultTypeAccount._id == typeAccountId)
      return res
        .status(401)
        .send({ message: 'Default type account cannot be updated' });
    let updatedTypeAccount = await TypeAccount.findOneAndUpdate(
      { _id: typeAccountId },
      data,
      { new: true },
    );
    if (!updatedTypeAccount)
      return res
        .status(404)
        .send({ message: 'Type account not found and not updated' });
    return res.send({
      message: 'TypeAccount updated succesfully',
      updateTypeAccount,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send({ message: 'Error updating type account.' });
  }
};

export const deleteTypeAccount = async (req, res) => {
  try {
    let typeAccountId = req.params.id;
    let defaultTypeAccount = await TypeAccount.findOne({ name: 'Default' });
    if (defaultTypeAccount._id == typeAccountId)
      return res
        .status(401)
        .send({ message: 'Default type account cannot be deleted' });
    let deletedTypeAccount = await TypeAccount.findOneAndDelete({
      _id: typeAccountId,
    });
    if (!deletedTypeAccount)
      return res
        .status(404)
        .send({ message: 'Type account not found and not deleted' });
    await Account.updateMany(
      { typeAccount: typeAccountId },
      { typeAccount: defaultTypeAccount._id },
    );
    return res.send({
      message: 'Type account deleted succesfully',
      deletedTypeAccount,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send({ message: 'Error deleting type account.' });
  }
};

export const getTypeAccount = async (req, res) => {
  try {
    let typeAccountId = req.params.id;
    let typeAccount = await TypeAccount.findOne({ _id: typeAccountId });
    if (!typeAccount)
      return res.status(404).send({ message: 'Type account not found' });
    return res.send({ message: 'Type account found', typeAccount });
  } catch (error) {
    console.error(error);
    return res.status(500).send({ message: 'Error getting type account.' });
  }
};

export const getTypeAccounts = async (req, res) => {
  try {
    let typeAccounts = await TypeAccount.find();
    return res.status(200).json(typeAccounts);
  } catch (error) {
    console.error(error);
    return res.status(500).send({ message: 'Error getting type accounts.' });
  }
};
