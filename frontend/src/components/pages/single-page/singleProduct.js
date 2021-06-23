import React, { useState, useEffect, useContext } from 'react'
import { Link, useParams } from 'react-router-dom'
import Header from '../../header/Header'
import Carousel from 'react-gallery-carousel';
import 'react-gallery-carousel/dist/index.css';
import {appContext} from '../../../App'

const axios = require('axios')

const SingleProduct = () => {
    const [productData, setProductData] = useState(null)
    const [ sellerID, setSellerID ] = useState()
    const [ sellerData, setSellerData ] = useState()
    const [ catids, setCatids ] = useState()
    const [ tagIds, setTagIds ] = useState()
    const [ categories, setCategories ] = useState('')
    const [ tags, setTags ] = useState('')
    const { id } = useParams()
    const { isLoggedIn } = useContext(appContext)

    useEffect(() => {
        axios.get( `/products.php?id=${id}` )
        .then(function(res) {
            if( res.data.status ) {
                setProductData( res.data.data )
                setSellerID( res.data.data[0].user_id )
                setCatids( res.data.data[0].categories )
                setTagIds( res.data.data[0].tags )
            }
        })
    }, [])

    useEffect(() => {
        catids &&
            axios.get( `/product-bulkCategories.php?id=${catids}` )
            .then(function(res){
                setCategories(res.data.data)
            })
    })

    useEffect(() => {
        tagIds &&
        axios.get( `/product-bulkTags.php?id=${tagIds}` )
        .then(function(res){
            setTags(res.data.data)
        })
    })

    useEffect(() => {
        { sellerID &&
            axios.get( `/user-details.php?id=${sellerID}` )
            .then(function(res) {
                console.log(res.data.data[0])
                setSellerData(res.data.data[0])
            })
        }
    }, [sellerID])

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
                                                            { !categories ? (
                                                                    "No categories"
                                                                ) : categories.length === 0 ? (
                                                                    "Loading categories"
                                                                ) : (
                                                                    categories.map((cat, catKey) => {
                                                                        return (
                                                                            <div key={catKey} className="">
                                                                                <Link to={`/product-categories/${cat.id}`}>{ cat.title }</Link>
                                                                            </div>
                                                                        )
                                                                    })
                                                                )
                                                            }
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <span className="text-sm">{ `Tags` }</span>
                                                        <div>
                                                            { !tags ? (
                                                                    "No tags"
                                                                ) : tags.length === 0 ? (
                                                                    "Loading tags"
                                                                ) : ( 
                                                                    tags.map((tag, tagKey) => {
                                                                        return (
                                                                            <div key={tagKey} className="">
                                                                                <Link to={`/product-tag/${tag.id}`}>{ tag.title }</Link>
                                                                            </div>
                                                                        )
                                                                    })
                                                                )
                                                            }
                                                        </div>
                                                        <hr/>
                                                    </div>
                                                    <div>
                                                    <span className="text-sm">{ `Status` }</span>
                                                        {product.status}
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
                                <div>
                                    Seller Information
                                    { sellerData &&
                                        <div>
                                            <div>Full Name: { sellerData.fullname }</div>
                                            <div>Email Address: { sellerData.email }</div>
                                            <div>Contact Number: { sellerData.contact_num.areaCode + sellerData.contact_num.number }</div>
                                            <div>Profession: { sellerData.profession }</div>
                                            <div>Status: { sellerData.status }</div>
                                        </div>
                                    }
                                </div>
                            </div>
                        )
                    }
                </div>       
        </div>
        </>
    )
}
export default SingleProduct