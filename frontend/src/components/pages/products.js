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
    }, [paged])
    
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
                    <div className="product-wrap max-w-8xl ml-8">                    	                                                  
                        { Array.isArray(products) &&
                            products.map((product, index) => {
                                if( ( product.status === 'available' ) || ( product.status === 'bid_success' ) ) {
                                    if( count > 7 ) {
                                        pagedNumber = 2
                                    } else if ( count > 15 ) {
                                        pagedNumber = 3
                                    } else if ( count > 21 ) {
                                        pagedNumber = 4
                                    } else if ( count > 28 ) {
                                        pagedNumber = 5
                                    } else {
                                        pagedNumber = 1
                                    }
                                    count++
                                    return( <div class={`product-${count}`} key={count} style={{display: ( pagedNumber === paged ) ? '' : 'none' }}><ProductCard { ...product } /></div> )
                                }
                            })
                        }
                    </div>
                    { count > 7 &&
                        <div>
                            { products.length > 7 &&
                                <AiOutlineArrowLeft/>
                            }
                            { products.length > 7 &&
                                <button onClick={() => setPaged(1)} disabled={paged != 1 ? false : true}>1</button>
                            }
                            { products.length > 15 &&
                                <button onClick={() => setPaged(2)} disabled={paged != 2 ? false : true}>2</button>
                            }
                            { products.length > 21 &&
                                <button onClick={() => setPaged(3)} disabled={paged != 3 ? false : true}>3</button>
                            }
                            { products.length > 28 &&
                                <button onClick={() => setPaged(4)} disabled={paged != 4 ? false : true}>4</button>
                            }
                            { products.length > 7 &&
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