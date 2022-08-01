const db = require('../config/connection');
const { Category, Order, Product, User } = require('../models');
const userSeeds = require('./userSeeds.json');
const productSeeds = require('./productSeeds.json');
const orderSeeds = require('./orderSeeds.json');
const categorySeeds = require('./categorySeeds.json');

db.once('open', async () => {
  try {
    await User.deleteMany({});
    await User.create(userSeeds);
    await Category.deleteMany({});
    await Category.create(categorySeeds);
    await Order.deleteMany({});
    await Order.create(orderSeeds);
    await Product.deleteMany({});
    await Product.create(productSeeds);
    
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
  process.exit(0);
});
