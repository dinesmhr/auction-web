import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Home from '../pages/Home'
import Product from '../pages/product'
import SingleProduct from '../pages/single-product'
import Login from '../pages/Login'
import UserVerification from '../pages/userVerification'
import { ProductSubmitForm } from '../pages/ProductSubmitForm'

export const PublicRoutes = (props) => {
    const { isLoggedin, updateLoggedState } = props
    return (
        <BrowserRouter>
        <Switch>
            <Route path="/" exact component={() => <Home isLoggedIn = {isLoggedin} />}></Route>
            <Route path="/products" exact component={() => <Product isLoggedIn = {isLoggedin} />}></Route> 
            <Route path="/login" component={() => <Login isLoggedIn = {isLoggedin} users = { props.users } updateLoggedState = { updateLoggedState } />}></Route>
            { isLoggedin && 
                <Route path="/user-verification" component={() => <UserVerification isLoggedin= { isLoggedin } /> }></Route>
            }
            <Route path="/user-submit-product" component={() => <ProductSubmitForm isLoggedin= { isLoggedin } /> }></Route>
            <Route path="/products/:id" component={(props) => <SingleProduct {...props} isLoggedin= { isLoggedin } />}></Route>
        </Switch>
        </BrowserRouter>
    )
}