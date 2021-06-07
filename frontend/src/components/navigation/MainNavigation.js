import React, { Component} from 'react';
import { NavLink } from 'react-router-dom';

const MainNavigation = (props) => {

    const { isLoggedIn } = props
    return (
        <div className="nav-wrap">        
            <ul>                 	                       				 
                <li><NavLink exact activeClassName="active_name" to="/">Home</NavLink></li>  				 
                <li><NavLink activeClassName="active_name" to="/products">Products</NavLink></li>
                { isLoggedIn && 
                    <li><NavLink activeClassName="active_name" to="/user-verification">Verify Account</NavLink></li>
                }
                <li><NavLink activeClassName="active_name" to="/user-submit-product">Submit Product</NavLink></li>
                { isLoggedIn && 
                    <li><NavLink activeClassName="active_name" to="/myaccount">My Account</NavLink></li>
                }
                { !isLoggedIn && 
                    <>
                        <li><NavLink activeClassName="active_name" to="/login">Login</NavLink></li>
                        <li><NavLink activeClassName="active_name" to="/signup">Sign Up</NavLink></li>
                    </>
                }
            </ul>
        </div>                                    
    );
}
 
export default MainNavigation;