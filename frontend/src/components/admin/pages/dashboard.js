import React, {} from 'react';
import AdminMainNavigation from '../navigation/AdminMainNavigation'

const AdminDashboard = (props) => {
    const { isLoggedIn } = props
    return (
        <header>
            <div className="content-wrap">
                <AdminMainNavigation/>
                <div id="admin-right-content" className="float-right w-4/5 text-white p-8 h-screen mt-12">

                </div>
            </div>
        </header>
    );
}
 
export default AdminDashboard;