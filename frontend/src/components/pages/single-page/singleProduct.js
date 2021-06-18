import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

const axios = require('axios')

const SingleProduct = () => {
    const [productData, setProductData] = useState()
    const { id } = useParams()

    useEffect(() => {
        axios.get( `/products.php?id=${id}` )
        .then(function(res) {
            if( res.data.status ) {
                console.log(res.data)
                setProductData( res.data.data )
            }
        })
    })

    return (
        <>
            This is Single Product page
        </>
    )
}
export default SingleProduct