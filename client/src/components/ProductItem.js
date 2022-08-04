import React from 'react';
import { Link } from "react-router-dom";
import { pluralize } from "../utils/helpers"
import path from 'path';
import styled from 'styled-components';
// import { ShoppingCartOutlined } from '@material-ui/icons';

const Container = styled.div`
  flex: 1;
  vertical-align: top;
  display: inline-block;
`;

const Image = styled.img`
  height: 75%;
  width: 75%;
  object-fit: cover;
`;

const Prod = styled.div`
  display: block;
  margin: 20px 20px 20px 20px;
  font-size: 15px;
`;
const Price = styled.p`
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
        <p>{name}</p>
        <div>{quantity} {pluralize("item", quantity)} in stock</div>
        <Price>${price}</Price>
      </Prod>
    </Container>
  </>
  )
}

export default ProductItems;