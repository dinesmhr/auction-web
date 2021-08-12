import React, { useState, useEffect, useContext } from 'react';
import Header from '../header/Header'
import Footer from '../footer/Footer'
import { SearchCard } from './cards/searchCard'
import { TopCategoryCard } from './cards/topCategoryCard'
import { FeedbackCard } from './cards/feedbackCard'
import {appContext} from '../../App'
import {ProductCard} from './cards/productCard'

const axios = require('axios')

const HomeProductCard = (prop) => {
    const [ product, setProduct ] = useState()
    useEffect(() =>{
        axios.get( `/products.php?id=${prop[0]}` )
        .then((res) => {
            if( res.data.status ) {
                setProduct(res.data.data[0])
            }
        })
    }, [prop[0]]);

    return (
        <>
            { !product &&
                `Loading`
            }
            { product &&
                <ProductCard {...product}/>
            }
        </>
    )
}
const Home = () => {
    const [ topCategories, setTopCategories ] = useState({})
    const [ feedbacks, setFeedbacks ] = useState({})
    const [ userCache, setUserCache ] = useState()

    const { isLoggedIn } = useContext(appContext)

    useEffect(() => {
        if( isLoggedIn ) {
            axios.get( `/sessions.php` )
            .then((res) => {
                axios.get( `/edit-table/edit-cache.php?id=${res.data.userId}` )
                .then((res)=>{
                    if( res.data.status ) {
                        setUserCache( res.data.data )
                    }
                })
            })
        }
    }, [isLoggedIn])

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
                    { userCache &&
                        <div>
                            <h2 className="ml-16 text-2xl font-medium pt-6 mb-6 mt-12">Previously You Viewed</h2>
                            { userCache &&
                                userCache.map(( productId, key ) => {
                                    return(
                                        <HomeProductCard key={key} {...productId}/>
                                    )
                                })
                            }
                        </div>
                    }
                    <div>
                        <h2 className="ml-16 text-2xl font-medium pt-6 mb-6 mt-12">Top Categories</h2>
                        <div className="flex flex-wrap ml-16 mt-10">
                            { Array.isArray(topCategories) &&
                                topCategories.map((topCategory, key) => {
                                    return (
                                        <div className="mr-8 text-center" key={key}>
                                            <TopCategoryCard {...topCategory}/>
                                        </div>
                                    )
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
                                        <div className="container bg-gray-100 mx-auto w-full h-full" key={index}>
                                            <div className="relative wrap overflow-hidden p-10 h-full">
                                                <div id ="feedback-line" className="feedback-line border-2-2 absolute border-opacity-20 border-gray-700 h-full border " styles="left: 50%"></div>
                                                    <div className={"mb-8 flex justify-between " + ( (index%2) === 1 ? "flex-row-reverse" : "" ) + " items-center w-full left-timeline" }>
                                                        <div className="order-1 w-5/12"></div>
                                                        <div className="z-20 flex items-center order-1 bg-gray-800 shadow-xl w-8 h-8 rounded-full">
                                                            <h1 className="mx-auto text-white font-semibold text-lg">{index+1}</h1>
                                                        </div>
                                                        <div className={"order-1 " + ( (index%2) === 1 ? "bg-red-400" : "bg-gray-400" ) + " rounded-lg shadow-xl w-5/12 px-6 py-4"}>
                                                            <p className="text-sm font-medium leading-snug tracking-wide text-white text-opacity-100">
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