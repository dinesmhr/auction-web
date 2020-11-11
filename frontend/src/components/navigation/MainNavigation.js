import React, { Component} from 'react';
import { NavLink } from 'react-router-dom';

class MainNavigation extends Component {
    constructor(props) {
        super( props )
        this.state = {
                userId: localStorage.auctionWebSessionUserId,
                userloggedin: localStorage.auctionWebSessionUserLogged,
                userVerified: localStorage.auctionWebSessionUserStatus
            }
    }

    render() { 
        const { userloggedin, userVerified } = this.state
        return (
        	<div className="nav-wrap">        
                <ul>                 	                       				 
                    <li><NavLink exact activeClassName="active_name" to="/">Home</NavLink></li>  				 
                    <li><NavLink activeClassName="active_name" to="/shop">Products</NavLink></li>
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
                    { userloggedin && ( userVerified !== 'verified' ) && 
                        <li><NavLink activeClassName="active_name" to="/user-verification">Verify Account</NavLink></li>
                    }
                    <li><NavLink activeClassName="active_name" to="/user-submit-product">Submit Product</NavLink></li>
                </ul>
            </div>                                    
        );
    }
}
 
export default MainNavigation;