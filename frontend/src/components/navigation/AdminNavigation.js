import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

class AdminNavigation extends Component {
    render() { 
        return ( 
            <nav id="aweb-admin-front-navigation">
                <ul className="admin-front-nav-wrap">
                    <li><NavLink to="/aweb-admin">View Dashboard</NavLink></li>
                </ul>
            </nav>
        );
    }
}
 
export default AdminNavigation;