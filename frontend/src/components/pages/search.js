import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'
import Header from '../header/Header';
import {ProductCard} from './cards/productCard'
import Footer from '../footer/Footer'
import { SearchCard } from './cards/searchCard'

const axios = require('axios');

const Search = () => {
    const [ products, setProducts ] = useState({})
    const [ error, setError ] = useState(false)
    const [ errorMessage, setErrorMessage ] = useState('')
    const { search_key } = useParams()

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
                <div id="auction-web-shop" className="page--shop main-wrapper searchResult h-full mb-48">
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
                        { Array.isArray(products) && (!error) && 
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
export default Search;