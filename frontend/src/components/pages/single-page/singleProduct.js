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
                            <div id="singlePage" className="tracking-wider"><div className="">Loading datas..</div></div>
                        ) : productData.length === 0 ? (
                            <div id="singlePage" className="tracking-wider"><div className="">No products found</div></div>
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
                                                    <div className="font-bold text-2xl">{product.title.trim()}</div>

                                                    <div className="flex flex-row">
                                                        <div className="text-sm">{ `Categories` }</div>
                                                        <div className="ml-3 text-sm">
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
                                                    <div className="flex flex-row">
                                                        <div className="text-sm">{ `Tags` }</div>
                                                        <div className="ml-3 text-sm">
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
                                                    </div>
                                                     <div className="flex flex-row">
                                                        <div className="text-sm">{ `Status` }</div>
                                                        <div className="text-sm ml-3">{product.status}</div>
                                                    </div>

                                                    <hr/>

                                                    <div className="mt-2">
                                                        <div className="singlePage_RightData font-bold mr-2 text-base">{ `Description ` }</div>
                                                        {product.description.trim()}
                                                    </div>

                                                    <div>
                                                        <div className="singlePage_RightData font-bold mr-2 text-base">{ `Initial Bid ` }</div>
                                                        {product.initial_bid.trim()}
                                                    </div>

                                                    <div>
                                                        <div className="singlePage_RightData font-bold mr-2 text-base">{ `Submission Date ` }</div>
                                                        {product.submission_date.trim()}
                                                    </div>
                                                    <hr/>

                                                    <div>                                                
                                                        <div className="mt-2 singlePage_RightData font-bold mr-2 text-base">{ `Specifications ` }</div>
                                                        <div className="mb-3">
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
                                                    <button class="bg-purple-800 hover:bg-purple-700 text-white font-bold py-2 px-8 rounded">Bid Now</button>
                                                </div>
                                            </div>
                                        )
                                    })
                                }
                                <hr/>
                                <div>
                                    <div className="text-lg text-yellow-600 font-bold mt-2 mb-2 ml-4"> Seller Information</div>
                                    { sellerData &&
                                        <div className="mb-5">
                                            <div className="flex flex-row">
                                                <div className="ml-8 font-bold text-sm mr-1">Full Name : </div><div className="text-sm">{ sellerData.fullname }</div>
                                            </div>
                                            <div className="flex flex-row">
                                                <div className="ml-8 font-bold text-sm mr-1">Email Address : </div><div className="text-sm">{ sellerData.email }</div>
                                            </div>
                                            <div className="flex flex-row">
                                                <div className="ml-8 font-bold text-sm mr-1">Contact Number : </div><div className="text-sm">{ sellerData.contact_num.areaCode + sellerData.contact_num.number }</div>
                                            </div>
                                            <div className="flex flex-row">   
                                            <div className="ml-8 font-bold text-sm mr-1">Profession : </div><div className="text-sm">{ sellerData.profession }</div>
                                            </div>
                                            <div className="flex flex-row">
                                            <div className="ml-8 font-bold text-sm mr-1">Status : </div><div className="text-sm">{ sellerData.status }</div>
                                            </div>
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