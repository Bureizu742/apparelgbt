import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components'
import { useQuery } from '@apollo/client';
import { QUERY_USER } from '../utils/queries';

import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const CardContainer = styled.div`

`;

const Card = styled.div`
  width: fit-content;
  border: 4px solid;
  border-radius: 8px;
  display: block;
  padding: 4px;
  margin: 4px;
`;

const Image = styled.img`
  max-height: 200px;
  max-width: auto;
`;

const Price = styled.div`
  border: 4px solid;
  border-radius: 8px;
  display: block;
  padding: 4px;
  margin: 4px;
`;

const StyledLink = styled(Link)`
  font-size: 14px;
  cursor: pointer;
  margin-left: 25px;
  font-weight: bold;
  color: black;
  text-decoration: none;
  &:hover {
    color: black;
  }
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
            <h2>
              Order History for {user.firstName}
            </h2>
            {user.orders.map((order) => (
              <div key={order._id}>
                <h3>
                  {new Date(parseInt(order.purchaseDate)).toLocaleDateString()}
                </h3>
                {order.products.map(({ _id, image, name, price }, index) => (
                  <CardContainer>
                    <Card key={index}>
                      <StyledLink to={`/products/${_id}`}>
                        <Image alt={name} src={`${image}`} />
                        <p>{name}</p>
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