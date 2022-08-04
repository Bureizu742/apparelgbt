import { Search} from '@material-ui/icons';
import React from 'react';
import styled from 'styled-components';
import Auth from "../utils/auth";
import { mobile } from '../responsive'
import { Link } from "react-router-dom";
import Cart from '../components/Cart'
import auth from '../utils/auth';

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
  ${mobile({ display: "none" })}
`;

const Input = styled.input`
  border: none;
  ${mobile({ width: "50px" })}
`;

const Center = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 200px;
  ${mobile({ justifyContent: "center" })}
`;

const Right = styled.div`
  flex: 1;
  display: flex;
  justify-content: flex-end;
  ${mobile({ flex: 2, justifyContent: "center" })}
`;

const StyledLink = styled(Link)  `
  font-size: 14px;
  cursor: pointer;
  margin-left: 25px;
  font-weight: bold;
  color: black;
  text-decoration: none;
  ${mobile({ display: "none" })}
`;

const NavLink = styled(Link)  `
  font-weight: bold;
  font-style: italic;
  font-size: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  text-decoration: none;
  color: black;
  ${mobile({ fontSize: "24px", justifyContent: "center" })}
`;

const LinkItem = styled.div`
  font-size: 14px;
  cursor: pointer;
  font-weight: bold;
  ${mobile({ fontSize: "12px", marginLeft: "10px" })}
 `;

function Navbar() {
  function loggedInNav() {
    if (Auth.loggedIn()) {
      return (
        <>
        <StyledLink to="/orderHistory">
        ORDER HISTORY
      </StyledLink> 
      <StyledLink to="/" onClick={() => auth.logout()}> LOGOUT</StyledLink>
        </>
      )
  } else {
    return (
      <> 
      <StyledLink to="/signup"> CREATE ACCOUNT </StyledLink>
      <StyledLink to="/login"> LOGIN</StyledLink>
      </>
    )
  }
}
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
          <NavLink to="/"> appareLGBT </NavLink> 
            </Center>
        <Right>
          <LinkItem> 
          <Cart />
          </LinkItem>
        </Right>
        <nav>
        {loggedInNav()}
      </nav>
      </Wrapper>
    </Container>
  )
}

export default Navbar