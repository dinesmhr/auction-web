import React, { useState, useEffect } from "react"
import { Link, useParams } from 'react-router-dom'
import Header from '../../header/Header'
import { ProductCard } from '../cards/productCard'
import Footer from '../../footer/Footer'

const axios = require('axios')

const TagProductCard = (productId) => {
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
const SingleTag = () => {
    const [ data, setData ]  = useState()
    const [ productIds, setProductIds ] = useState()
    const { id } = useParams()

    useEffect(() => {
        axios.get( `/product-tags.php?id=${id}` )
        .then(function(res) {
            setData(res.data.data[0])
        })
    }, [])

    useEffect(() => {
        axios.get( `/product-meta.php?term_id=${id}&return_type=product_id&meta_key=tag` )
        .then(function(res){
            if(res.data.status) {
                setProductIds(res.data.data)
            }
        })
    }, [])

    
    return (
        <>
            <Header/>
                <div>
                    { data &&
                        <>
                            <h1>{ `Tag : ${data.title}` }</h1>
                        </>
                    }
                    <div>
                        <h2>Products</h2>
                        { !productIds &&
                            <>
                                <div>No products assigned in this tag</div>
                                <div>
                                    <Link to="/categories">Browse product categories</Link>
                                </div>
                            </>
                        }
                        { productIds && 
                            productIds.map(( productId, index ) => {
                                return( <TagProductCard key={index} {...productId.product_id}/>)
                            })
                        }
                    </div>
                </div>
            <Footer/>
        </>
    )
}
export default SingleTag