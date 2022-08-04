import React from 'react';
import { Link } from "react-router-dom";
import { pluralize } from "../utils/helpers"
import path from 'path';
import styled from 'styled-components';
// import { ShoppingCartOutlined } from '@material-ui/icons';

const Container = styled.div`
  display: flex;
  flex-direction: column;
    
`;

const Image = styled.img`
  display: flex;
  height: 80%;
  width: 90%;
  font-size: 15px;
`;

const Prod = styled.div`
  text-align: center;
  margin-top: 30px;
`;

const Price = styled.p`
  font-weight: bold;
`;

const Name = styled.h3`
  font-weight: bold;
`;


function ProductItems(item) {
  const {
    image,
    name,
    id,
    price,
    quantity
  } = item;
  
  return (
  <>
    <Container>
      <Link to={`/products/${id}`}>
      <Image
        alt={name}
        src={`${path.join(process.env.PUBLIC_URL, `${image}`)}`}
      />
      </Link>
      <Prod>
        <Name>{name}</Name>
        <div>{quantity} {pluralize("item", quantity)} in stock</div>
        <Price>${price}</Price>
      </Prod>
    </Container>
  </>
  )
}

export default ProductItems;