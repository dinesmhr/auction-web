import React, { Component } from 'react';
import AdminMainNavigation from '../navigation/AdminMainNavigation'

class AdminUsers extends Component {
    render() { 
        return (         	
            <header>           
                <div className="aweb-admin-top-header">
                    <h1 className="aweb-admin-site-title">Auction Web</h1>
                    <AdminMainNavigation userLoggedIn = {this.props.userLoggedIn}/>
                </div>
            </header>
        );
    }
}
 
export default AdminUsers;