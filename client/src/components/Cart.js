import React, { useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { useLazyQuery } from '@apollo/client';
import { QUERY_CHECKOUT } from '../utils/queries';
import { idbPromise } from '../utils/helpers';
import CartItem from './CartItems';
import Auth from '../utils/auth';
import { useStoreContext } from '../utils/GlobalState';
import { TOGGLE_CART, ADD_MULTIPLE_TO_CART } from '../utils/actions';
import { DeleteOutline, ShoppingCartOutlined } from '@material-ui/icons';
import styled from 'styled-components';

const CartToggler = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  background-color: white;
  overflow: auto;
  padding: 10px;
  box-shadow: 0 0 1rem rgba(0, 0, 0, .5);
  border-bottom-left-radius: 10px;
  z-index: 2;
  width: 20%;
  height: 20%;
`;

const CloseCart = styled.div`
position: absolute;
  top: .5rem;
  right: .5rem;
  cursor: pointer;

  &&:hover {
    text-decoration: underline;
  }
`;

const Info = styled.div`
  width: 90px;
  padding: 0;
  margin-left: 20px;
`;
const Total = styled.div`

`;

const ClosedCart = styled.div`
  font-size: 20px;
  cursor: pointer;
  border-radius: 50%;
  padding: 10px;
  width: 50px;
  height: 50px;
  
  &&:hover {
    transform: rotate(8deg);
  }
`;

const Button = styled.div`
  padding: 10px;
  font-size: 20pz;
  background-color: transparent;
  cursor: pointer;
  border-radius: 10px;
`;

const stripePromise = loadStripe('pk_test_TYooMQauvdEDq54NiTphI7jx');

const Cart = () => {
  const [state, dispatch] = useStoreContext();
  const [getCheckout, { data }] = useLazyQuery(QUERY_CHECKOUT);

  useEffect(() => {
    if (data) {
      stripePromise.then((res) => {
        res.redirectToCheckout({ sessionId: data.checkout.session });
      });
    }
  }, [data]);

  useEffect(() => {
    async function getCart() {
      const cart = await idbPromise('cart', 'get');
      dispatch({ type: ADD_MULTIPLE_TO_CART, products: [...cart] });
    }

    if (!state.cart.length) {
      getCart();
    }
  }, [state.cart.length, dispatch]);

  function toggleCart() {
    dispatch({ type: TOGGLE_CART });
  }

  function calculateTotal() {
    let sum = 0;
    state.cart.forEach((item) => {
      sum += item.price * item.purchaseQuantity;
    });
    return sum.toFixed(2);
  }

  function submitCheckout() {
    const productIds = [];

    state.cart.forEach((item) => {
      for (let i = 0; i < item.purchaseQuantity; i++) {
        productIds.push(item._id);
      }
    });

    getCheckout({
      variables: { products: productIds },
    });
  }

  if (!state.cartOpen) {
    return (
      <> 
      <ClosedCart onClick={toggleCart}>
       <ShoppingCartOutlined/>
      </ClosedCart>
      </>
    );
  }

  return (
    <CartToggler>
      <CloseCart onClick={toggleCart}>
        <DeleteOutline/>
      </CloseCart>
      <h2>Shopping Cart</h2>
      {state.cart.length ? (
        <Info>
          {state.cart.map((item) => (
            <CartItem key={item._id} item={item} />
          ))}

          <Total>
            <strong>Total: ${calculateTotal()}</strong>

            {Auth.loggedIn() ? (
              <Button onClick={submitCheckout}>Checkout</Button>
            ) : (
              <span>(log in to check out)</span>
            )}
          </Total>
        </Info>
      ) : (
        <h3>
          nothing in your cart yet!
        </h3>
      )}
    </CartToggler>
  );
};

export default Cart;
