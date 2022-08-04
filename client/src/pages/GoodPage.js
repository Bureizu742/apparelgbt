import React, { useEffect } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_ORDER } from '../utils/mutations';
import { idbPromise } from '../utils/helpers';
import { Link } from "react-router-dom";
import styled from 'styled-components';

const Container = styled.div`
  background-color: #f4f0ec;
  width: 100vw;
  height: 100vh;
`;

const StyledLink = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  cursor: pointer;
  margin-left: 25px;
  color: black;
  text-decoration: none;
  margin-bottom: 15px
`;
const Placed = styled.h1`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 10px;
  height: 60%;
`;
const Redir = styled.h3`
  display: flex;
  align-items: center;
  justify-content: center;
`;

function Success() {
  const [addOrder] = useMutation(ADD_ORDER);

  useEffect(() => {
    async function saveOrder() {
      const cart = await idbPromise('cart', 'get');
      const products = cart.map((item) => item._id);

      if (products.length) {
        const { data } = await addOrder({ variables: { products } });
        const productData = data.addOrder.products;

        productData.forEach((item) => {
          idbPromise('cart', 'delete', item);
        });
      }

      setTimeout(() => {
        window.location.assign('/OrderHistory');
      }, 7000);
    }

    saveOrder();
  }, [addOrder]);

  return (
    <Container>
        <Placed>Order placed, thanks!</Placed>
        <Redir>You will now be redirected to the home page</Redir>
      <StyledLink to="/OrderHistory"> Click here if you are not redirected. </StyledLink>
    </Container>
  );
}

export default Success;
