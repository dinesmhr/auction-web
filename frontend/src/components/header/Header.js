import React from 'react';
import AdminNavigation from '../navigation/AdminNavigation'
import MainNavigation from '../navigation/MainNavigation'

const Header = (props) => {
    const { isLoggedIn } = props
    return (
        <header>
            <AdminNavigation/>
            <div className="aweb-header">
                <h1 className="aweb-site-title"><a href="/">Auction<span>Web</span></a></h1>
                <MainNavigation/>
            </div>
        </header>
    );
}
 
export default Header;