import React from 'react';
import Broadcast from '../components/Broadcast';
import Navbar from '../components/Navbar';
import Carousel from '../components/Carousel';
import Categories from '../components/Categories';
import Products from '../components/Products';
import Newsleter from '../components/Newsletter';
import Footer from '../components/Footer';
import Mission from '../components/Mission';
function Home() {
  return (
    <div>
    <Broadcast />
    <Navbar />
    <Mission />
    <Carousel />
    <hr />
    <Categories />
    <hr />
    <Products />
    <hr />
    <Newsleter />
    <Footer />
    </div>
    
  )
}

export default Home