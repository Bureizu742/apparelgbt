import React from 'react';
import { Link } from 'react-router-dom';
import { useStoreContext } from '../utils/GlobalState';
import { ADD_TO_CART, UPDATE_CART_QUANTITY } from '../utils/actions';
import { idbPromise } from '../utils/helpers';
import { ShoppingCartOutlined } from '@material-ui/icons';
import path from 'path';

import styled from 'styled-components';

const Info = styled.div`
  opacity: 0;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 3;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.5s ease;
  cursor: pointer;
`;

const Container = styled.div`
  flex: 1;
  margin: 5px;
  min-width: 280px;
  height: 350px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;

  &:hover ${Info} {
    opacity: 1;
  }
`;


const Image = styled.img`
  height: 75%;
  width: 75%;
  object-fit: cover;
  z-index: 2;
`;

const Icon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 10px;
  transition: all 0.5s ease;

  &:hover {
    background-color: #cfcfc4;
    transform: scale(1.1);
  }
`;


function ProdItems(item, { image }) {
  const [state, dispatch] = useStoreContext();

  const {
    name,
    _id,
    price,
    quantity
  } = item;

  const { cart } = state

  const addToCart = () => {
    const itemInCart = cart.find((cartItem) => cartItem._id === _id)
    if (itemInCart) {
      dispatch({
        type: UPDATE_CART_QUANTITY,
        _id: _id,
        purchaseQuantity: parseInt(itemInCart.purchaseQuantity) + 1
      });
      idbPromise('cart', 'put', {
        ...itemInCart,
        purchaseQuantity: parseInt(itemInCart.purchaseQuantity) + 1
      });
    } else {
      dispatch({
        type: ADD_TO_CART,
        product: { ...item, purchaseQuantity: 1 }
      });
      idbPromise('cart', 'put', { ...item, purchaseQuantity: 1 });
    }
  }
  return (
    <Container>
      <Link to={`/products/${_id}`} >
        <p>{name}</p>
      </Link>
      <Image src={`${path.join(process.env.PUBLIC_URL, image)}`} />
      <Info>
        <Icon>
          <ShoppingCartOutlined />
        </Icon>
      </Info>
      <div>{quantity} in stock</div>
      <div>${price}</div>
      <button onClick={addToCart}>Add to cart</button>
    </Container>
  )
}

export default ProdItems;