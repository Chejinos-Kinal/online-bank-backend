import User from '../models/user.model.js';
import { encrypt } from '../utils/bcrypt.js';

export const users = [
  {
    name: 'Admin',
    surname: 'Default',
    username: 'ADMINB',
    DPI: '1234567890101',
    address: 'Calle 123',
    phoneNumber: '12345678',
    email: 'admin@gmail.com',
    password: await encrypt('ADMINB'),
    nameJob: 'Admin',
    monthlySalary: 100,
    role: 'ADMIN',
  },
  {
    name: 'Amin',
    surname: 'Dfault',
    username: 'D',
    DPI: '123467890109',
    address: 'Cale 123',
    phoneNumber: '1235678',
    email: 'adn@gmail.com',
    password: await encrypt('ADMNB'),
    nameJob: 'Plomero',
    monthlySalary: 100,
    role: 'ADMIN',
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
