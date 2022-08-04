import React from 'react'
import styled from 'styled-components';
import { mobile } from "../responsive";
import { Link } from "react-router-dom";

const Container = styled.div`
  flex: 1;
  margin: 3px;
  height: 70vh;
  position: relative;
${mobile({ height: "20vh", width: "100vw" })}
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const Info = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Title = styled.h1`
  color: white;
  margin-bottom: 25px;
  font-size: 70px;
`;

const StyledLink = styled(Link)  `
  padding: 10px;
  font-size: 15px;
  background-color: white;
  color: black;
  font-weight: bold;
  cursor: pointer;
  text-decoration: none;
  border-radius: 10px;
  ${mobile({ fontSize: "12px", marginLeft: "10px" })}
`;

function FeaturedItems ({item}) {
  return (
    <Container>
      <Image src={item.img}/>
      <Info>
        <Title>{item.title}</Title>
        <StyledLink to="/products"> SHOP NOW </StyledLink>
        </Info> 
    </Container>
  )
}

export default FeaturedItems