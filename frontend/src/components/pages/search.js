import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'
import Header from '../header/Header';
import {ProductCard} from './cards/productCard'
import Footer from '../footer/Footer'
import { SearchCard } from './cards/searchCard'
import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";

const axios = require('axios');

const Search = () => {
    const [ products, setProducts ] = useState({})
    const [ error, setError ] = useState(false)
    const [ errorMessage, setErrorMessage ] = useState('')
    const { search_key } = useParams()
        const [ paged, setPaged ] = useState(1)
    let pagedNumber, count = 0

    useEffect(() => {
        let url = `/products-search.php`
        if(search_key) {
            url = `/products-search.php?products=products&search_key=${search_key}`
        }
            axios.get( url )
            .then(function(response) {
                if( response.data.status === true ) {
                    setProducts(response.data.data)
                } else {
                    setError(true)
                    setErrorMessage( `No Products Found with key ${search_key}` )
                }
            })
    }, [])

    return ( 
        <div id="auction-web">
            <Header/>
                <div id="auction-web-shop" className="page--shop main-wrapper searchResult h-full w-9/12 ">
                    <h2 className="ml-10 mt-10 text-xl">Search Results</h2>
                     <SearchCard />
                    <div className="product-wrap">
                        { (!error) && (!products) &&
                            <div>{ `Loading` }</div>   
                        }
                        { error &&
                            <>
                                <div>{ errorMessage }</div>
                            </>
                        }
                        
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
                        <div className="text-center flex ml-12 mb-6 mt-10">
                            { products.length > 7 &&
                                <AiOutlineArrowLeft className="text-lg mt-2"/>
                            }
                            { products.length > 7 &&
                                <button className="bg-white border-gray-300 text-gray-500 hover:bg-gray-50 relative inline-flex items-center px-4 py-2 border text-sm font-medium" onClick={() => setPaged(1)} disabled={paged != 1 ? false : true}>1</button>
                            }
                            { products.length > 15 &&
                                <button className="bg-white border-gray-300 text-gray-500 hover:bg-gray-50 relative inline-flex items-center px-4 py-2 border text-sm font-medium" onClick={() => setPaged(2)} disabled={paged != 2 ? false : true}>2</button>
                            }
                            { products.length > 21 &&
                                <button className="bg-white border-gray-300 text-gray-500 hover:bg-gray-50 relative inline-flex items-center px-4 py-2 border text-sm font-medium" onClick={() => setPaged(3)} disabled={paged != 3 ? false : true}>3</button>
                            }
                            { products.length > 28 &&
                                <button className="bg-white border-gray-300 text-gray-500 hover:bg-gray-50 relative inline-flex items-center px-4 py-2 border text-sm font-medium" onClick={() => setPaged(4)} disabled={paged != 4 ? false : true}>4</button>
                            }
                            { products.length > 7 &&
                                <AiOutlineArrowRight className="text-lg mt-2"/>
                            }
                        </div>
                    }




                    
                </div>
            <Footer/>
        </div>
    );
}
export default Search;