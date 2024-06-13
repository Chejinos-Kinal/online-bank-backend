import Product from '../models/product.model.js';
import Category from '../models/category.model.js';

export const products = [
  {
    name: 'Laptop',
    description: 'A laptop',
    price: 1000,
    stock: 10,
    timeSold: 0,
    category: 'Electronics',
  },
  {
    name: 'T-shirt',
    description: 'A t-shirt',
    price: 20,
    stock: 100,
    timeSold: 0,
    category: 'Clothing',
  },
  {
    name: 'Soccer ball',
    description: 'A soccer ball',
    price: 50,
    stock: 50,
    timeSold: 0,
    category: 'Sports',
  },
  {
    name: 'Chair',
    description: 'A chair',
    price: 100,
    stock: 20,
    timeSold: 0,
    category: 'Home',
  },
];

export const createAllProducts = async (products) => {
  try {
    for (let i = 0; i < products.length; i++) {
      let existingProduct = await Product.findOne({
        name: products[i].name,
      });

      if (existingProduct) return console.log('Product already exists');

      let product = new Product({
        name: products[i].name,
        description: products[i].description,
        price: products[i].price,
        stock: products[i].stock,
        timeSold: products[i].timeSold,
        category: await Category.findOne({ name: products[i].category }),
      });

      await product.save();
    }

    return console.log('Products created');
  } catch (error) {
    return console.error(error);
  }
};
