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
import SingleTag from '../pages/single-page/singleTag'
import SingleProduct from '../pages/single-page/singleProduct'
import Search from '../pages/search'
import WhySell from '../pages/extras/whySell'
import BecomeSeller from '../pages/extras/becomeSeller'
import GetHelp from '../pages/extras/getHelp'
import About from '../pages/extras/about'
import AuctionCentralNews from '../pages/extras/auctionCentralNews'
import Careers from '../pages/extras/careers'
import SendFeedback from '../pages/extras/sendFeedback'
import SellerResourceCenter from '../pages/extras/sellerResourceCenter'
import SellerReview from '../pages/extras/sellerReview'

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
                <Route path="/category/:id" exact component={() => <SingleCategory/>}></Route>
                <Route path="/tag/:id" exact component={() => <SingleTag/>}></Route>
                <Route path="/myaccount" component={() => <Myaccount/>}></Route>
                <Route path="/login" component={() => <Login/>}></Route>
                <Route path="/signup" component={() => <Signup/>}></Route>
                <Route path="/product/:id" component={() => <SingleProduct/>}></Route>
                <Route path="/category/product/:id" component={() => <SingleProduct/>}></Route>
                <Route path="/search/product/:id" component={() => <SingleProduct/>}></Route>
                <Route path="/search/:search_key" exact component={() => <Search/>}></Route>
                <Route path="/search/" exact component={() => <Search/>}></Route>
                { /*Extras*/ }
                <Route path="/why-sell/" exact component={() => <WhySell/>}></Route>
                <Route path="/become-seller/" exact component={() => <BecomeSeller/>}></Route>
                <Route path="/get-help/" exact component={() => <GetHelp/>}></Route>
                <Route path="/about/" exact component={() => <About/>}></Route>
                <Route path="/auction-central-news/" exact component={() => <AuctionCentralNews/>}></Route>
                <Route path="/careers/" exact component={() => <Careers/>}></Route>
                <Route path="/send-feedback/" exact component={() => <SendFeedback/>}></Route> 
                <Route path="/login" exact component={() => <Login/>}></Route> 
                <Route path="/resource-center/" exact component={() => <SellerResourceCenter/>}></Route> 
                <Route path="/seller-review/" exact component={() => <SellerReview/>}></Route>              

            </Switch>
        </BrowserRouter>
    )
}