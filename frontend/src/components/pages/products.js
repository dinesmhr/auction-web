import React, { useState, useEffect, useContext } from 'react';
import Header from '../header/Header';
import {appContext} from '../../App'
import {ProductCard} from './cards/productCard'

const axios = require('axios');

const Products = () => {
    const [ products, setProducts ] = useState({})
    const { isLoggedIn } = useContext(appContext)

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
                            return( <ProductCard key={index} { ...product } /> )
                        })
                    }
                </div>
            </div>
        </div>
    );
}
export default Products;