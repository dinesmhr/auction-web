import React, { Component } from 'react'
import AdminMainNavigation from '../navigation/AdminMainNavigation'

const axios = require('axios');

class AdminEditUser extends Component {
    constructor(props) {
        super(props)
        const { match: {params} } = props;
        this.state = {
            user: [],
            userStatus: ''
        }
    }

    componentDidMount() {
        const { match: {params} } = this.props;
        let _this = this
        const url = 'http://localhost/auction-web/api/single-users.php'
        axios.get( url, {
            params: {
                id: params.id
            }
        })
        .then(function(response) {
            if( response.data.status === true ) {
                _this.setState({ 
                  user : response.data.data,
                  userStatus: response.data.data[0].status
                })
            }
        })
    }

    verifyUser() {
        const { match: {params} } = this.props;
        let _this = this
        const url = 'http://localhost/auction-web/api/edit-table/update-user-status.php'
        axios.get( url, {
            params: {
                id: params.id,
                status: 'verified'
            }
        })
        .then(function(response) {
            if( response.data.status === true ) {
                _this.setState({
                    userStatus: 'verified'
                })
            }
        })
    }

    render() {
        const { user, userStatus } = this.state
        return (
            <>
                <header>           
                    <div className="aweb-admin-top-header">
                        <h1 className="aweb-admin-site-title">Auction Web</h1>
                        <AdminMainNavigation userLoggedIn = { this.props.userLoggedIn }/>
                    </div>
                </header>
                <div className="aweb-single-user-edit">
                    { 
                        user.map(( element, index ) => {
                            return(
                                <div key={ index } >
                                    
                                    <div className="admin-single-user-field">
                                        <strong>Fullname :</strong> { element.fullname }
                                    </div>
                                    <div className="admin-single-user-field">
                                        <strong>Username :</strong> { element.username }
                                    </div>
                                    <div className="admin-single-user-field">
                                        <strong>Birth Date :</strong> { element.birth_date }
                                    </div>
                                    <div className="admin-single-user-field">
                                        <strong>Email Address :</strong> { element.email }
                                    </div>
                                    <div className="admin-single-user-field">
                                        <strong>Profession :</strong> { element.profession }
                                    </div>
                                    <div className="admin-single-user-field">
                                        <strong>Contact Number :</strong> { element.contact_number }
                                    </div>
                                    <div className="admin-single-user-field">
                                        <strong>Current Address :</strong> { element.current_address }
                                    </div>
                                    <div className="admin-single-user-field">
                                        <strong>Permanent Address :</strong> { element.permanent_address }
                                    </div>
                                </div>
                            )
                        })
                    }
                    { ( userStatus === 'under-verification' ) &&
                            <button onClick = { (e) => this.verifyUser() }>Verify the user</button>
                    }
                    { ( userStatus === 'not-verified' ) &&
                            <button>Not submitted document for verification</button>
                    }
                    { ( userStatus === 'verified' ) &&
                            <button>Verified User</button>
                    }
                    <button>Delete the User</button>
                </div>
            </>
        )
    }
}
export default AdminEditUser