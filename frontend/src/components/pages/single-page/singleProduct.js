import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import Header from '../../header/Header'
import Carousel from 'react-gallery-carousel';
import 'react-gallery-carousel/dist/index.css';

const axios = require('axios')

const SingleProduct = (props) => {
    const [productData, setProductData] = useState(null)
    const { id } = useParams()
    const { isLoggedIn } = props

    useEffect(() => {
        axios.get( `/products.php?id=${id}` )
        .then(function(res) {
            if( res.data.status ) {
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
                                {/* <div className="singlePage m-10 flex flex-col">
                                    <span className="">Title</span>
                                    <span className="">Category</span>
                                    <span className="">Tags</span>
                                    <span className="">Description</span>
                                    <span className="">Submission Date</span>
                                    <span className="">Deadline Date</span>
                                    <span className="">Initial bid</span>
                                    <span className="">Specification</span>
                                    <span className="">Images</span>
                                </div> */}
                                {
                                    productData.map( ( product, index )  => {
                                        const images = product.images_path.map((image, index) => {
                                            let image_url = `http://localhost/auction-web/${image.split('../').pop()}`
                                            return (
                                                {
                                                    images: image_url,
                                                    
                                                    


                                                }
                                            )
                                        })
                                        return (     
                                            <div key={ index } className="flex flex-col m-10">
                                                <h2>{product.title.trim()}</h2>
                                                <div className="singlePage-imageWrap max-h-32 max-w-32">
                                                    { images &&
                                                        <Carousel images={images} style={{ height: 800, width: 500 }} />
                                                       
                                                    }
                                                </div>
                                                <div>
                                                    <span>{ `Categories` }</span>
                                                    <div>
                                                        { product.categories && 
                                                            product.categories.map((cat, catKey) => {
                                                                return (
                                                                    <div key={catKey} className="">
                                                                        { cat.value.trim() }
                                                                    </div>
                                                                )
                                                            })
                                                        }
                                                    </div>
                                                </div>
                                                <div>
                                                    <span>{ `Tags` }</span>
                                                    <div>
                                                        { product.tags && 
                                                            product.tags.map((tag, tagKey) => {
                                                                return (
                                                                    <div key={tagKey} className="">
                                                                        { tag.value.trim() }
                                                                    </div>
                                                                )
                                                            })
                                                        }
                                                    </div>
                                                </div>
                                                <div className="">
                                                    <span>{ `Description` }</span>
                                                    {product.description.trim()}
                                                </div>
                                                <div>
                                                    <span>{ `Specifications` }</span>
                                                    <div>
                                                        { product.specifications && 
                                                            product.specifications.map((spec, specKey) => {
                                                                return (
                                                                    <div key={specKey} className="">
                                                                        { spec.value.trim() }
                                                                    </div>
                                                                )
                                                            })
                                                        }
                                                    </div>
                                                </div>
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