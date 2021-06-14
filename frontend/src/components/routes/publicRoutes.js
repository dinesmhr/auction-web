import React, { useState, useEffect } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Home from '../pages/Home'
import Products from '../pages/products'
import SingleProduct from '../pages/single-product'
import Login from '../pages/Login'
import Myaccount from '../pages/Myaccount'
import UserVerification from '../pages/userVerification'
import ProductSubmit from '../pages/ProductSubmit'
import Signup from '../pages/Signup'

const axios = require('axios')

export const PublicRoutes = (props) => {
    const [userId, setUserId] = useState('')
    const [userStatus, setUserStatus] = useState('')
    const { isLoggedIn, updateLoggedInStatus } = props

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
            if(res.data.status) {
                setUserStatus(res.data.data[0].status)
            }
        })
    }, [userId])
    
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={() => <Home isLoggedIn = { isLoggedIn }/>}></Route>
                <Route path="/products" exact component={() => <Products isLoggedIn = { isLoggedIn }/>}></Route>
                { userStatus !== 'verified' &&
                  <Route path="/user-verification" component={() => <UserVerification/> }></Route>
                }
                <Route path="/submit-product" component={() => <ProductSubmit isLoggedIn = { isLoggedIn } /> }></Route>
                <Route path="/products/:id" component={(props) => <SingleProduct/>}></Route>
                <Route path="/myaccount" component={() => <Myaccount isLoggedIn = { isLoggedIn } updateLoggedInStatus = { updateLoggedInStatus }/>}></Route>
                <Route path="/login" component={() => <Login isLoggedIn = { isLoggedIn } updateLoggedInStatus = { updateLoggedInStatus }/>}></Route>
                <Route path="/signup" component={() => <Signup isLoggedIn = { isLoggedIn }/>}></Route>
            </Switch>
        </BrowserRouter>
    )
}