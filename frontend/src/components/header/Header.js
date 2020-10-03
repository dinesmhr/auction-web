import React, { Component } from 'react';
import MainNavigation from '../navigation/MainNavigation'

class Header extends Component {
    render() { 
        return ( 
            <header id="aweb-header">
                <h1 className="aweb-site-title">Auction Web</h1>
                <MainNavigation userLoggedIn = {this.props.userLoggedIn}/>
            </header>
        );
    }
}
 
export default Header;