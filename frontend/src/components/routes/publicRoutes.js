import React, { useState, useEffect } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Home from '../pages/Home'
import Products from '../pages/products'
import Login from '../pages/Login'
import Myaccount from '../pages/Myaccount'
import UserVerification from '../pages/userVerification'
import ProductSubmit from '../pages/ProductSubmit'
import Signup from '../pages/Signup'
import Categories from '../pages/categories'
import SingleCategory from '../pages/single-page/singleCategory'
import SingleProduct from '../pages/single-page/singleProduct'
import Search from '../pages/search'

const axios = require('axios')

export const PublicRoutes = () => {
    const [userId, setUserId] = useState('')
    const [userStatus, setUserStatus] = useState('')

    useEffect(() => {
        axios.get( '/sessions.php' )
        .then(function(res) {
            if(res.data.login) {
                setUserId(res.data.userId)
            }
        })
    })

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
                <Route path="/" exact component={() => <Home/>}></Route>
                <Route path="/products" exact component={() => <Products/>}></Route>
                <Route path="/categories" exact component={() => <Categories/>}></Route>
                { userStatus !== 'verified' &&
                  <Route path="/user-verification" component={() => <UserVerification/> }></Route>
                }
                <Route path="/submit-product" component={() => <ProductSubmit/> }></Route>
                <Route path="/category/:id" exact component={(props) => <SingleCategory/>}></Route>
                <Route path="/myaccount" component={() => <Myaccount/>}></Route>
                <Route path="/login" component={() => <Login/>}></Route>
                <Route path="/signup" component={() => <Signup/>}></Route>
                <Route path="/product/:id" component={(props) => <SingleProduct/>}></Route>
                <Route path="/category/product/:id" component={(props) => <SingleProduct/>}></Route>
                <Route path="/search/product/:id" component={(props) => <SingleProduct/>}></Route>
                <Route path="/search/:search_key" exact component={(props) => <Search/>}></Route>
            </Switch>
        </BrowserRouter>
    )
}