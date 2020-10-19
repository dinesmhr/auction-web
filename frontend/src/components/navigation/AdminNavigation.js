import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

class AdminNavigation extends Component {
    render() { 
        return ( 
            <nav id="aweb-admin-front-navigation">
                 <ul className="admin-front-nav-wrap">
                 	<Tabs>
                        <NavLink to="/aweb-admin"><li><Tab label="Dashboard"/></li></NavLink>
                  	</Tabs>
                 </ul>
            </nav>
        );
    }
}
 
export default AdminNavigation;