import React, { useState, useEffect } from 'react';
import Header from '../header/Header'
import {ProductCard} from './cards/productCard'
import Footer from '../footer/Footer'
import { SearchCard } from './cards/searchCard'
import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";

const axios = require('axios');

const Products = () => {
    const [ products, setProducts ] = useState({})
    const [ paged, setPaged ] = useState(1)
    let pagedNumber, count = 0
    
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
            <SearchCard />
                <div id="auction-web-shop" className="page--shop main-wrapper h-full">
                    <div className="product-wrap max-w-6xl ml-8 ">                    	                                                  
                        { Array.isArray(products) &&
                            products.map((product, index) => {
                                if( ( product.status === 'available' ) || ( product.status === 'bid_success' ) ) {
                                    if( count > 8 ) {
                                        pagedNumber = 2
                                    } else if ( count > 17 ) {
                                        pagedNumber = 3
                                    } else if ( count > 27 ) {
                                        pagedNumber = 4
                                    } else if ( count > 37 ) {
                                        pagedNumber = 5
                                    } else {
                                        pagedNumber = 1
                                    }
                                    if( ( pagedNumber === paged ) ) {
                                        count++
                                        return( <div key={count}><ProductCard { ...product } /></div> )
                                    }
                                }
                            })
                        }
                    </div>






                    { products.length > 10 &&
                        <div className="text-center flex content-center">
                            { products.length > 10 &&
                                <AiOutlineArrowLeft/>
                            }
                            { products.length > 10 &&
                                <button className="bg-red p-2" onClick={() => setPaged(1)}>1</button>
                            }
                            { products.length > 10 &&
                                <button onClick={() => setPaged(2)}>2</button>
                            }
                            { products.length > 30 &&
                                <button onClick={() => setPaged(3)}>3</button>
                            }
                            { products.length > 40 &&
                                <button onClick={() => setPaged(4)}>4</button>
                            }
                            { products.length > 10 &&
                                <AiOutlineArrowRight/>
                            }
                        </div>
                    }
                </div>
            <Footer/>
        </div>
    );
}
export default Products;