import React, { Component} from 'react';
import { NavLink } from 'react-router-dom';

class MainNavigation extends Component {

    render() { 
        return (   
        	<div className="nav-wrap">        
                <ul>                 	                       				 
                    <li><NavLink exact activeClassName="active_name" to="/">Home</NavLink></li>  				 
                    <li><NavLink activeClassName="active_name" to="/shop">Shop</NavLink></li>
                    <li>
                        <NavLink activeClassName="active_name" to="/login">
                            { this.props.userLoggedIn && 
                                    'Logout'
                            }
                            { !this.props.userLoggedIn && 
                                    'Login'
                            }
                        </NavLink>
                    </li>
                </ul>
            </div>                                    
        );
    }
}
 
export default MainNavigation;