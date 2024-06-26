import User from '../models/user.model.js';
import { encrypt } from '../utils/bcrypt.js';

// NOTE: Don't encrypt password on objects, `createAllUsers` function already does that
export const users = [
  {
    name: 'admin',
    surname: 'admin',
    username: 'admin',
    DPI: '1234567890101',
    address: 'Calle 123',
    phoneNumber: '12345678',
    email: 'admin@gmail.com',
    password: 'admin',
    nameJob: 'admin',
    monthlySalary: 999,
    role: 'ADMIN',
  },
  {
    name: 'user',
    surname: 'client',
    username: 'user',
    DPI: '123467890109',
    address: 'Cale 123',
    phoneNumber: '1235678',
    email: ' user@gmail.com',
    password: '123',
    nameJob: 'user',
    monthlySalary: 100,
    role: 'USER',
  },
];

export const createAllUsers = async (users) => {
  try {
    for (let i = 0; i < users.length; i++) {
      let existingUser = await User.findOne({ username: users[i].username });
      if (!existingUser) {
        let data = {
          name: users[i].name,
          surname: users[i].surname,
          username: users[i].username,
          DPI: users[i].DPI,
          address: users[i].address,
          phoneNumber: users[i].phoneNumber,
          email: users[i].email,
          password: await encrypt(users[i].password),
          nameJob: users[i].nameJob,
          monthlySalary: users[i].monthlySalary,
          role: users[i].role,
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
