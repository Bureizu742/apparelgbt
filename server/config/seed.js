const db = require('./connection');
const { User, Product, Category } = require('../models');

db.once('open', async () => {
  await Category.deleteMany();

  const categories = await Category.insertMany([
    { name: 'Tops' },
    { name: 'Bottoms' },
    { name: 'Sets' },
    { name: 'Accessories' },
    { name: 'Misc' }
  ]);

  console.log('Categories Seeded!');

  await Product.deleteMany();

  const products = await Product.insertMany([
    {
      name: 'Item Name 1',
      description: 'This is a default description',
      image: 'assets/misc/minflags.jpeg',
      price: 24.50,
      quantity: 5,
      category: categories[0]._id
    },
    {
      name: 'Item Name 2',
      description: 'This is a default description',
      image: 'assets/sets/loungepaired.jpeg',
      price: 24.51,
      quantity: 5,
      category: categories[1]._id
    },
    {
      name: 'Item Name 3',
      description: 'This is a default description',
      image: 'assets/misc/flag.jpeg',
      price: 24.52,
      quantity: 5,
      category: categories[2]._id
    },
    {
      name: 'Item Name 4',
      description: 'This is a default description',
      image: 'assets/bottoms/jeanspair1.jpeg',
      price: 24.53,
      quantity: 5,
      category: categories[3]._id
    },
    {
      name: 'Item Name 5',
      description: 'This is a default description',
      image: 'assets/tops/hoodiespaired.jpeg',
      price: 24.54,
      quantity: 5,
      category: categories[4]._id
    },
  ]);

  console.log('Products Seeded!');

  await User.deleteMany();

  await User.create({
      username: 'LiliVanilli',
      email: 'lillian123@email.com',
      password: 'passcode1234',
      orders: [
        {
          products: [products[0]._id, products[0]._id, products[1]._id]
        }
      ]
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

  console.log('Users Seeded!');

  process.exit();
});
