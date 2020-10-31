import React from 'react';
import { Route } from 'react-router-dom'
import Home from '../pages/Home'
import Shop from '../pages/Shop'
import Login from '../pages/Login'

export const PublicRoutes = (props) => {
    const { isLoggedin } = props
    
    return (
        <>
            <Route path="/" exact component={() => <Home isLoggedIn = {isLoggedin} />}></Route>
            <Route path="/shop" component={() => <Shop isLoggedIn = {isLoggedin} />}></Route> 
            <Route path="/login" component={() => <Login updateLoggedState={ this.updateLoggedState.bind(this) } isLoggedIn = {isLoggedin} />}></Route>
        </>
    )
}