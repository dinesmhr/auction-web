import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import Header from '../../header/Header'

const axios = require('axios')

const SingleProduct = (props) => {
    const [productData, setProductData] = useState()
    const { id } = useParams()
    const { isLoggedIn } = props

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
        <div id="auction-web">
            <Header isLoggedIn = { isLoggedIn } />
            This is Single Product page
        </div>
    )
}
export default SingleProduct