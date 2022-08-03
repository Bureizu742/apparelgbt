const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID
    username: String!
    firstName: String
    lastName: String
    email: String
    password: String
    orders: [Order]
  }

  type Category {
    _id: ID
    name: String
  }
  type Product {
    _id: ID
    name: String
    description: String
    image: String
    quantity: Int
    price: Float
    category: Category
  }

  type Order {
    _id: ID
    purchaseDate: String
    products: [Product]
  }

  type Checkout {
    session: ID
  }
  type Auth {
    token: ID!
    user: User
  }

  type Query {
    categories: [Category]
    products(category: ID, name: String): [Product]
    product(_id: ID!): Product
    users: [User]
    order(_id: ID!): Order
    checkout(products: [ID]!): Checkout
    user(id: ID!): User
    me: User
  }

  type Mutation {
    addUser(email:String!, firstName:String,lastName:String username: String!, password:String!): Auth
    addOrder(products: [ID]!): Order
    updateUser(username: String!, email: String, password: String): User
    updateProduct(_id: ID!, quantity: Int!): Product
    login(username: String!, password: String!): Auth
  }
`;

module.exports = typeDefs;
