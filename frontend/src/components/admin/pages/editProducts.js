import React, { Component } from 'react'
import AdminMainNavigation from '../navigation/AdminMainNavigation'

const axios = require('axios');

class AdminEditProduct extends Component {
    constructor(props) {
        super(props)
        const { match: {params} } = props;
        this.state = {
            product: [],
            productStatus: ''
        }
    }

    componentDidMount() {
        const { match: {params} } = this.props;
        let _this = this
        const url = 'http://localhost/auction-web/api/single-products.php'
        axios.get( url, {
            params: {
                id: params.id
            }
        })
        .then(function(response) {
            if( response.data.status === true ) {
                _this.setState({ 
                    product : response.data.data,
                    productStatus: response.data.data[0].status
                })
            }
        })
    }

    verifyProduct() {
        const { match: {params} } = this.props;
        let _this = this
        const url = 'http://localhost/auction-web/api/edit-table/update-product-status.php'
        axios.get( url, {
            params: {
                id: params.id,
                status: 'verified'
            }
        })
        .then(function(response) {
            if( response.data.status === true ) {
                _this.setState({
                    productStatus: 'verified'
                })
            }
        })
    }

    render() {
        const { product, productStatus } = this.state
        return (
            <>
                <header>           
                    <div className="aweb-admin-top-header">
                        <h1 className="aweb-admin-site-title">Auction Web</h1>
                        <AdminMainNavigation userLoggedIn = { this.props.userLoggedIn }/>
                    </div>
                </header>
                <div className="aweb-single-product-edit">
                    <form id="admin-edit-products-form">
                        { 
                            product.map(( element, index ) => {
                                return(
                                    <div key={ index } >
                                        { element.fullname &&
                                            <div className="admin-single-product-field">
                                                <strong>Name :</strong> 
                                                { element.name }
                                            </div>
                                        }
                                        { element.username &&
                                            <div className="admin-single-user-field">
                                                <strong>Username :</strong> { element.username }
                                            </div>   
                                        }
                                        { element.birth_date &&
                                            <div className="admin-single-user-field">
                                                <strong>Birth Date :</strong> { element.birth_date }
                                            </div>
                                        }
                                        { element.email &&
                                            <div className="admin-single-user-field">
                                                <strong>Email Address :</strong> { element.email }
                                            </div>
                                        }
                                        { element.parent_name &&
                                            <div className="admin-single-user-field">
                                                <strong>Guardian's Name :</strong> { element.parent_name }
                                            </div>
                                        }
                                        { element.profession &&
                                            <div className="admin-single-user-field">
                                                <strong>Profession :</strong> { element.profession }
                                            </div>
                                        }
                                        { element.contact_number &&
                                            <div className="admin-single-user-field">
                                                <strong>Contact Number :</strong> { element.contact_number }
                                            </div>
                                        }
                                        { element.current_address &&
                                            <div className="admin-single-user-field">
                                                <strong>Current Address :</strong> { element.current_address }
                                            </div>
                                        }
                                        { element.permanent_address &&
                                            <div className="admin-single-user-field">
                                                <strong>Permanent Address :</strong> { element.permanent_address }
                                            </div>
                                        }
                                        { element.document_type &&
                                            <div className="admin-single-user-field">
                                                <strong>Document Submitted :</strong> { element.document_type }
                                            </div>
                                        }
                                        { element.role &&
                                            <div className="admin-single-user-field">
                                                <strong>Role :</strong> { element.role }
                                            </div>
                                        }
                                        { element.pphoto &&
                                            <div className="admin-single-user-field">
                                                <strong>Personal Photo :</strong> <img src={ element.pphoto } />
                                            </div>
                                        }
                                        { element.document_image_one &&
                                            <div className="admin-single-user-field">
                                                <strong>Document Image One :</strong> <img src={ element.document_image_one } />
                                            </div>
                                        }
                                        { element.document_image_two &&
                                            <div className="admin-single-user-field">
                                                <strong>Document Image Two :</strong> <img src={ element.document_image_two } />
                                            </div>
                                        }
                                    </div>
                                )
                            })
                        }
                    </form>
                    { ( userStatus === 'under-verification' ) &&
                            <button onClick = { (e) => this.verifyUser() }>Verify the user</button>
                    }
                    { ( userStatus === 'not-verified' ) &&
                            <button>Document not available for verification</button>
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
export default AdminEditProduct