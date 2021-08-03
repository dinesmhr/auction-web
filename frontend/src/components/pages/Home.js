import React, { useState, useEffect } from 'react';
import Header from '../header/Header'
import Footer from '../footer/Footer'
import { SearchCard } from './cards/searchCard'
import { TopCategoryCard } from './cards/topCategoryCard'
import { FeedbackCard } from './cards/feedbackCard'

const axios = require('axios')

const Home = () => {
    const [ topCategories, setTopCategories ] = useState({})
    const [ feedbacks, setFeedbacks ] = useState({})

    useEffect(() => {
        let isMounted = true;
        async function fetchData() {
            let results = await axios.get( `/filter-product-meta.php` )
            if (isMounted) setTopCategories(results.data.data)
        }
        fetchData()
        return () => { isMounted = false };
    }, [])

    useEffect(() => {
        let isMounted = true;
        async function fetchData() {
            let results = await axios.get( `/feedbacks.php?count=4` )
            if (isMounted) setFeedbacks(results.data.data)
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
                        <h2 className="ml-16 text-2xl font-medium pt-6 mb-6 mt-12">Top Categories</h2>
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

                    <div>
                        <h2 className="ml-16 text-2xl font-medium pt-6 mb-6 mt-12">Recent Feedbacks</h2>
                        <div className="flex flex-wrap ml-14 mt-10 w-3/4 text-gray-700">
                            { Array.isArray(feedbacks) &&
                                feedbacks.map((feedback, index) => {
                                    return (
                                        <div class="container  mx-auto w-full h-full">
                                            <div class="relative wrap overflow-hidden p-4 h-full">
                                                
                                                    <div class="mb-8 items-center w-full ">
                                                        <div class="order-1 w-5/12"></div>
                                                        <div class="z-20 flex items-center order-1 bg-gray-900 shadow-sm w-8 h-8 rounded-full">
                                                            <h1 class="mx-auto font-semibold text-lg text-white bg-gray-900">{index+(+1)}</h1>
                                                        </div>
                                                        <div class="order-1 dwc bg-gray-400 rounded-lg shadow-sm float-left  px-6 py-6">
                                                            <h3 class="mb-3 font-bold text-gray-800 text-xl">Lorem Ipsum</h3>
                                                            <p class="text-sm leading-snug tracking-wide text-gray-900 text-opacity-100">
                                                                <div>
                                                                    <FeedbackCard {...feedback}/>
                                                                </div>
                                                            </p>
                                                        </div>
                                                    </div>

                                            </div>
                                        </div>
                                    )
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