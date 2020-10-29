import React, { Component } from 'react';

class AdminMainNavigation extends Component {
    render() { 
        return ( 
            <nav id="aweb-admin-navigation">
                <ul className="admin-nav-wrap">
                    <li><a href="/aweb-admin">Dashboard</a></li>
                    <li><a href="/aweb-users">Users</a></li>            	
                </ul>
            </nav>
        );
    }
}

export default AdminMainNavigation;