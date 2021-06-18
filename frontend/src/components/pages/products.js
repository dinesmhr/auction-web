import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'
import Header from '../header/Header';
const axios = require('axios');

const Card=(product)=>{
    const { id, title, initial_bid, images_path } = product
    const featureImage = `http://localhost/auction-web/${images_path[0].split('../').pop()}`
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
                    <Link to={ `product/${id}` }
                    >
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
            <>
                <Header isLoggedIn = { isLoggedIn }/>
                <div id="auction-web-shop" className="page--shop main-wrapper">
                    No products to display
                </div>
            </>
        )
    }

    return ( 
        <>
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
        </>
    );
}
export default Products;