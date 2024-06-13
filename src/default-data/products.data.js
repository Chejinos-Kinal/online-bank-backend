import Product from '../models/product.model';
import Category from '../models/category.model';

export const products = [
  {
    name: 'Laptop',
    description: 'A laptop',
    price: 1000,
    stock: 10,
    timeSold: 0,
    category: await Category.findOne({ name: 'Electronics' }).select('_id'),
  },
  {
    name: 'T-shirt',
    description: 'A t-shirt',
    price: 20,
    stock: 100,
    timeSold: 0,
    category: await Category.findOne({ name: 'Clothing' }).select('_id'),
  },
  {
    name: 'Soccer ball',
    description: 'A soccer ball',
    price: 50,
    stock: 50,
    timeSold: 0,
    category: await Category.findOne({ name: 'Sports' }).select('_id'),
  },
  {
    name: 'Chair',
    description: 'A chair',
    price: 100,
    stock: 20,
    timeSold: 0,
    category: await Category.findOne({ name: 'Home' }).select('_id'),
  },
];

export const createAllProducts = async (products) => {
  try {
    for (let i = 0; i < products.length; i++) {
      let existingProduct = await Product.findOne({
        name: products[i].name,
      });

      if (existingProduct) return console.log('Product already exists');

      let product = new Product(products[i]);

      await product.save();
    }

    return console.log('Products created');
  } catch (error) {
    return console.error(error);
  }
};
