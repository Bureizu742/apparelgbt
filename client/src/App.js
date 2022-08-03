import React from 'react';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { StoreProvider } from './utils/GlobalState'
import Home from './pages/Home'
import Signup from './pages/Signup'
import Login from './pages/Login'
import Detail from './pages/Detail';
import OrderHistory from './pages/OrderHistory';
import Products from './components/Products';

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
    <StoreProvider>
      <Routes>
        <Route
        path="/"
        element={<Home />}
        />
        <Route
        path="/signup"
        element={<Signup />}
        />
        <Route
        path="/login"
        element={<Login />}
        />
        <Route 
          path="/products" 
          element={<Products />} 
          />
        <Route 
          path="/products/:id" 
          element={<Detail />} 
          />
          <Route
        path="/orderHistory"
        element={<OrderHistory />}
        />
        <Route
        path="*" 
        element={<badPage />} 
        />
        <Route 
         path="/goodPage" 
        element={<goodPage />} 
         />
      </Routes>
      </StoreProvider>
    </Router>
    </ApolloProvider>
  );
}

export default App;
