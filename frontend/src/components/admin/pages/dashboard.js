import React, {} from 'react';
import AdminMainNavigation from '../navigation/AdminMainNavigation'

const AdminDashboard = (props) => {
    const { isLoggedIn } = props
    return (
        <div className="content-wrap">
            <AdminMainNavigation/>
            <div id="admin-right-content">

            </div>
        </div>
    );
}
 
export default AdminDashboard;