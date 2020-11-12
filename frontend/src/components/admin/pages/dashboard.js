import React, { Component } from 'react';
import AdminMainNavigation from '../navigation/AdminMainNavigation'

class AdminDashboard extends Component {
    render() { 
        return (         	
            <header>
                <div className="aweb-admin-top-header">
                    <h1 className="aweb-admin-site-title"><a href="/" target="_blank">Auction Web</a></h1>
                    <AdminMainNavigation userLoggedIn = { this.props.userLoggedIn }/>
                </div>
            </header>
        );
    }
}
 
export default AdminDashboard;