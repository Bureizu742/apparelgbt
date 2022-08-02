import React from 'react';
import styled from 'styled-components';
import ProdItems from './ProdItems';
// import { useStoreContext } from '../utils/GlobalState';
// import { idbPromise } from '../utils/helpers';
import { useQuery } from '@apollo/client';
// import { UPDATE_PRODUCTS } from '../utils/actions';
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
  const products = data?.products || [];

  if (loading) return <h1>Loading...</h1>;

  console.log('PRODUCTS', products);

  return (
    <> 
      <Title> SHOP OUR FAVORITES </Title>
    <Container >
    {products.map((product) => (
        <ProdItems 
        key={product._id}
        id={product._id}
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