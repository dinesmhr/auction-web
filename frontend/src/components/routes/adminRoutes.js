import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import AdminDashboard from '../admin/pages/dashboard'
import AdminUsers from '../admin/pages/users'
import AdminProducts from '../admin/pages/products'
import AdminEditUser from '../admin/pages/editUsers'
export const AdminRoutes = (props) => {
    const { isLoggedin } = props
    const { users } = props
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/aweb-admin" component={() => <AdminDashboard isLoggedIn = {isLoggedin} />}></Route>
                <Route path="/aweb-users" exact component={() => <AdminUsers users = {users} userLoggedIn = { isLoggedin } />}></Route>
                <Route path="/aweb-products" component={() => <AdminProducts />}></Route>
                <Route path="/aweb-users/:id" component={(props) => <AdminEditUser { ...props }/>}></Route>
            </Switch>
        </BrowserRouter>
    )
}