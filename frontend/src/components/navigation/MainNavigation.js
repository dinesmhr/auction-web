import React, { useState, useEffect, useContext } from 'react';
import { NavLink } from 'react-router-dom';
import {appContext} from '../../App'

const axios = require('axios')

const MainNavigation = () => {
    const [userId, setUserId] = useState('')
    const [userStatus, setUserStatus] = useState('')
    const { isLoggedIn } = useContext(appContext)

    useEffect(() => {
        axios.get( '/sessions.php' )
        .then(function(res) {
            if(res.data.login) {
                setUserId(res.data.userId)
            }
        })
    }, [])

    useEffect(() => {
        userId &&
        axios.get( `/users.php?id=${userId}`)
        .then(function(res) {
            console.log(res.data)
            if(res.data.status) {
                setUserStatus(res.data.data[0].status)
            }
        })
    }, [userId])

    return (
        <div className="nav-wrap">        
            <ul>                 	                       				 
                <li><NavLink exact activeClassName="active_name" to="/">Home</NavLink></li>
                <li><NavLink activeClassName="active_name" to="/products">Products</NavLink></li>
                <li><NavLink activeClassName="active_name" to="/categories">Categories</NavLink></li>
                { isLoggedIn && userStatus !== 'verified' &&
                    <li><NavLink activeClassName="active_name" to="/user-verification">Verify Account</NavLink></li>
                }
                <li><NavLink activeClassName="active_name" to="/submit-product">Submit Product</NavLink></li>
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