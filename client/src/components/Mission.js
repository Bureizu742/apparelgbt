import React from 'react'
import styled from 'styled-components';

const Container = styled.div`
  height: 25px;
  margin-bottom: 40px;
  color: black;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 30x;
  font-weight: bold;
  font-style: italic;
`;

function Mission() {
  return (
    <Container> 
      Our mission is to give a platform to LGBTQ+ designers, and carve a space for pride items seperate from a corporation.
    </Container>
  )
}

export default Mission