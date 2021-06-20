import React from 'react';
import Header from '../header/Header'

const Home = (props) => {
    const { isLoggedIn } = props
    return ( 
        <div id="auction-web">
            <Header isLoggedIn = { isLoggedIn }/>
            <div id="auction-web-home" className="page--home main-wrapper">
                <div className= "home-banner">
                <img src="/assets/auction.jpg"/>
                </div>
            </div>
        </div>
    );
}

export default Home;