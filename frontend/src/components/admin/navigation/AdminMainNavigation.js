import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';


class AdminMainNavigation extends Component {
    render() { 
        return ( 
            <nav id="aweb-admin-front-navigation">
                 <ul className="admin-front-nav-wrap">     
                        <NavLink to="/aweb-admin"><li>Dashboard</li></NavLink>
                        <NavLink to="/aweb-users"><li>Users</li></NavLink>                  	
                 </ul>
            </nav>
        );
    }
}

export default AdminMainNavigation;