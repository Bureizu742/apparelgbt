import React from 'react';
import Broadcast from '../components/Broadcast';
import Navbar from '../components/Navbar';
import Carousel from '../components/Carousel';
import Newsleter from '../components/Newsletter';
import Footer from '../components/Footer';
import Mission from '../components/Mission';
import { mobile } from "../responsive";
import styled from 'styled-components';

const Container = styled.div`
  display: flex; 
  padding: 20px;
  justify-content: space-between;
  ${mobile({ padding: "0px", flexDirection:"column" })}
`;

function Home() {
  return (
    <div>
    <Broadcast />
    <Navbar />
    <Mission />
    <Carousel />
    <hr />
    <Container>
      </Container>
    <hr />
    <Newsleter />
    <Footer />
    </div>
  )
}

export default Home