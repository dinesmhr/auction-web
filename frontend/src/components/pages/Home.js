import React, { useContext } from 'react';
import Header from '../header/Header'
import { appContext } from '../../App'

const Home = () => {
    const { isLoggedIn } = useContext(appContext)
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