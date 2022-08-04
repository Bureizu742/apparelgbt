import React from 'react'
import styled from 'styled-components';
import { mobile } from '../responsive'

const Container = styled.div`
  height: 50px;
  background-color:black ;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  font-weight: bold;
  ${mobile({ display: "none" })}
`;

function Broadcast() {
  return (
    <Container> 40% OF ALL ORDERS ARE DONATED TO THE TREVOR PROJECT.</Container>
  )
}

export default Broadcast