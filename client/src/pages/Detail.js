import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import Cart from '../components/Cart';
import { useStoreContext } from '../utils/GlobalState';
import {
  REMOVE_FROM_CART,
  UPDATE_CART_QUANTITY,
  ADD_TO_CART,
  UPDATE_PRODUCTS,
} from '../utils/actions';
import { QUERY_PRODUCTS } from '../utils/queries';
import { idbPromise } from '../utils/helpers';
import {ShoppingCartOutlined, DeleteOutline } from '@material-ui/icons';
import styled from 'styled-components';
import Navbar from '../components/Navbar';
import Broadcast from '../components/Broadcast';

const Wrapper = styled.div`
  padding: 50px;
  display: flex;
`;

const Container = styled.div`
  `
const Info = styled.div`
  flex: 1;
  margin-left: 500px;
  margin-top: 40px;
  `
const ImageContainer = styled.div`
  margin-top: 20px;
  flex: 1;
  /* max-width: 50%;
  max-height: 50%; */
  `

function Detail() {
  const [state, dispatch] = useStoreContext();
  const { id } = useParams();

  const [currentProduct, setCurrentProduct] = useState({});

  const { loading, data } = useQuery(QUERY_PRODUCTS);

  const { products, cart } = state;

  useEffect(() => {
        if (products.length) {
      setCurrentProduct(products.find((product) => product._id === id));
    }
    else if (data) {
      dispatch({
        type: UPDATE_PRODUCTS,
        products: data.products,
      });

      data.products.forEach((product) => {
        idbPromise('products', 'put', product);
      });
    }
    else if (!loading) {
      idbPromise('products', 'get').then((indexedProducts) => {
        dispatch({
          type: UPDATE_PRODUCTS,
          products: indexedProducts,
        });
      });
    }
  }, [products, data, loading, dispatch, id]);

  const addToCart = () => {
    const itemInCart = cart.find((cartItem) => cartItem._id === id);
    if (itemInCart) {
      dispatch({
        type: UPDATE_CART_QUANTITY,
        _id: id,
        purchaseQuantity: parseInt(itemInCart.purchaseQuantity) + 1,
      });
      idbPromise('cart', 'put', {
        ...itemInCart,
        purchaseQuantity: parseInt(itemInCart.purchaseQuantity) + 1,
      });
    } else {
      dispatch({
        type: ADD_TO_CART,
        product: { ...currentProduct, purchaseQuantity: 1 },
      });
      idbPromise('cart', 'put', { ...currentProduct, purchaseQuantity: 1 });
    }
  };

  const removeFromCart = () => {
    dispatch({
      type: REMOVE_FROM_CART,
      _id: currentProduct._id,
    });

    idbPromise('cart', 'delete', { ...currentProduct });
  };

  return (
    <>
    <Navbar/>
    <Broadcast />
      {currentProduct && cart ? (
        <Container>
          <Link to="/products">← Back to Products</Link>
          <Wrapper> 
          <Info> 
          <h2>{currentProduct.name}</h2>
          <p>{currentProduct.description}</p>
          <p>
            <strong>Price:</strong>${currentProduct.price}{' '}
            <ShoppingCartOutlined onClick={addToCart}></ShoppingCartOutlined>
            <DeleteOutline
              disabled={!cart.find((p) => p._id === currentProduct._id)}
              onClick={removeFromCart}>
            </DeleteOutline>
          </p>
        </Info>
        <ImageContainer> 
          <img
            src={`/${currentProduct.image}`}
            alt={currentProduct.name}
          />
          </ImageContainer> 
          </Wrapper>
        </Container>
      ) : null}
      {loading ? <h2> LOADING...</h2> : null}
      <Cart />
          </>
  );
}

export default Detail;
