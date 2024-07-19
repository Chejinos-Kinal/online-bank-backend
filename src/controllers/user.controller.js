'use strict';

import User from '../models/user.model.js';
import Account from '../models/account.model.js';
import Product from '../models/product.model.js';
import Purchase from '../models/purchase.model.js';
import TypeAccount from '../models/typeAccount.model.js';
import { encrypt, checkPassword } from '../utils/bcrypt.js';
import { createToken } from '../utils/jwt.js';
import userModel from '../models/user.model.js';

export const getIdAccountUser = async (idUser) => {
  try {
    let user = await User.findOne({ _id: idUser });
    if (!user) console.log('Este no es un cliente');
    return user.idAccount;
  } catch (err) {
    console.error(err);
    console.log('Error al obtener el id de la cuenta del usuario');
  }
};

export const generateAccountNumber = () => {
  let accountNumber = '';
  for (let i = 1; i <= 11; i++) {
    accountNumber += Math.floor(Math.random() * 10).toString();
  }
  return accountNumber;
};

export const createUser = async (req, res) => {
  try {
    let data = req.body;

    data.password = await encrypt(data.password);

    let existingUser = await User.findOne({
      $or: [{ username: data.username }, { email: data.email }],
    });

    if (existingUser)
      return res.status(400).send({ message: 'User already exist' });

    let accountNumber = generateAccountNumber();
    /* let existingTypeAccount = await TypeAccount.findOne({
      _id: data.typeAccount,
    }); */

    let typeAccount = await TypeAccount.findOne({
      name: 'Current',
    });

    /* if (!existingTypeAccount)
      return res.status(404).send({ message: 'Type account not found' }); */

    let account = new Account({
      accountNumber: accountNumber,
      balance: 0,
      typeAccount: typeAccount,
    });

    await account.save();

    data.idAccount = account._id;

    let user = new User(data);

    await user.save();

    return res.send({ message: 'User created succesfully' });
  } catch (error) {
    console.error(error);
    return res.status(500).send({ message: 'Error creating user' });
  }
};

