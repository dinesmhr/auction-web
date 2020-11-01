import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Home from '../pages/Home'
import Shop from '../pages/Shop'
import Login from '../pages/Login'

export const PublicRoutes = (props) => {
    const { isLoggedin } = props
      
    return (
        <BrowserRouter>
        <Switch>
            <Route path="/" exact component={() => <Home isLoggedIn = {isLoggedin} />}></Route>
            <Route path="/shop" component={() => <Shop isLoggedIn = {isLoggedin} />}></Route> 
            <Route path="/login" component={() => <Login updateLoggedState={ updateLoggedState() } isLoggedIn = {isLoggedin} />}></Route>
        </Switch>
        </BrowserRouter>
    )
}

const updateLoggedState = () => {
    let userLoggedin = false
    if( sessionStorage.auctionWebSessionUserLogged === 'true' ) {
      userLoggedin = true
    } else {
      userLoggedin = false
    }
  }