import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Home from '../pages/Home'
import Product from '../pages/product'
import SingleProduct from '../pages/single-product'
import Login from '../pages/Login'
import Myaccount from '../pages/Myaccount'
import UserVerification from '../pages/userVerification'
import { ProductSubmitForm } from '../pages/ProductSubmitForm'
import Signup from '../pages/Signup'

export const PublicRoutes = (props) => {
    const { isLoggedIn, updateLoggedInStatus } = props
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={() => <Home isLoggedIn = { isLoggedIn }/>}></Route>
                <Route path="/products" exact component={() => <Product/>}></Route>
                <Route path="/user-verification" component={() => <UserVerification/> }></Route>
                <Route path="/user-submit-product" component={() => <ProductSubmitForm/> }></Route>
                <Route path="/products/:id" component={(props) => <SingleProduct/>}></Route>
                <Route path="/myaccount" component={() => <Myaccount isLoggedIn = { isLoggedIn } updateLoggedInStatus = { updateLoggedInStatus }/>}></Route>
                <Route path="/login" component={() => <Login isLoggedIn = { isLoggedIn } updateLoggedInStatus = { updateLoggedInStatus }/>}></Route>
                <Route path="/signup" component={() => <Signup isLoggedIn = { isLoggedIn }/>}></Route>
            </Switch>
        </BrowserRouter>
    )
}