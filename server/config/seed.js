const db = require('./connection');
const { User, Product, Category } = require('../models');

db.once('open', async () => {
  await Category.deleteMany();

  const categories = await Category.insertMany([
    { name: 'Tops' },
    { name: 'Bottoms' },
    { name: 'Skirts/Dresses' },
    { name: 'Accessories' },
    { name: 'Misc' }
  ]);

  console.log('Categories Seeded!');

  await Product.deleteMany();

  const products = await Product.insertMany([
    {
      name: 'Item Name 1',
      description: 'This is a default description',
      image: 'TODO',
      price: 24.50,
      quantity: 5,
      category: categories[0]._id
    },
    {
      name: 'Item Name 2',
      description: 'This is a default description',
      image: 'TODO',
      price: 24.51,
      quantity: 5,
      category: categories[0]._id
    },
    {
      name: 'Item Name 3',
      description: 'This is a default description',
      image: 'TODO',
      price: 24.52,
      quantity: 5,
      category: categories[0]._id
    },
    {
      name: 'Item Name 4',
      description: 'This is a default description',
      image: 'TODO',
      price: 24.53,
      quantity: 5,
      category: categories[0]._id
    },
    {
      name: 'Item Name 5',
      description: 'This is a default description',
      image: 'TODO',
      price: 24.54,
      quantity: 5,
      category: categories[0]._id
    },
  ]);

  console.log('Products Seeded!');

  await User.deleteMany();

  await User.create({
      username: 'LiliVanilli',
      email: 'lillian123@email.com',
      password: 'passcode1234'
  });

  await User.create({
      username: 'Jalanicus',
      email: 'unterjal@email.com',
      password: 'password123'
  });

  await User.create({
      username: 'JohnConnor',
      email: 'connordude@email.com',
      password: 'passphrase123'
});

await User.create({
    username: 'CharlieDaDude',
    email: 'dadude@email.com',
    password: 'passwerd123'
});

await User.create({
    username: 'generictestuser69',
    email: 'thisisatest@email.com',
    password: 'passstring123'
});
  
  console.log('Users Seeded!');

  process.exit();
});
