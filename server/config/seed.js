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
      name: 'mini flags',
      description: 'perfect for pride on the go',
      image: 'assets/misc/minflags.jpeg',
      price: 12,
      quantity: 5,
      category: categories[0]._id
    },
    {
      name: 'sweats set',
      description: '100% locally sourced cotton sweats and sweater',
      image: 'assets/sets/loungepaired.jpeg',
      price: 140,
      quantity: 5,
      category: categories[1]._id
    },
    {
      name: 'pride flag',
      description: 'hand-sewn by local designers',
      image: 'assets/misc/flag.jpeg',
      price: 40,
      quantity: 5,
      category: categories[2]._id
    },
    {
      name: 'raw denim',
      description: 'organically dyed raw denim',
      image: 'assets/bottoms/jeanspair1.jpeg',
      price: 70,
      quantity: 12,
      category: categories[3]._id
    },
    {
      name: 'hoodie',
      description: 'our softest hoodie yet',
      image: 'assets/tops/hoodiespaired.jpeg',
      price: 50,
      quantity: 5,
      category: categories[4]._id
    },
    {
      name: 'flag pin',
      description: 'mini flag pin',
      image: 'assets/misc/pin.jpeg',
      price: 6,
      quantity: 5,
      category: categories[4]._id
    },
    {
      name: 'blouse',
      description: 'light and breezy',
      image: 'assets/tops/tops8re.jpeg',
      price: 24.54,
      quantity: 5,
      category: categories[0]._id
    },
    {
      name: 'linen set',
      description: 'soft and airy organic linen ',
      image: 'assets/sets/linensetre.jpeg',
      price: 24.54,
      quantity: 5,
      category: categories[2]._id
    },
    {
      name: 'pride belt',
      description: 'colorful and strong',
      image: 'assets/misc/flagwrapre.jpeg',
      price: 24.54,
      quantity: 5,
      category: categories[2]._id
    },
    {
      name: 'silk tops',
      description: 'from ethically sourced silkworms',
      image: 'assets/tops/silktopsre.jpeg',
      price: 24.54,
      quantity: 5,
      category: categories[0]._id
    },
    {
      name: 'pride ring set',
      description: 'matching rings',
      image: 'assets/acc/ringsre.jpeg',
      price: 42,
      quantity: 5,
      category: categories[3]._id
    },
    {
      name: 'more love',
      description: 'mult-color love tee',
      image: 'assets/tops/loveteere.jpeg',
      price: 20,
      quantity: 5,
      category: categories[0]._id
    },
  ]);

  console.log('Products Seeded!');

  await User.deleteMany();

  await User.create({
      username: 'LiliFoReally',
      firstName: 'Lillian',
      lastName: 'Long',
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
      firstName: 'Connor',
      lastName: 'Thompson',
      email: 'connordude@email.com',
      password: 'passphrase123'
});

await User.create({
    username: 'CharlieDaDude',
    firstName: 'Charles',
      lastName: 'Young',
    email: 'dadude@email.com',
    password: 'passwerd123'
});

  console.log('Users Seeded!');

  process.exit();
});
