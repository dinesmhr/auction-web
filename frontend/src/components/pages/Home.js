import React from 'react';
import Header from '../header/Header'

const Home = (props) => {
    const { isLoggedIn } = props
    return ( 
        <>
            <Header isLoggedIn = { isLoggedIn }/>
            <div id="auction-web-home" className="page--home main-wrapper">
                <div className= "home-banner">
                <img src="/assets/auction.jpg"/>
                </div>
            </div>
        </>
    );
}

export default Home;