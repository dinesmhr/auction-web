import React, { Fragment, useState, useEffect, useContext, useRef } from 'react'
import { Link, useParams } from 'react-router-dom'
import Header from '../../header/Header'
import Carousel from 'react-gallery-carousel'
import 'react-gallery-carousel/dist/index.css'
import Footer from '../../footer/Footer'
import { ProductCard } from '../cards/productCard'
import {decode} from 'html-entities';
import { Dialog, Transition } from '@headlessui/react'
import Countdown from 'react-countdown'
import {appContext} from '../../../App'

const axios = require('axios')

const SimilarProducts = (similarProductId) => {
    const [ product, setProduct ] = useState()
    const { product_id } = similarProductId

    // get product data
    useEffect(() => {
        axios.get( `/products.php?id=${product_id}` )
        .then((res) => {
            setProduct(res.data.data[0])
        })
    }, [])

    return (
        <div>
            { product &&
                <ProductCard {...product}/>
            }
        </div>
    )
}

const SingleProduct = () => {
    const [openBidModal, setOpenBidModal] = useState(false)

    const [productData, setProductData] = useState(null)
    const [ sellerID, setSellerID ] = useState()
    const [ sellerData, setSellerData ] = useState()
    const [ catids, setCatids ] = useState()
    const [ tagIds, setTagIds ] = useState()
    const [ categories, setCategories ] = useState('')
    const [ tags, setTags ] = useState('')
    const [ similarProductsIds, setSimilarProductsIds ] = useState('')
    const [ bidNowButtonDisable, setBidNowButtonDisable ] = useState(true)
    const [ bidNowButtonDisableTitle, setBidNowButtonDisableTitle ] = useState("Can't perform this action right now")
    const [ bidNowButtonDisableMessage, setBidNowButtonDisableMessage ] = useState('')
    const [ userId, setUserId ] = useState()
    const [ userStatus, setUserStatus ] = useState()

    const [ userCanBid, setUserCanBid ] = useState(false)
    const [ bidRaise, setBidRaise ] = useState()
    const [ currentHighestBid, setCurrentHighestBid ] = useState()
    const [ currentBid, setCurrentBid ] = useState({value:''})
    const [ closingBid, setClosingBid ] = useState()
    const [ bidDifferrence, setBidDifferrence ] = useState()
    const [ userLastBidDate, setUserLastBidDate ] = useState()
    
    const [ recentUserBids, setRecentUserBids ] = useState()

    const { id } = useParams()
    const cancelButtonRef = useRef(null)

    const { isLoggedIn } = useContext(appContext)

    useEffect(() => {
        if( isLoggedIn ) {
            axios.get( `/sessions.php` )
            .then((res) => {
                setUserId(res.data.userId)
            })
        } else {
            setBidNowButtonDisableMessage( `You are not logged in. To take part in bidding process please login. ` )
        }
    }, [isLoggedIn])
    
    useEffect(() => {
        { userId &&
            axios.get( `/users.php?id=${userId}` )
            .then((res) => {
                setUserStatus(res.data.data[0].status)
                if( res.data.data[0].status === 'verified' ) {
                    setBidNowButtonDisable(false)
                    setBidNowButtonDisableTitle("Click to bid")
                }
            })
        }
    }, [userId])

    useEffect(() => {
        axios.get( `/products.php?id=${id}` )
        .then(function(res) {
            if( res.data.status ) {
                setProductData( res.data.data )
                setSellerID( res.data.data[0].user_id )
                setCurrentHighestBid(res.data.data[0].initial_bid)
                setCurrentBid({value:res.data.data[0].initial_bid})
                setBidRaise(res.data.data[0].bid_raise)
                setClosingBid(res.data.data[0].max_bid)
            }
        })
    }, [])

    // get cat ids
    useEffect(() => {
        axios.get( `/product-meta.php?product_id=${id}` )
        .then(function(res) {
            if(res.data.status) {
                let tempCatids = []
                res.data.data.map((tempCatid) => {
                    tempCatids.push(tempCatid.term_id)
                })
                setCatids(tempCatids)
            }
        })
    }, [])

    // get tags ids
    useEffect(() => {
        axios.get( `/product-meta.php?product_id=${id}&meta_key=tag` )
        .then(function(res) {
            if(res.data.status) {
                let tempTagids = []
                res.data.data.map((tempTagid) => {
                    tempTagids.push(tempTagid.term_id)
                })
                setTagIds(tempTagids)
            }
        })
    }, [])

    useEffect(() => {
        catids &&
            axios.get( `/product-bulkCategories.php?id=${catids}` )
            .then(function(res) {
                setCategories(res.data.data)
            })
    }, [catids])

    useEffect(() => {
        catids &&
            axios.get( `/product-meta-bulk.php?term_id=${catids}&product_id=${id}` )
            .then(function(res) {
                setSimilarProductsIds(res.data.data)
            })
    }, [catids])

    useEffect(() => {
        tagIds &&
            axios.get( `/product-bulkTags.php?id=${tagIds}` )
            .then(function(res){
                setTags(res.data.data)
            })
    }, [tagIds])

    useEffect(() => {
        { sellerID &&
            axios.get( `/user-details.php?id=${sellerID}` )
            .then(function(res) {
                setSellerData(res.data.data[0])
            })
        }
    }, [sellerID])

    // set current highest bid
    useEffect(() => {
        let isMounted = true;
        async function fetchData() {
            let results = await axios.get( `/bids.php?return_type=highest_bid&product_id=${id}` )
            if( results.data.status ) {
                if(isMounted)  {
                    setUserLastBidDate(results.data.data[0].bid_Date)
                    setCurrentHighestBid(results.data.data[0].bid_amount)
                    setCurrentBid({value:results.data.data[0].bid_amount})
                }
            }
        }

        fetchData()
        return () => { isMounted = false };
    }, [])

    useEffect(() => {
        let isMounted = true;
        async function fetchBidData() {
            let resultss = await axios.get( `/bids.php?user_id=${userId}&product_id=${id}` )
            if( resultss.data.status ) {
                if(isMounted)  {
                    setRecentUserBids(resultss.data.data)
                }
            }
        }
        { userId &&
            fetchBidData()
        }
        return () => { isMounted = false };
    }, [userId])

    // check userCanBid, checks user bid cooldown time , checks user has previous bid
    useEffect(() => {

    }, [userCanBid])

    const validateBid = () => {
        if( currentBid.value <= currentHighestBid ) {
            currentBid.value = currentBid.value
            currentBid.error = true
            currentBid.errorMessage = `Currrent Bid must be geater than previous highest bid. Previous bid was ${currentHighestBid}`
            setCurrentBid(JSON.parse(JSON.stringify(currentBid)))
            return;
        } else if ( currentBid.value > closingBid ) {
            currentBid.value = currentBid.value
            currentBid.error = true
            currentBid.errorMessage = `Currrent Bid amount cannot exceed the maximum closing bid`
            setCurrentBid(JSON.parse(JSON.stringify(currentBid)))
            return;
        } else if ( ( currentBid.value - currentHighestBid ) < bidRaise ) {
            currentBid.value = currentBid.value
            currentBid.error = true
            currentBid.errorMessage = `Currrent Bid raised amount is not enough to place a bid. Bid raise is ${bidRaise} from previous bid amount. Your current bid raise is ${currentBid.value - currentHighestBid}`
            setCurrentBid(JSON.parse(JSON.stringify(currentBid)))
            return;
        } else {
            setBidDifferrence(currentBid.value - currentHighestBid)
            return true
        }
    }

    const onBidsubmit =  () => {
        if( validateBid() ) {
            axios.post( `/edit-table/edit-bid.php`, {
				submit: 'submit',
				productId: id,
                userId: userId,
                bid_amount: currentBid.value,
                bid_difference: bidDifferrence
			})
            .then((res) => {
                if( res.data.status ) {
                    setUserCanBid(!userCanBid)
                }
            })
        }
    }

    // bid modal
    const BidModal = () => {
        return (
            <Transition.Root show={openBidModal} as={Fragment}>
                <Dialog
                    as="div"
                    static
                    className="fixed z-10 inset-0 overflow-y-auto"
                    open={openBidModal}
                    onClose={setOpenBidModal}
                >
                    <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                    </Transition.Child>

                    {/* This element is to trick the browser into centering the modal contents. */}
                    <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
                        &#8203;
                    </span>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        enterTo="opacity-100 translate-y-0 sm:scale-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                        leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                    >
                        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                                <div className="sm:flex sm:items-start">
                                    { isLoggedIn &&
                                        <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                                            <Dialog.Title as="h3" className="text-lg leading-6 font-medium text-gray-900">
                                                Perform Bid
                                            </Dialog.Title>
                                            <div className="mt-2">
                                                <h2>{productData[0].title}</h2>
                                                <div>
                                                    Bid will close in
                                                </div>
                                                <Countdown date={ Date.parse(new Date(productData[0].deadline_date) ) } />
                                                <div>
                                                    <div>Opening Bid : { productData[0].initial_bid}</div>
                                                    <div>Closing Bid : { productData[0].max_bid}</div>
                                                    <div>
                                                        Current Highest Bid : { currentHighestBid ? currentHighestBid : productData[0].initial_bid }
                                                    </div>
                                                    <div>
                                                        Valid Bid Raise : { bidRaise ? bidRaise : productData[0].bid_raise }
                                                    </div>
                                                    <div>
                                                        {/* { userLastBidDate &&
                                                                
                                                        }
                                                        { !userLastBidDate && */}
                                                            <>
                                                                <input type="number" onChange ={ (e) => setCurrentBid({value:e.target.value}) } value={ currentBid.value ? currentBid.value :productData[0].initial_bid} step={ productData[0].bid_raise } min={productData[0].initial_bid} max={ closingBid ? closingBid :productData[0].initial_bid}/>
                                                                <button onClick= {() => onBidsubmit()}>Place a Bid</button>
                                                                { currentBid.error &&
                                                                    <div>{ currentBid.errorMessage }</div>
                                                                }
                                                            </>
                                                        {/* } */}
                                                        <div>
                                                            Your recent bid is just ago
                                                        </div>
                                                    </div>
                                                </div>
                                                <div>
                                                    Your Recent Bids
                                                    { !recentUserBids &&
                                                        <div>
                                                            You have not made bid in this product before
                                                        </div>
                                                    }
                                                    { recentUserBids &&
                                                        <div>
                                                            <div>
                                                                <span>Bid Amount</span>
                                                                <span>Bid Difference</span>
                                                                <span>Bid Date</span>
                                                            </div>
                                                            { 
                                                                recentUserBids.map(( recentUserBid, key) => {
                                                                    return(
                                                                        <div>
                                                                            <span>{recentUserBid.bid_amount}</span>
                                                                            <span>{recentUserBid.bid_difference}</span>
                                                                            <span>{recentUserBid.bid_date}</span>
                                                                        </div>
                                                                    )      
                                                                })
                                                            }
                                                        </div>
                                                    }
                                                </div>
                                            </div>
                                        </div>
                                    }
                                </div>
                            </div>
                            <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                                <button
                                type="button"
                                className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
                                onClick={() => setOpenBidModal(false)}
                                ref={cancelButtonRef}
                                >
                                Close
                                </button>
                            </div>
                        </div>
                    </Transition.Child>
                    </div>
                </Dialog>
            </Transition.Root>
        )
    }

    return (
        <>  
            <div id="auction-web">
                <Header/>                    
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
                                                <>
                                                    <div className="flex flex-row m-10">
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
                                                                                        <Link to={`/category/${cat.id}`}>{ cat.title }</Link>
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
                                                                                        <Link to={`/tag/${tag.id}`}>{ tag.title }</Link>
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
                                                            <div>
                                                                <div className="singlePage_RightData font-bold mr-2 text-base">{ `Opening Bid ` }</div>
                                                                {product.initial_bid.trim()}
                                                            </div>

                                                            <div>
                                                                <div className="singlePage_RightData font-bold mr-2 text-base">{ `Submission Date ` }</div>
                                                                {product.submission_date.trim()}
                                                            </div>

                                                            <div>
                                                                <button className="bg-purple-800 hover:bg-purple-700 text-white font-bold py-2 px-8 rounded mt-5" onClick = { (e) => setOpenBidModal(true) } title={bidNowButtonDisableTitle} disabled={bidNowButtonDisable}>Bid Now</button>
                                                                { bidNowButtonDisable && bidNowButtonDisableMessage &&
                                                                    <>
                                                                        {bidNowButtonDisableMessage}
                                                                        <Link to="/login" target="_blank">Go to Login</Link>
                                                                    </>
                                                                }
                                                                { userStatus && ( userStatus !== 'verified' ) &&
                                                                    <>{ `User must be verified to take part in bidding process` }</>
                                                                }
                                                            </div>
                                                            <div>
                                                                Current Highest Bid : {  currentHighestBid ? currentHighestBid : product.initial_bid }
                                                            </div>
                                                            <div>
                                                                Bid will close in
                                                                <Countdown date={ Date.parse(new Date(product.deadline_date) ) } />
                                                            </div>
                                                            { BidModal() }
                                                        </div>
                                                    </div>
                                                    <hr/>
                                                    <div className="singleProductRightMargin mt-2 text-sm">
                                                        <div className="text-lg text-yellow-600 font-bold mt-2 mb-2 ml-4">{ `Description ` }</div>
                                                        <div className="ml-8 text-sm mr-1">{product.description.trim()}</div>
                                                    </div>
                                                    <div className="singleProductRightMargin">
                                                        <div className="text-lg text-yellow-600 font-bold mt-2 mb-2 ml-4">{ `Specifications ` }</div>
                                                        <div className="ml-8 text-sm mr-1 mb-5">
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
                                                    <div className="singleProductRightMargin mt-2 text-sm">
                                                        <div className="text-lg text-yellow-600 font-bold mt-2 mb-2 ml-4">{ `Other Details ` }</div>
                                                        <div dangerouslySetInnerHTML =  {{__html: decode(product.details) }} className="ml-8 text-sm mr-1"/>
                                                    </div>
                                                </>
                                            )
                                        })
                                    }
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
                                    { Array.isArray( similarProductsIds ) &&
                                        <>
                                            <h1>{ `Similar Products` }</h1>
                                            { 
                                                similarProductsIds.map((similarProductId) => {
                                                    return (
                                                        <SimilarProducts {...similarProductId}/>
                                                    )
                                                })    
                                            }
                                        </>
                                    }
                                </div>
                            )
                        }
                    </div>
                <Footer/>
            </div>
        </>
    )
}
export default SingleProduct