import React, { Component } from 'react'
import AdminMainNavigation from '../navigation/AdminMainNavigation'

const axios = require('axios');

class AdminEditUser extends Component {
    constructor(props) {
        super(props)
        this.state = {
            user: []
        }
    }

    componentDidMount() {
        const { match: {params} } = this.props;
        let _this = this
        const url = 'http://localhost/auction-web/api/users.php'
        axios.get( url, {
            params: {
                id: params.id
            }
        })
        .then(function(response) {
            if( response.status === 200 ) {
                _this.setState({ 
                  user : response.data.data
                })
            }
        })
    }

    render() {
        const { user } = this.state
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
                                    
                                    <h2 className="user-fullname">
                                        { element.fullname }
                                    </h2>
                                </div>
                            )
                        })
                    }
                </div>
            </>
        )
    }
}
export default AdminEditUser