import React, { useEffect } from 'react';
import styled from 'styled-components';
import ProductItem from './ProductItem';
import { useStoreContext } from '../utils/GlobalState';
import { idbPromise } from '../utils/helpers';
import { useQuery } from '@apollo/client';
import { UPDATE_PRODUCTS } from '../utils/actions';
import { QUERY_PRODUCTS } from '../utils/queries';
import Navbar from './Navbar';
import Footer from './Footer';

const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  grid-auto-rows: auto;
  grid-gap: 20px;
  width: 100vw;
  height: 100%;
  row-gap: 100px;
  margin-left: 15px;
  margin-top: 70px;
`;

const Div = styled.div`
  font-size: 20px;

`

function Products() {
  const [state, dispatch] = useStoreContext();

  const { currentCategory } = state;

  const { loading, data } = useQuery(QUERY_PRODUCTS);

  useEffect(() => {
    if (data) {
      dispatch({
        type: UPDATE_PRODUCTS,
        products: data.products,
      });
      data.products.forEach((product) => {
        idbPromise('products', 'put', product);
      });
    } else if (!loading) {
      idbPromise('products', 'get').then((products) => {
        dispatch({
          type: UPDATE_PRODUCTS,
          products: products,
        });
      });
    }
  }, [data, loading, dispatch]);

  function filterProducts() {
    if (!currentCategory) {
      return state.products;
    }

    return state.products.filter(
      (product) => product.category._id === currentCategory
    );
  }

  return (
    <>
      <Navbar />
      {state.products.length ? (
        <>
        <>
          <Container >
            {filterProducts().map((product) => (
              <Div>
                <ProductItem
                  key={product._id}
                  id={product._id}
                  image={product.image}
                  name={product.name}
                  price={product.price}
                  quantity={product.quantity}
                />
              </Div>
            ))}
          </Container>
        </>
        <>
        <Footer />
        </>
        </>
      ) : (
        <h3>You haven't added any products yet!</h3>
      )}
      {loading ? <h2> LOADING ...</h2> : null}
    </>
  )
};

export default Products