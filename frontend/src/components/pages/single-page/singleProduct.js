import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import Header from '../../header/Header'

const axios = require('axios')

const SingleProduct = (props) => {
    const [productData, setProductData] = useState(null)
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
        <>  
        <div id="auction-web">
            <Header isLoggedIn = { isLoggedIn } />                    
            <div id="auction-web-singlePage" className="">

                    {
                        productData === null ? (
                            <div id="singlePage" className="tracking-wider"><span className="">Loading datas..</span></div>
                        ) : productData.length === 0 ? (
                            <div id="singlePage" className="tracking-wider"><span className="">No products found</span></div>
                        ) : (
                            <div id="singlePage flex flex-row" className="tracking-wider">
                                <div className="singlePage m-10 flex flex-col">
                                    <span className="">Title</span>
                                    <span className="">Category</span>
                                    <span className="">Tags</span>
                                    <span className="">Description</span>
                                    <span className="">Submission Date</span>
                                    <span className="">Deadline Date</span>
                                    <span className="">Initial bid</span>
                                    <span className="">Specification</span>
                                    <span className="">Images</span>
                                </div>
                                {
                                    productData.map( ( product, index )  => {
                                        return (     
                                            <div key={ index } className=" flex flex-col m-10">
                                                <span className=""><span className=""/><span className="">{product.title}</span></span>
                                                <span className="">{product.categories}</span>
                                                <span className="">{product.tags}</span>
                                                <span className="">{product.description}</span>
                                                <span className="">{product.submission_date}</span>


                                                <span className=""> </span>
                                                <span className=""> </span>


                                                


                                                 

                                                
                                                }
                                                }
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        )
                    }
                </div>       
        </div>
        </>
    )
}
export default SingleProduct