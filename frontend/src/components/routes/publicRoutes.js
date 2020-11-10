import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Home from '../pages/Home'
import Shop from '../pages/Shop'
import Login from '../pages/Login'
import UserVerification from '../pages/userVerification'

export const PublicRoutes = (props) => {
    const { isLoggedin, updateLoggedState } = props
    return (
        <BrowserRouter>
        <Switch>
            <Route path="/" exact component={() => <Home isLoggedIn = {isLoggedin} />}></Route>
            <Route path="/shop" component={() => <Shop isLoggedIn = {isLoggedin} />}></Route> 
            <Route path="/login" component={() => <Login isLoggedIn = {isLoggedin} users = { props.users } updateLoggedState = { updateLoggedState } />}></Route>
            { isLoggedin && 
                <Route path="/user-verification" component={() => <UserVerification isLoggedin= { isLoggedin } /> }></Route>
            }
        </Switch>
        </BrowserRouter>
    )
}