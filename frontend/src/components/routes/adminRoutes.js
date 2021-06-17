import React, { useState, useEffect } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import AdminDashboard from '../admin/pages/dashboard'
import AdminUsers from '../admin/pages/users'
import AdminProducts from '../admin/pages/products'
import AdminProductCategories from '../admin/pages/product-categories'
import AdminProductTags from '../admin/pages/product-tags'

import AdminEditUser from '../admin/pages/edit-page/editUsers'
import AdminEditProduct from '../admin/pages/edit-page/editProducts'

const axios = require('axios')

export const AdminRoutes = (props) => {
    const [userId, setUserId] = useState('')
    const [userRole, setUserRole] = useState('')
    const { isLoggedIn } = props

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
        <BrowserRouter>
            <Switch>
                <Route path="/aweb-admin" component={() => <AdminDashboard/>}></Route>
                <Route path="/aweb-users" exact component={() => <AdminUsers/>}></Route>
                <Route path="/aweb-products" exact component={() => <AdminProducts/>}></Route>
                <Route path="/aweb-categories" exact component={() => <AdminProductCategories/>}></Route>
                <Route path="/aweb-tags" exact component={() => <AdminProductTags/>}></Route>
                { 
                    // Single root
                }
                <Route path="/aweb-users/:id" component={(props) => <AdminEditUser/>}></Route>
                <Route path="/aweb-products/:id" component={(props) => <AdminEditProduct/>}></Route>
            </Switch>
        </BrowserRouter>
    )
}