export const deleteUser = async (req, res) => {
  try {
    let eliminateUser = req.params.id;
    let userId = req.user._id;
    let existingUser = await User.findOne({ _id: eliminateUser, status: true });
    if (!existingUser)
      return res
        .status(401)
        .send({ message: 'User not found and not deleted' });
    if (existingUser.role === 'ADMIN' && userId != eliminateUser)
      return res
        .status(400)
        .send({ message: 'You can not delete another admin' });
    let deleteUser = await User.findOneAndUpdate(
      { _id: eliminateUser },
      { status: false },
      { new: true },
    );
    if (!deleteUser)
      return res
        .status(401)
        .send({ message: 'User not found and not deleted' });
    return res.send({
      message: `User ${existingUser.username} deleted succesfully`,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send({ message: 'Error deleting user' });
  }
};

export const updateUser = async (req, res) => {
  try {
    let data = req.body;
    let updateUser = req.params.id;
    let userId = req.user._id;
    let existingUser = await User.findOne({ _id: updateUser });
    if (existingUser.role == 'ADMIN' && updateUser != userId)
      return res
        .status(400)
        .send({ message: 'You can not update another admin' });
    if (data.DPI || data.password)
      return res
        .status(401)
        .send({ message: 'The DPI or password cannot be changed' });
    let updatedUser = await User.findOneAndUpdate({ _id: updateUser }, data, {
      new: true,
    });
    if (!updatedUser)
      return res
        .status(404)
        .send({ message: 'User not found and not updated' });
    return res.send({
      message: `User ${updatedUser.username} updated succesfully`,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send({ message: 'Error updating user' });
  }
};

export const getUsers = async (req, res) => {
  try {
    let users = await User.find({ status: true });
    return res.send(users);
  } catch (error) {
    console.error(error);
    return res.status(500).send({ message: 'Error getting users' });
  }
};

export const getUser = async (req, res) => {
  try {
    let userId = req.user._id;
    let existingUser = await User.findOne({
      _id: userId,
      status: true,
    }).populate('idAccount', ['balance']);
    if (!existingUser)
      return res.status(404).send({ message: 'User not found' });
    return res.send(existingUser);
  } catch (error) {
    console.error(error);
    return res.status(500).send({ message: 'Error getting user' });
  }
};

// NOTE: Client
export const updateMyUser = async (req, res) => {
  try {
    const {
      name,
      surname,
      username,
      phoneNumber,
      email,
      address,
      nameJob,
      monthlySalary,
    } = req.body;
    const user = await userModel.findOne({ _id: req.user._id });

    if (!user) {
      return res.status(404).send({ message: 'User not found' });
    }

    // Check if username or email already exists in another user
    const existingUser = await userModel.findOne({
      $or: [{ username }, { email }],
      _id: { $ne: req.user._id },
    });

    if (existingUser) {
      if (existingUser.username === username) {
        return res.status(400).send({ message: 'Username already exists' });
      }
      if (existingUser.email === email) {
        return res.status(400).send({ message: 'Email already exists' });
      }
    }

    // Update only the fields that are provided
    const updateData = {
      ...(name && { name }),
      ...(surname && { surname }),
      ...(username && { username }),
      ...(phoneNumber && { phoneNumber }),
      ...(email && { email }),
      ...(address && { address }),
      ...(nameJob && { nameJob }),
      ...(monthlySalary && { monthlySalary }),
    };

    await userModel.findOneAndUpdate({ _id: req.user._id }, updateData, {
      new: true,
    });

    return res.status(200).json({ message: 'User updated successfully' });
  } catch (error) {
    console.error(error);
    return res.status(500).send({ message: 'Error updating user' });
  }
};

export const getUserClient = async (req, res) => {
  try {
    let userId = req.params.id;
    let userIdL = req.user._id;
    if (userIdL.toString() !== userId.toString())
      return res.status(401).send({ message: 'You only can get your user' });
    let existingUser = await User.findOne({
      _id: userId,
      status: true,
    }).populate('idAccount', ['balance']);
    if (!existingUser)
      return res.status(404).send({ message: 'User not found' });
    return res.send(existingUser);
  } catch (error) {
    console.error(error);
    return res.status(500).send({ message: 'Error getting user' });
  }
};

export const login = async (req, res) => {
  try {
    let { username, password, email } = req.body;
    let user = await User.findOne({
      $or: [{ username: username }, { email: email }],
    });
    if (user && (await checkPassword(password, user.password))) {
      let loggedUser = {
        uid: user._id,
        username: user.username,
        name: user.name,
        surname: user.surname,
        role: user.role,
        DPI: user.DPI,
      };
      let token = await createToken(loggedUser);
      return res.send({
        message: `Welcome ${user.name}`,
        loggedUser,
        token,
      });
    }
    return res.status(404).send({ message: 'Invalid credentials' });
  } catch (error) {
    console.error(error);
    return res.status(500).send({ message: 'Error logging in' });
  }
};

// NOTE: Cart related functions

export const getCart = async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.user._id }).populate({
      path: 'cart.product',
      select: 'name price',
    });

    return res.json(user.cart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const addTocart = async (req, res) => {
  try {
    const { productId, quantity } = req.body;

    const user = await User.findOne({ _id: req.user._id });
    const product = await Product.findOne({ _id: productId });

    if (!product) {
      return res.status(400).json({ message: 'Product does not exist' });
    }

    const existingCartItem = user.cart.find(
      (item) => item.product.toString() === productId,
    );

    if (existingCartItem) {
      const newQuantity = existingCartItem.quantity + (Number(quantity) || 1);

      console.log(newQuantity, product.stock);

      if (newQuantity > product.stock) {
        return res.status(400).json({
          message: 'Exceeded product stock',
          yourCart: existingCartItem.quantity,
          stockAviliable: product.stock,
        });
      }

      existingCartItem.quantity = newQuantity;
    } else {
      if (quantity && quantity > product.stock) {
        return res.status(400).json({
          message: 'Exceeded product stock',
          stockAviliable: product.stock,
        });
      }

      user.cart.push({ product: productId, quantity: quantity || 1 });
    }

    await user.save();

    return res.json({ message: 'Product added to cart' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const removeFromCart = async (req, res) => {
  try {
    const { productId } = req.params;

    const user = await User.findOne({ _id: req.user._id });

    const existingCartItem = user.cart.find(
      (item) => item.product.toString() === productId,
    );

    if (!existingCartItem) {
      return res.status(400).json({ message: 'Product not in cart' });
    }

    user.cart = user.cart.filter(
      (item) => item.product.toString() !== productId,
    );

    await user.save();

    return res.json({ message: 'Product removed from cart' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const purchase = async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.user._id }).populate({
      path: 'cart.product',
      select: 'name price stock',
    });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const cartItems = user.cart;

    if (cartItems.length === 0) {
      return res.status(400).json({ message: 'Cart is empty' });
    }

    const purchaseItems = [];

    let total = 0;

    for (const cartItem of cartItems) {
      const product = cartItem.product;
      const quantity = cartItem.quantity;

      if (quantity > product.stock) {
        return res.status(400).json({
          message: 'Exceeded product stock',
          productName: product.name,
          stockAvailable: product.stock,
        });
      }

      const purchaseItem = {
        product: product._id,
        quantity,
        price: product.price,
      };

      purchaseItems.push(purchaseItem);

      total += product.price * quantity;

      product.stock -= quantity;

      const productUpdateTimesSold = await Product.findById(product._id);
      productUpdateTimesSold.timesSold += quantity;

      await productUpdateTimesSold.save();
      await product.save();
    }

    const purchase = new Purchase({
      user: user._id,
      products: purchaseItems.map((item) => ({
        product: item.product,
        quantity: item.quantity,
        subtotal: item.price * item.quantity,
      })),
      total,
    });

    await purchase.save();

    user.purchases.push(purchase._id);
    user.cart = [];
    await user.save();

    return res.status(200).json({ message: 'Purchase completed' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getPurchases = async (req, res) => {
  try {
    const purchases = await Purchase.find({ user: req.user._id })
      .select('-_id -user')
      .populate({
        path: 'products',
        select: '-_id',
        populate: {
          path: 'product',
          select: '-_id',
          populate: {
            path: 'category',
            select: '-_id',
          },
        },
      });

    return res.json(purchases);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
