import React, { Component } from 'react';
import MainNavigation from '../navigation/MainNavigation'


class Header extends Component {
    render() { 
        return (         	
            <header> 
            <nav id="aweb-main-navigation">
            		<div className="aweb-header">              	
                						<div className="aweb-site-title">Auction Web</div> 
            		</div>
                <MainNavigation userLoggedIn = {this.props.userLoggedIn}/>
                </nav> 
            </header>
        );
    }
}
 
export default Header;