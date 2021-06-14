import React, {} from 'react';
import AdminMainNavigation from '../navigation/AdminMainNavigation'

const AdminDashboard = (props) => {
    const { isLoggedIn } = props
    return (
        <header>
            <div className="aweb-admin-top-header">
                <h1 className="aweb-admin-site-title"><a href="/" target="_blank">Auction Web</a></h1>
                <AdminMainNavigation isLoggedIn={ isLoggedIn }/>
            </div>
        </header>
    );
}
 
export default AdminDashboard;