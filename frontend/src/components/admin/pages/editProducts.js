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
                product_id: params.id,
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
                                let imagesKeys = Object.keys(element.images)
                                return(
                                    <div key={ index } >
                                        { element.name &&
                                            <div className="admin-single-product-field">
                                                <strong>Name :</strong> 
                                                { element.name }
                                            </div>
                                        }
                                        { element.description &&
                                            <div className="admin-single-user-field">
                                                <strong>Description :</strong> { element.description }
                                            </div>   
                                        }
                                        { element.specification &&
                                            <div className="admin-single-user-field">
                                                <strong>Specification :</strong> { element.specification }
                                            </div>
                                        }
                                        { element.email &&
                                            <div className="admin-single-user-field">
                                                <strong>Seller's Email Address :</strong> { element.email }
                                            </div>
                                        }
                                        { element.contact_number &&
                                            <div className="admin-single-user-field">
                                                <strong>Seller's Contact Number :</strong> { element.contact_number }
                                            </div>
                                        }
                                        { element.bid_deadline &&
                                            <div className="admin-single-user-field">
                                                <strong>Bid Deadline :</strong> { element.bid_deadline }
                                            </div>
                                        }
                                        { element.initial_price &&
                                            <div className="admin-single-user-field">
                                                <strong>Initial Bid Amount :</strong> { element.initial_price }
                                            </div>
                                        }
                                        { element.images &&
                                            <div className="admin-single-user-field">
                                                <strong>Product Feature images :</strong>
                                                { 
                                                    imagesKeys.map(( image ) => {                                                        
                                                        return ( <img key={ image } src={element.images[image]} alt="No Image" /> )
                                                    })
                                                }
                                            </div>
                                        }
                                    </div>
                                )
                            })
                        }
                    </form>
                    { ( productStatus === 'under-verification' ) &&
                            <button onClick = { (e) => this.verifyProduct() }>Verify the Product</button>
                    }
                    { ( productStatus === 'not-verified' ) &&
                            <button>Document not available for verification</button>
                    }
                    { ( productStatus === 'verified' ) &&
                            <button>Verified Product</button>
                    }
                    <button>Remove the Product</button>
                </div>
            </>
        )
    }
}
export default AdminEditProduct