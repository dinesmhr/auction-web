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
<<<<<<< HEAD
            <div id="auction-web-shop" className="page--shop-main-wrapper">
                This is shop page
            </div>
=======
            <Fragment>
                <Header userLoggedIn = { isLoggedIn }/>
                <div id="auction-web-shop" className="page--shop main-wrapper">
                    This is shop page
                </div>
            </Fragment>
>>>>>>> 8759ddd576951e0c27784732e2f14dc56d3a1d04
        );
    }
}

export default Shop;