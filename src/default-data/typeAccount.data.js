import TypeAccount from '../models/typeAccount.model.js';

export const typeAccounts = [
  {
    name: 'Monetaria',
    description: 'Monetary account',
  },
  {
    name: 'Ahorro',
    description: 'Account for savings',
  },
  {
    name: 'Current',
    description: 'Current account',
  },
];

export const createAllTypeAccounts = async (typeAccounts) => {
  try {
    for (let i = 0; i < typeAccounts.length; i++) {
      let existingTypeAccount = await TypeAccount.findOne({
        name: typeAccounts[i].name,
      });

      if (existingTypeAccount)
        return console.log('Type account already exists');

      let typeAccount = new TypeAccount(typeAccounts[i]);

      await typeAccount.save();
    }

    return console.log('Type accounts created');
  } catch (error) {
    return console.error(error);
  }
};
