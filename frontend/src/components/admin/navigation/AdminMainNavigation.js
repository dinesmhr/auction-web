import React, { Component } from 'react';

class AdminMainNavigation extends Component {
    render() { 
        return ( 
        	<div className="aweb-admin-wrap">
                <nav id="aweb-admin-navigation">
                    <ul className="admin-nav-wrap">
                        <li><a href="/aweb-admin">Dashboard</a></li>
                        <li><a href="/aweb-users">Users</a></li>
                        <li><a href="/aweb-products">Products</a></li>
                        <li><a href="/aweb-categories">Products Categories</a></li>
                    </ul>
                </nav>
            </div>
        );
    }
}

export default AdminMainNavigation;