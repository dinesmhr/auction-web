import React, { Component } from 'react';
import Header from '../header/Header';
const axios = require('axios');

const Card=(product)=>{
    const { id, name, images } = product
    return(
        <>
            <div className="product-card">
                <img src={images[0]} alt={name}/>
                <div className="product-box">
                    <h3 title="watch">
                        <a href={ `products/${id}` }>{name}</a>
                    </h3>
                    <p>Description</p>
                    <h4>Nrs 2000</h4>
                    <button><a href={ `products/${id}` }>View Item</a></button>
                </div>
            </div>
        </>
    );
}

class Product extends Component {
    constructor(props) {
        super(props);
        this.state = {
            products: []
        }
    }

    componentDidMount() {
        let _this = this
        const url = 'http://localhost/auction-web/api/products.php'
        axios.get( url )
        .then(function(response) {
            if( response.data.status === true ) {
                _this.setState({ products: response.data.data })
            }
        })
    }

    render() {      
        const { isLoggedIn } = this.props
        const { products } = this.state
        return ( 
            <>
            <Header userLoggedIn = { isLoggedIn }/>
            <div id="auction-web-shop" className="page--shop main-wrapper">
           	    <div className="product-wrap">                    	                                                  
                   {
                       products.map((product, index) => {
                            return( <Card key={index} { ...product } /> )
                       })
                   }
            	</div>
            </div>
           </>
        );
    }
}
export default Product;
