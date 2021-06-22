import React, { useState, useEffect, useContext } from 'react'
import { useParams } from 'react-router-dom'
import Header from '../../header/Header'
import Carousel from 'react-gallery-carousel';
import 'react-gallery-carousel/dist/index.css';
import {appContext} from '../../../App'

const axios = require('axios')
const SingleProduct = () => {
    const [productData, setProductData] = useState(null)
    const { id } = useParams()
    const { isLoggedIn } = useContext(appContext)

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
                                {
                                    productData.map( ( product, index )  => {
                                        const images = product.images_path.map((image, index) => {
                                            if(!image.includes('http://localhost/auction-web/')) {
                                                image = `http://localhost/auction-web/${image.split('../').pop()}`
                                            }
                                            return (
                                                { src: image }
                                                
                                            )
                                        })
                                        return (  
                                            

                                            <div key={ index } className="flex flex-row m-10">
                                                
                                                <div className="singlePage-imageWrap">
                                                    { images &&
                                                        <Carousel images={images} style={{ height: 450, width: 550 }}                                                            
                                                            hasTransition={true}
                                                            hasMediaButton={false}

                                                            
                                                        
                                                         />  
                                                    }
                                                </div>
                                            <div className="singlePage-right ml-12">
                                                <h2 className="font-bold text-2xl">{product.title.trim()}</h2>
                                                <div>
                                                    <span className="text-sm">{ `Categories` }</span>
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
                                                    <span className="text-sm">{ `Tags` }</span>
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
                                                    <hr/>
                                                </div>
                                                <div className="mt-2">
                                                    <span className="singlePage_RightData font-bold mr-2 text-base">{ `Description ` }</span>
                                                    {product.description.trim()}
                                                </div>

                                                <div>
                                                      <span className="singlePage_RightData font-bold mr-2 text-base">{ `Initial Bid ` }</span>
                                                      {product.initial_bid.trim()}
                                                </div>

                                                 <div>
                                                      <span className="singlePage_RightData font-bold mr-2 text-base">{ `Submission Date ` }</span>
                                                      {product.submission_date.trim()}
                                                </div>

                                                <div>                                                
                                                    <span className="singlePage_RightData font-bold mr-2 text-base">{ `Specifications ` }</span>
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