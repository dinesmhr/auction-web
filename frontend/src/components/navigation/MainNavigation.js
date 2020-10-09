import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

class MainNavigation extends Component {
    render() { 
        return ( 
            <nav id="aweb-main-navigation">
                 <ul className="nav-wrap">
                 	<Tabs>                   
                     <NavLink to="/"><li><Tab label="Home"/></li></NavLink>     				 
                     <NavLink to="/shop"><li><Tab label="Shop"/></li></NavLink>
                     <NavLink to="/login">
                        	<li>
                            	{ this.props.userLoggedIn && 
                                		'Logout'
                            	}
                            	{ !this.props.userLoggedIn && 
                                		<Tab label="Login"/>
                            	}
                        	</li>
                    	</NavLink>
                  	</Tabs>
                 </ul>              
            </nav>
        );
    }
}
 
export default MainNavigation;