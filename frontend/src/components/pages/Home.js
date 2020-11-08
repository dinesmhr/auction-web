import React, { Component } from 'react';
import Header from '../header/Header'

class Home extends Component {
    render() { 
        const { isLoggedIn } = this.props
        return ( 
            <>
                <Header userLoggedIn = { isLoggedIn }/>
                <div id="auction-web-home" className="page--home main-wrapper">
                    This is home page
                </div>
            </>
        );
    }
}

export default Home;