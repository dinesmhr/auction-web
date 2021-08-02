import React, { useState, useEffect } from 'react';
import Header from '../header/Header'
import {ProductCard} from './cards/productCard'
import Footer from '../footer/Footer'

const axios = require('axios');

const Products = () => {
    const [ products, setProducts ] = useState({})

    useEffect(() => {
        axios.get( '/products.php' )
        .then(function(response) {
            if( response.data.status === true ) {
                setProducts(response.data.data)
            }
        })
    }, [])
    
    if( !Array.isArray(products) ) {
        return (
            <div id="auction-web">
                <Header/>
                <div id="auction-web-shop" className="page--shop main-wrapper">
                    No products to display
                </div>
            </div>
        )
    }

    return ( 
        <div id="auction-web">
            <Header/>
                <div id="auction-web-shop" className="page--shop main-wrapper h-full">
                    <div className="product-wrap max-w-6xl ml-8 ">                    	                                                  
                        { Array.isArray(products) &&
                            products.map((product, index) => {
                                return( <ProductCard key={index} { ...product } /> )
                            })
                        }
                    </div>
                </div>
            <Footer/>
        </div>
    );
}
export default Products;