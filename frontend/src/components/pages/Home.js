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
                        <div className="flex flex-wrap ml-16 mt-10 w-3/4 text-gray-700">
                            { Array.isArray(feedbacks) &&
                                feedbacks.map((feedback, index) => {
                                    return (
                                        <div class="container bg-gray-100 mx-auto w-full h-full">
                                            <div class="relative wrap overflow-hidden p-10 h-full">
                                                <div id ="feedback-line" class="feedback-line border-2-2 absolute border-opacity-20 border-gray-700 h-full border " styles="left: 50%"></div>
                                                    <div class="mb-8 flex justify-between items-center w-full right-timeline">
                                                        <div class="order-1 w-5/12"></div>
                                                        <div class="z-20 flex items-center order-1 bg-gray-800 shadow-xl w-8 h-8 rounded-full">
                                                            <h1 class="mx-auto font-semibold text-lg text-white">{index+(index+1)}</h1>
                                                        </div>
                                                        <div class="order-1 bg-gray-400 rounded-lg shadow-xl w-5/12 px-6 py-4">
                                                            <h3 class="mb-3 font-bold text-gray-800 text-xl">Lorem Ipsum</h3>
                                                            <p class="text-sm leading-snug tracking-wide text-gray-900 text-opacity-100">
                                                                <div>
                                                                    <FeedbackCard {...feedback}/>
                                                                </div>
                                                            </p>
                                                        </div>
                                                    </div>
                                                    <div class="mb-8 flex justify-between flex-row-reverse items-center w-full left-timeline">
                                                        <div class="order-1 w-5/12"></div>
                                                        <div class="z-20 flex items-center order-1 bg-gray-800 shadow-xl w-8 h-8 rounded-full">
                                                            <h1 class="mx-auto text-white font-semibold text-lg">{index+(index+2)}</h1>
                                                        </div>
                                                        <div class="order-1 bg-red-400 rounded-lg shadow-xl w-5/12 px-6 py-4">
                                                            <h3 class="mb-3 font-bold text-white text-xl">Lorem Ipsum</h3>
                                                            <p class="text-sm font-medium leading-snug tracking-wide text-white text-opacity-100">
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