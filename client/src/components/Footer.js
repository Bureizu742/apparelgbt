import { Instagram, MailOutline, Phone, Pinterest, Room, Twitter } from '@material-ui/icons';
import React from 'react'
import { Link } from "react-router-dom";
import styled from 'styled-components'
import { mobile } from "../responsive";

const Container = styled.div`
  display: flex;
  ${mobile({ flexDirection: "column" })}
`;

const Left = styled.div`
  flex:1;
  display: flex;
  flex-direction: column;
  padding: 20px;
`;

const Logo = styled.h1`
`;

const Description = styled.p`
  margin: 20px 0px;
`;

const Socials = styled.div`
  display: flex;
`;

const SocIcon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 20px;
  cursor: pointer;
`;

const Center = styled.div`
  flex:1;
  padding: 20px;
  ${mobile({ display: "none" })}
`;

const Title = styled.h3`
  margin-bottom: 30px;
`;

const List = styled.ul`
  margin: 0px;
  padding: 0px;
  list-style: none;
  display: flex;
  flex-wrap: wrap;
`;

const ListItem = styled.li`
  width: 50%;
  margin-bottom: 10px;
  cursor: pointer;
`;

const Right = styled.div`
  flex:1;
  padding: 20px;
  ${mobile({ backgroundColor: "#fff8f8" })}
`;

const ContactItem = styled.div`
  margin-bottom: 20px;
  display: flex;
  align-items: center;
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
  ${mobile({ fontSize: "12px", marginLeft: "10px" })}
`;

// const Payment = styled.img`
//   width: 50%;
// `;
function Footer() {
  return (
    <Container>
      <Left>
        <Logo> appareLGBT </Logo>
        <Description> We only source brands that make quality clothing, formed to last. Our mission is sustainable, slow fashion for the LGBTQ+ community, made by the LGBTQ+ community.
        </Description>
        <Socials>
          <SocIcon color="c4aead">
            <Instagram />
          </SocIcon>
          <SocIcon color="c4aead">
            <Twitter />
          </SocIcon>
          <SocIcon color="c4aead">
            <Pinterest />
          </SocIcon>
        </Socials>
      </Left>
      <Center>
        <Title> SHOP </Title>
        <List>
          <ListItem>
            <StyledLink to="/">HOME</StyledLink>
          </ListItem>
          <ListItem>
            <StyledLink to="/orderHistory">ORDERS</StyledLink>
          </ListItem>
          <ListItem>
            <StyledLink to="/products">TOPS</StyledLink>
          </ListItem>
          <ListItem>
            <StyledLink to="/products">BOTTOMS</StyledLink>
          </ListItem>
          <ListItem>
            <StyledLink to="/products">ACCESSORIES</StyledLink>
          </ListItem>
        </List>
      </Center>
      <Right>
        <Title> Contact Us </Title>
        <ContactItem> <Room style={{ marginRight: "10px" }} /> 8600 Los Angeles, CA </ContactItem>
        <ContactItem> <Phone style={{ marginRight: "10px" }} /> 123-069-0420 </ContactItem>
        <ContactItem> <MailOutline style={{ marginRight: "10px" }} /> contactus@apparelgbt.mail </ContactItem>
        {/* <Payment img src={process.env.PUBLIC_URL + "assets/payment.jpeg"} /> */}
      </Right>
    </Container>
  )
}

export default Footer