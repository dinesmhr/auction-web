import React, { Component } from 'react';
import AdminNavigation from '../navigation/AdminNavigation'
import MainNavigation from '../navigation/MainNavigation'

const Header = (props) => {
    const { isLoggedIn } = props
    return (
        <header>
            { isLoggedIn &&
                <AdminNavigation />
            }
            <div className="aweb-header">
                <h1 className="aweb-site-title"><a href="/">Auction<span>Web</span></a></h1>
                <MainNavigation isLoggedIn = { isLoggedIn } />
            </div>
        </header>
    );
}
 
export default Header;