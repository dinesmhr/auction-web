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
                    <div>
                        <h2 className="text-center text-2xl font-medium pt-6">Top Categories</h2>
                        <div>

                        </div>
                    </div>
                </div>
            <Footer/>
        </div>
    );
}

export default Home;