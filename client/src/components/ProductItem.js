import React from 'react';
import { useStoreContext } from '../utils/GlobalState';
import { ADD_TO_CART, UPDATE_CART_QUANTITY } from '../utils/actions';
import { idbPromise } from '../utils/helpers';
import { Link } from "react-router-dom";
import { pluralize } from "../utils/helpers"
import path from 'path';
// import { ShoppingCartOutlined } from '@material-ui/icons';
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

const Prod = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
`;


function ProductItems(item) {
  const [state, dispatch] = useStoreContext();

  const {
    image,
    name,
    id,
    price,
    quantity
  } = item;
  // console.log('ID', id)
  const { cart, products } = state;

  const addToCart = () => {
    console.log(cart)
    const itemInCart = products.find((cartItem) => cartItem._id === id)
    if (itemInCart) {
      console.log(cart)
      dispatch({
        type: UPDATE_CART_QUANTITY,
        _id: id,
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
    <>
      <Container>
        <Link to={`/products/${id}`}>
          <Image
            alt={name}
            src={`${path.join(process.env.PUBLIC_URL, `${image}`)}`}
          />
        </Link>
        {/* {loading ? <h2> LOADING ...</h2> : null} */}
      </Container>
      <Prod>
        <p>{name}</p>
        <div>{quantity} {pluralize("item", quantity)} in stock</div>
        <span>${price}</span>
      </Prod>
    </>
  )
}

export default ProductItems;