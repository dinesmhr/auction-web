import React, { Component } from 'react'
import Header from '../header/Header';

const axios = require('axios');
const ENTER_KEY = 13;
class SingleProduct extends Component {
    constructor(props) {
        super(props)
        const { match: {params} } = props;
        this.state = {
            product: [],
            productStatus: '',
            initial_bid: 0,
            bid_value: 0,
            bidValueMessage: ''
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
                    productStatus: response.data.data[0].status,
                    initial_bid: response.data.data[0].initial_price
                })
            }
        })
    }

    handleBidValue(e) {
        this.setState({ bid_value: e.target.value })
    }

    handleKeyDown(e) {
        if (e.keyCode === ENTER_KEY) {
            if( e.target.value < this.state.initial_bid ) {
                this.setState({ bid_value: 0, bidValueMessage: 'Your bid amount must be higher than initial product amount' })
            } else {
                this.setState({ bid_value: e.target.value, bidValueMessage: '' })
            }
        }
    }

    render() {
        const { product, bid_value, bidValueMessage  } = this.state
        const { isLoggedin } = this.props
        return (
            <>
                <Header userLoggedIn = { isLoggedin }/>
                <div id="auction-web-single-product" className="page--single-product main-wrapper">
                    { 
                        product.map(( element, index ) => {
                            let imagesKeys = Object.keys(element.images)
                            return(
                                <div key={ index } >
                                    { element.name &&
                                        <div className="admin-single-product-field">
                                            <h2>{ element.name }</h2>
                                        </div>
                                    }
                                    { element.images &&
                                        <div className="admin-single-product-field">
                                            <img src={ element.images[0] } alt={""} />
                                        </div>
                                    }
                                    { element.description &&
                                        <div className="admin-single-user-field">
                                            <strong>Description :</strong> { element.description }
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
                                    <div className="aweb-single-product-bid-section">
                                        { element.initial_price &&
                                            <div className="admin-single-user-field">
                                                <strong>Initial Bid Amount :</strong> { element.initial_price }
                                            </div>
                                        }
                                        <div className="single-product-bid-field">
                                            { isLoggedin &&
                                                <>
                                                    <label>Place your bid</label>
                                                    <input type="text" name="product-bid" value={bid_value} onChange={(e)=> this.handleBidValue(e)} onKeyDown={(e) => this.handleKeyDown(e) }/>
                                                </>
                                            }
                                            { bidValueMessage &&
                                                <div className="aweb-alert-message aweb-red-note">
                                                    { bidValueMessage }
                                                </div>
                                            }
                                            { !isLoggedin &&
                                                "You must be logged in to participate in this bid"
                                            }
                                        </div>
                                    </div>
                                    { element.specification &&
                                        <div className="admin-single-user-field">
                                            <strong>Specifications :</strong> { element.specification }
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
                </div>
            </>
        )
    }
}
export default SingleProduct