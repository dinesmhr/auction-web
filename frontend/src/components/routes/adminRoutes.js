import React from 'react';
import { Route } from 'react-router-dom'
import AdminDashboard from '../admin/pages/dashboard'
import AdminUsers from '../admin/pages/users'
import AdminProducts from '../admin/pages/products'

export const AdminRoutes = (props) => {
    const { isLoggedin } = props
    const { users } = props
    return (
        <>
            <Route path="/aweb-admin" component={() => <AdminDashboard isLoggedIn = {isLoggedin} />}></Route>
            <Route path="/aweb-users" component={() => <AdminUsers users = {users} />}></Route>
            <Route path="/aweb-products" component={() => <AdminProducts />}></Route>
        </>
    )
}