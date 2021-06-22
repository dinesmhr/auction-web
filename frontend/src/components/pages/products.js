import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'
import Header from '../header/Header';

const axios = require('axios');
const isImageUrl = require('is-image-url');

const Card=(product)=>{
    const { id, title, initial_bid, images_path } = product
    let featureImage
    if(!isImageUrl(images_path[0])) {
        featureImage = `http://localhost/auction-web/${images_path[0].split('../').pop()}`
    } else {
        featureImage = images_path[0]
    }
    return(
        <>
            <div className="product-card">
                <img src={`${featureImage}`} alt={title}/>
                <div className="product-box">
                    <h3 title={title}>
                        <a href={ `product/${id}` }>{title}</a>
                    </h3>
                    <div className="bid-amount">
                        {`${initial_bid}USD`}
                    </div>
                    <Link to={ `product/${id}` }>
                        Bid Now
                    </Link>
                </div>
            </div>
        </>
    );
}

const Products = (props) => {
    const [ products, setProducts ] = useState({})
    const { isLoggedIn } = props

    useEffect(() => {
        axios.get( '/products.php' )
        .then(function(response) {
            if( response.data.status === true ) {
                setProducts(response.data.data)
            }
        })
    })
    
    if( !Array.isArray(products) ) {
        return (
            <div id="auction-web">
                <Header isLoggedIn = { isLoggedIn }/>
                <div id="auction-web-shop" className="page--shop main-wrapper">
                    No products to display
                </div>
            </div>
        )
    }

    return ( 
        <div id="auction-web">
            <Header isLoggedIn = { isLoggedIn }/>
            <div id="auction-web-shop" className="page--shop main-wrapper">
                <div className="product-wrap">                    	                                                  
                    { Array.isArray(products) &&
                        products.map((product, index) => {
                            return( <Card key={index} { ...product } /> )
                        })
                    }
                </div>
            </div>
        </div>
    );
}
export default Products;