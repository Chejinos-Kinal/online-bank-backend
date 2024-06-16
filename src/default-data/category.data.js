import Category from '../models/category.model.js';

export const categories = [
  { name: 'General' },
  { name: 'Electronics' },
  { name: 'Clothing' },
  { name: 'Sports' },
  { name: 'Home' },
  { name: 'Technology' },
];

export const createAllCategories = async (categories) => {
  try {
    for (let i = 0; i < categories.length; i++) {
      let existingCategory = await Category.findOne({
        name: categories[i].name,
      });

      if (existingCategory) return console.log('Category already exists');

      let category = new Category(categories[i]);

      await category.save();
    }

    return console.log('Categories created');
  } catch (error) {
    return console.error(error);
  }
};
