import React, { useState, useEffect } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import AdminDashboard from '../admin/pages/dashboard'
import AdminUsers from '../admin/pages/users'
import AdminProducts from '../admin/pages/products'
import AdminEditUser from '../admin/pages/editUsers'

export const AdminRoutes = (props) => {
    const { isLoggedin, users } = props
    const [ currentUserRole, setCurrentUserRole ] = useState('');
    const userId = localStorage.auctionWebSessionUserId

    useEffect(() => {
        users.map((user) => {
            if( user.id === userId ) {
                setCurrentUserRole( user.role )
            }
        })
    })
    
    if( currentUserRole ) {
        if( currentUserRole !== 'administrator' ) {
            return (
                <div className="aweb-admin">
                    { 'You are not allowed to access this page' }
                </div>
            )
        }
    }
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/aweb-admin" component={() => <AdminDashboard isLoggedIn = {isLoggedin} />}></Route>
                <Route path="/aweb-users" exact component={() => <AdminUsers users = {users} userLoggedIn = { isLoggedin } />}></Route>
                <Route path="/aweb-products" component={() => <AdminProducts />}></Route>
                <Route path="/aweb-users/:id" component={(props) => <AdminEditUser {...props}/>}></Route>
            </Switch>
        </BrowserRouter>
    )
}