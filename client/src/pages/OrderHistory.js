import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components'
import { useQuery } from '@apollo/client';
import { QUERY_USER } from '../utils/queries';

import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Title = styled.h2`
  display: flex;
  align-items: center;
  justify-content: center;
`;
const OrderDate = styled.h3`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
`;
const CardContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Card = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  display: block;
  padding: 4px;
  margin-bottom: 40px;
`;

const Image = styled.img`
  max-height: 400px;
  max-width: auto;
`;
const Name = styled.p`
  text-align: center;
`;

const Price = styled.div`
  display: block;
  padding: 4px;
  margin: 4px;
  text-align: center;
`;

const StyledLink = styled(Link)`
  font-size: 14px;
  cursor: pointer;
  margin-left: 25px;
  font-weight: bold;
  color: black;
  text-decoration: none;
`;

function OrderHistory() {
  const { data } = useQuery(QUERY_USER);
  let user;

  if (data) user = data.user;

  return (
    <>
      <Navbar />
      <div className="container my-1">
        <StyledLink to="/">← Back to Home</StyledLink>

        {user ? (
          <>
            <Title>
              Order History for {user.firstName}
            </Title>
            {user.orders.map((order) => (
              <div key={order._id}>
                <OrderDate> 
                <h3>
                  {new Date(parseInt(order.purchaseDate)).toLocaleDateString()}
                </h3>
                </OrderDate>
                {order.products.map(({ _id, image, name, price }, index) => (
                  <CardContainer>
                    <Card key={index}>
                      <StyledLink to={`/products/${_id}`}>
                        <Image alt={name} src={`${image}`} />
                        <Name>{name}</Name>
                      </StyledLink>
                      <Price>
                        <span>${price}</span>
                      </Price>
                    </Card>
                  </CardContainer>
                ))}
              </div>
            ))}
          </>
        ) : null}
      </div>
      <Footer />
    </>
  );
}

export default OrderHistory;