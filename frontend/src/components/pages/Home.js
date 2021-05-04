import React, { Component } from 'react';
import Header from '../header/Header'

class Home extends Component {
    render() { 
        const { isLoggedIn } = this.props
        return ( 
            <>
                <Header userLoggedIn = { isLoggedIn }/>
                <div id="auction-web-home" className="page--home main-wrapper">
                    <div className= "home-banner">
                    <img src="/assets/auction.jpg"/>
                    </div>
                </div>
            </>
        );
    }
}

export default Home;