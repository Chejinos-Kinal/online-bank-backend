'use strict';

import TypeAccount from '../models/typeAccount.model.js';

export const saveTypeAccount = async (req, res) => {
  try {
    let data = req.body;
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
