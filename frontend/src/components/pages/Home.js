import React, { useState, useEffect } from 'react';
import Header from '../header/Header'
import Footer from '../footer/Footer'
import { SearchCard } from './cards/searchCard'
import { TopCategoryCard } from './cards/topCategoryCard'

const axios = require('axios')

const Home = () => {
    const [ topCategories, setTopCategories ] = useState({})

    useEffect(() => {
        let isMounted = true;
        async function fetchData() {
            let results = await axios.get( `/filter-product-meta.php` )
            if (isMounted) setTopCategories(results.data.data)
        }
        fetchData()
        return () => { isMounted = false };
    }, [])

    return ( 
        <div id="auction-web">
            <Header/>
                <div id="auction-web-home" className="page--home main-wrapper h-full mb-16">
                    <SearchCard />
                    <div className= "home-banner">
                        <img src="/assets/auction.jpg"/>
                    </div>
                    <div>
                        <h2 className="text-center text-2xl font-medium pt-6 mb-6 mt-12">Top Categories</h2>
                        <div className="flex flex-wrap ml-16 mt-10">
                            { Array.isArray(topCategories) &&
                                topCategories.map((topCategory) => {
                                    return (<div className= "mr-8 text-center ">
                                        <TopCategoryCard {...topCategory}/>
                                        </div>)
                                    
                                })
                            }
                        </div>
                    </div>
                </div>
            <Footer/>
        </div>
    );
}

export default Home;