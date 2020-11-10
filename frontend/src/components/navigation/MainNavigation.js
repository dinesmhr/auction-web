import React, { Component} from 'react';
import { NavLink } from 'react-router-dom';

class MainNavigation extends Component {
    constructor(props) {
        super( props )
        this.state = {
                userId: sessionStorage.auctionWebSessionUserId,
                userloggedin: sessionStorage.auctionWebSessionUserLogged,
                userVerified: sessionStorage.auctionWebSessionUserStatus
            }
    }

    render() { 
        const { userloggedin, userVerified } = this.state
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
                    { userloggedin && ( userVerified === 'verified' ) && 
                        <li><NavLink activeClassName="active_name" to="/user-verification">Verify Account</NavLink></li>
                    }
                </ul>
            </div>                                    
        );
    }
}
 
export default MainNavigation;