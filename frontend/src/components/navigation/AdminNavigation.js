import React, { useState, useEffect, useContext } from 'react';
import { NavLink } from 'react-router-dom';
import {appContext} from '../../App'

const axios = require('axios')

const AdminNavigation = () => {
    const [userId, setUserId] = useState('')
    const [userRole, setUserRole] = useState()
    const { isLoggedIn } = useContext(appContext)

    useEffect(() => {
        axios.get( '/sessions.php' )
        .then(function(res) {
            if(res.data.login) {
                setUserId(res.data.userId)
            }
        })
    }, [isLoggedIn === true])

    useEffect(() => {
        userId &&
        axios.get( `/users.php?id=${userId}`)
        .then(function(res) {
            if(res.data.status) {
                setUserRole(res.data.data[0].role)
            }
        })
    }, [userId])

    if( !isLoggedIn || ( userRole !== 'administrator' ) ) {
        return false
    }

    return ( 
        <nav id="aweb-admin-front-navigation">
            <ul className="admin-front-nav-wrap">
                <li><NavLink to="/aweb-admin" target="_blank">View Dashboard</NavLink></li>
            </ul>
        </nav>
    );
}
 
export default AdminNavigation;