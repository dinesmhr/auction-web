import React, { useState, useEffect } from "react"
import { Link, useParams } from 'react-router-dom'
import Header from '../../header/Header'
import { ProductCard } from '../cards/productCard'
import Footer from '../../footer/Footer'

const axios = require('axios')

const CatProductCard = (productId) => {
    const [ product, setProduct ] = useState()

    useEffect(() => {
        axios.get( `/products.php?id=${productId[0]}` )
        .then(function(res) {
            setProduct(res.data.data[0])
        })
    }, [])

    return (
        <>
            { !product &&
                <div>Loading product info</div>
            }
            { product &&
                <ProductCard { ...product }/>
            }
        </>
    )
}
const SingleCategory = () => {
    const [ data, setData ]  = useState()
    const [ productIds, setProductIds ] = useState()
    const { id } = useParams()

    useEffect(() => {
        axios.get( `/product-categories.php?id=${id}` )
        .then(function(res){
            if( !res.data.data[0].image_path[0].includes('http://localhost/auction-web/') ) {
                res.data.data[0].image_path[0] = `http://localhost/auction-web/${res.data.data[0].image_path[0].split('../').pop()}`
            }
            setData(res.data.data[0])
        })
    }, [])

    useEffect(() => {
        axios.get( `/product-meta.php?term_id=${id}&return_type=product_id` )
        .then(function(res){
            if(res.data.status) {
                setProductIds(res.data.data)
            }
        })
    }, [])

    
    return (
        <>
            <Header/>
                <div className="single-category-page-wrap mb-14">
                    { data &&
                        <>
                            <div className="single-category-page-image">
                            {
                                <img src={data.image_path[0]} alt={data.title} className=""/>
                                
                            }
                         </div>
                            <div className=""> 
                              <h1 className="ml-10 text-3xl text-gray-800">{data.title}</h1>
                                <div className="ml-10 text-gray-700 mt-1">
                                    {data.description}
                                </div>
                            </div>
                        </>
                    }
                    <div className="w-4/6 ml-10 ">
                        <h2 className="ml-10 mt-10 text-gray-800">Products</h2>
                        { !productIds &&
                            <>
                                <div className="ml-10 text-gray-800">No products assigned in this category</div>
                                <div>
                                    <Link to="/categories"><button className="ml-10 mt-6 bg-indigo-800 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded">Browse other categories</button></Link>
                                </div>
                            </>
                        }
                        <div className="flex flex-wrap">
                        { productIds && 
                            productIds.map(( productId, index ) => {  
                                return( <div className="mr-6">
                                <CatProductCard key={index} {...productId.product_id}/>
                                         </div>)
                            })
                        }
                        </div>
                    </div>
                </div>
            <Footer/>
        </>
    )
}
export default SingleCategory