import React, { Component } from 'react';
import { Link } from 'react-router-dom'

class MainNavigation extends Component {
    render() { 
        return ( 
            <nav id="aweb-main-navigation">
                <ul className="nav-wrap">
                    <Link to="/"><li>Home</li></Link>
                    <Link to="/shop"><li>Shop</li></Link>
                    <Link to="/login"><li>Login</li></Link>
                </ul>
            </nav>
        );
    }
}
 
export default MainNavigation;