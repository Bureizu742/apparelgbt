const db = require('../config/connection');
const { Category, Product, User } = require('../models');
const userSeeds = require('./userSeeds.json');
const productSeeds = require('./productSeeds.json');
const seedCategory = require('./seedCategory.json');

db.once('open', async () => {
  try {
    await User.deleteMany({});
    await User.create(userSeeds);
    await Category.deleteMany({});
    await Category.create(seedCategory);
    await Product.deleteMany({});
    await Product.create(productSeeds);
    
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
  process.exit(0);
});
