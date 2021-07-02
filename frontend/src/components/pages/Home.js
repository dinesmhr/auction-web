import React from 'react';
import Header from '../header/Header'
import Footer from '../footer/Footer'

const Home = () => {
    return ( 
        <div id="auction-web">
            <Header/>
            <div id="auction-web-home" className="page--home main-wrapper">
                <div className= "home-banner">
                <img src="/assets/auction.jpg"/>
                </div>
            </div>
            
        </div>
    );
}

export default Home;