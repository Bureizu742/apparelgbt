import React from 'react';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Home from './pages/Home'
// import ProductList from './pages/ProductList';
// import Product from './pages/Product'
// import Signup from './pages/Signup'
// import Login from './pages/Login'

const httpLink = createHttpLink({
  uri: '/graphql',
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('id_token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
    <Router> 
      <Routes>
        <Route
        path="/"
        element={<Home />}
        />
        {/* <Route
        path="/products"
        element={<ProductList />}
        />
        <Route
        path="/product/:id"
        element={<Product />}
        />
        <Route
        path="/signup"
        element={<Signup />}
        />
        <Route
        path="/login"
        element={<Login />}
        /> */}
      </Routes>
    </Router>
    </ApolloProvider>
  );
}

export default App;
