import React, { useState, useEffect } from "react"
import { Link, useParams } from 'react-router-dom'
import Header from '../../header/Header'
import { ProductCard } from '../cards/productCard'

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
                <>Loading product info</>
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
        <div>
            { data &&
                <>
                    <h1>{data.title}</h1>
                    <div>
                        {data.description}
                    </div>
                    <div>
                    {
                        <img src={data.image_path[0]} alt={data.title}/>
                        
                    }
                    </div>
                </>
            }
            <div>
                <h2>Products</h2>
                { !productIds &&
                    <>
                        <div>No products assigned in this category</div>
                        <div>
                            <Link to="/categories">Browse other categories</Link>
                        </div>
                    </>
                }
                { productIds && 
                    productIds.map(( productId, index ) => {
                        return( <CatProductCard key={index} {...productId.product_id}/>)
                    })
                }
            </div>
        </div>
        </>
    )
}
export default SingleCategory