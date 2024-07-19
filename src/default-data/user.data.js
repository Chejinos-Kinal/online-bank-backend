import User from '../models/user.model.js';
import accountModel from '../models/account.model.js';
import typeAccountModel from '../models/typeAccount.model.js';
import { generateAccountNumber } from '../controllers/user.controller.js';
import { encrypt } from '../utils/bcrypt.js';

export const accounts = [
  {
    accountNumber: generateAccountNumber(),
    balance: 5000,
    typeAccount: 'Monetaria',
  },
  {
    accountNumber: generateAccountNumber(),
    balance: 1000,
    typeAccount: 'Ahorro',
  },
  {
    accountNumber: generateAccountNumber(),
    balance: 1000,
    typeAccount: 'Monetaria',
  },
];

export const createAllAccounts = async (accounts) => {
  try {
    for (let i = 0; i < accounts.length; i++) {
      let existing = await accountModel.findOne({
        accountNumber: accounts[i].accountNumber,
      });

      if (!existing) {
        let data = {
          ...accounts[i],
          typeAccount: await typeAccountModel
            .findOne({ name: accounts[i].typeAccount })
            .select('_id'),
        };
        let account = new accountModel(data);
        await account.save();
      }

      console.log('Account already exist');
    }

    return console.log('Accounts created successfully');
  } catch (error) {
    console.error(error);
  }
};

// NOTE: Don't encrypt password on objects, `createAllUsers` function already does that
export const users = [
  {
    name: 'admin',
    surname: 'admin',
    username: 'ADMINB',
    DPI: '1234567890101',
    address: 'Calle 123',
    phoneNumber: '12345678',
    email: 'admin@gmail.com',
    password: 'ADMINB',
    nameJob: 'admin',
    monthlySalary: 999,
    role: 'ADMIN',
  },
  {
    name: 'Ander',
    surname: 'Cabrera',
    username: 'acabrera',
    DPI: '123467890109',
    address: 'Zona 7',
    phoneNumber: '1235678',
    email: 'acabrera@gmail.com',
    password: '123',
    nameJob: 'Programador',
    monthlySalary: 500,
    role: 'USER',
  },
  {
    name: 'Franco',
    surname: 'Paiz',
    username: 'fpaiz',
    DPI: '123467890107',
    address: 'Villa Nueva',
    phoneNumber: '1235678',
    email: 'fpaiz@gmail.com',
    password: '123',
    nameJob: 'Programador',
    monthlySalary: 300,
    role: 'USER',
  },
];

export const createAllUsers = async (users) => {
  try {
    for (let i = 0; i < users.length; i++) {
      let existing = await User.findOne({ username: users[i].username });
      if (!existing) {
        let data = {
          ...users[i],
          password: await encrypt(users[i].password),
          idAccount: await accountModel
            .findOne({
              accountNumber: accounts[i].accountNumber,
            })
            .select('_id'),
        };
        let user = new User(data);
        await user.save();
      } else {
        console.log('User already exist');
      }
    }

    return console.log('Users created successfully');
  } catch (error) {
    console.error(error);
  }
};
