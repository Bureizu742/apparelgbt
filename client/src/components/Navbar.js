import { Badge } from '@material-ui/core';
import { Search, ShoppingCartOutlined } from '@material-ui/icons';
import React from 'react';
import styled from 'styled-components';
import { mobile } from '../responsive'
import { Link } from "react-router-dom";

const Container = styled.div`
 height: 60px;
 margin-bottom: 20px;
 ${mobile({ height: "50px" })}
`;

const Wrapper = styled.div`
  padding: 10px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  ${mobile({ padding: "10px 0px" })}
`;

const Left = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
`;

const Location = styled.span`
  font-size: 14px;
  cursor: pointer;
  ${mobile({ display: "none" })}
`;

const SearchContainer = styled.div`
  border: 1px solid black;
  display: flex;
  align-items: center;
  margin-left: 25px;
  padding: 5px;
`;
const Input = styled.input`
  border: none;
  ${mobile({ width: "50px" })}
`
const Center = styled.div`
  flex: 1;
  text-align: center;
`;

const Logo = styled.h1`
font-weight: bold;
font-style: italic;
${mobile({ fontSize: "24px" })}
`;
const Right = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  ${mobile({ flex: 2, justifyContent: "center" })}
`;

const NavLinks = styled.a  `
font-size: 14px;
  cursor: pointer;
  margin-left: 25px;
  font-weight: bold;
  color: black;
  &:hover {
    color: black;
  }
  ${mobile({ fontSize: "12px", marginLeft: "10px" })}
`
const LinkItem = styled.div`
  font-size: 14px;
  cursor: pointer;
  margin-left: 25px;
  font-weight: bold;
  ${mobile({ fontSize: "12px", marginLeft: "10px" })}
`

function Navbar() {
  return (
    <Container>
      <Wrapper>
        <Left>
          <Location> US </Location>
          <SearchContainer>
            <Input />
            <Search style={{color: 'grey', fontSize: 16}}/>
          </SearchContainer>
        </Left>
        <Center> 
          <Logo> formedright.
            </Logo> 
            </Center>
        <Right>
          <NavLinks> 
          <Link to="/signup"> CREATE ACCOUNT </Link>
          <Link to="/login"> LOGIN</Link>
          </NavLinks>
          <LinkItem> 
          <Badge badgeContent={4} color="secondary">
          <ShoppingCartOutlined />
          </Badge>
          </LinkItem>
        </Right>
      </Wrapper>
    </Container>
  )
}

export default Navbar