import React, { useEffect } from 'react';
import styled from 'styled-components';
import ProdItems from './ProdItems';
import { useStoreContext } from '../utils/GlobalState';
import { idbPromise } from '../utils/helpers';
import { useQuery } from '@apollo/client'
import { UPDATE_PRODUCTS } from '../utils/actions';
import { QUERY_PRODUCTS } from '../utils/queries';

const Container = styled.div`
  padding: 20px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;
const Title = styled.div`
  font-size: 50px;
  font-style: italic;
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: center;
  padding-top: 40px;
`;

function Products() {
  const { loading, data } = useQuery(QUERY_PRODUCTS);
  const [state, dispatch] = useStoreContext();
  const { currentCategory } = state;

  useEffect(() => {
    if (data) {
      dispatch({
        type: UPDATE_PRODUCTS,
        products: data.products
      });
      data.products.forEach((product) => {
        idbPromise('products', 'put', product)
      });
    } else if (!loading) {
      idbPromise('products', 'get').then((products) => {
        dispatch({
          type: UPDATE_PRODUCTS,
          products: products
        });
      });
    }
  }, [data, loading, dispatch]);

  function filterProducts() {
    if (!currentCategory) {
      return state.products
    }

    return state.products.filter((product) => 
    product.category._id === currentCategory);
  }

  return (
    <> 
      <Title> SHOP OUR FAVORITES </Title>
    <Container >
    {filterProducts.map((product) => (
        <ProdItems 
        key={product._id}
        _id={product._id}
        image={product.image}
        name={product.name}
        price={product.price}
        quantity={product.quantity}
        />
      ))}
    </Container>
    </>
  )
}

export default Products