import React, { Component, Fragment } from 'react';
import Header from '../header/Header'

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        const { isLoggedIn } = this.props
        return ( 
<<<<<<< HEAD
            <div id="auction-web-home" className="page--home-main-wrapper">
                This is home page
            </div>
=======
            <Fragment>
                <Header userLoggedIn = { isLoggedIn }/>
                <div id="auction-web-home" className="page--home main-wrapper">
                    This is home page
                </div>
            </Fragment>
>>>>>>> 8759ddd576951e0c27784732e2f14dc56d3a1d04
        );
    }
}

export default Home;