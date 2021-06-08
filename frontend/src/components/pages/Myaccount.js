import React, {useState} from "react";
import { Redirect } from 'react-router-dom'
import Header from '../header/Header'
import { confirmAlert } from 'react-confirm-alert'
import 'react-confirm-alert/src/react-confirm-alert.css'

const axios = require('axios');

const Myaccount = (props) => {
    const { isLoggedIn, updateLoggedInStatus } = props
    
    const triggerLogoutEvent = () => {
        axios.post( `/edit-table/edit-session.php`, {
            login: 'false',
        })
        .then(function(res) {
            updateLoggedInStatus();
        })
    }

    const handleLogout = () => {
        confirmAlert({
            message: 'Are you sure you want to logout?',
            buttons: [
              {
                label: 'Yes',
                onClick: () => triggerLogoutEvent()
              },
              {
                label: 'No'
              }
            ]
        });
    }
    
    if( !isLoggedIn ) {
        return <Redirect to="/login"/>
    }

    return (
        <>
            <Header isLoggedIn = { isLoggedIn }/>
            { `This is my account page` }
            <button className="logout-button" onClick = { (e) => handleLogout() }>Log out</button>
        </>
    )
}

export default Myaccount;