import React, { Component } from 'react';
import AdminNavigation from '../navigation/AdminNavigation'
import MainNavigation from '../navigation/MainNavigation'

class Header extends Component {
    render() { 
        const { userLoggedIn } = this.props
        return (
            <header>
                { userLoggedIn &&
                    <AdminNavigation />
                }
                <div className="aweb-header">
                    <h1 className="aweb-site-title"><a href="/">Auction<span>Web</span></a></h1>
                    <MainNavigation userLoggedIn = { userLoggedIn } />
                </div>
            </header>
        );
    }
}
 
export default Header;