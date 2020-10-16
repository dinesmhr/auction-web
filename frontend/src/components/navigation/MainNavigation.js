import React, { Component} from 'react';
import { NavLink } from 'react-router-dom';


class MainNavigation extends Component {

    render() { 
        return (   
        		<div className="nav-wrap">        
                 <ul>                 	                  
                     <NavLink exact activeClassName="active_name" to="/"><li>Home</li></NavLink>     				 
                     <NavLink activeClassName="active_name" to="/shop"><li>Shop</li></NavLink>
                     <NavLink activeClassName="active_name" to="/login">
                        	<li>
                            	{ this.props.userLoggedIn && 
                                		'Logout'
                            	}
                            	{ !this.props.userLoggedIn && 
                                		'Login'
                            	}
                        	</li>
                    	</NavLink>
                 </ul>
                </div>                                    
        );
    }
}
 
export default MainNavigation;