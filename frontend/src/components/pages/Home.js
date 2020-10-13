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
            <Fragment>
                <Header userLoggedIn = { isLoggedIn }/>
                <div id="auction-web-home" className="page--home main-wrapper">
                    This is home page
                </div>
            </Fragment>
        );
    }
}

export default Home;