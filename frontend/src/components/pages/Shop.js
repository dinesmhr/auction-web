import React, { Component, Fragment } from 'react';
import Header from '../header/Header'

class Shop extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        const { isLoggedIn } = this.props
        return ( 
            <Fragment>
                <Header userLoggedIn = { isLoggedIn }/>
                <div id="auction-web-shop" className="page--shop main-wrapper">
                    This is shop page
                </div>
            </Fragment>
        );
    }
}

export default Shop;