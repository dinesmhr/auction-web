import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import AdminMainNavigation from '../../navigation/AdminMainNavigation'

const axios = require('axios')

const AdminEditBid = () => {
    const [ bidData, setBidData ] = useState()
    const [ productId, setProductId ] = useState()
    const [ userId, setUserId ] = useState()
    const [ userData, setUserData ] = useState()
    const [ emailText, setEmailText ] = useState('Send confirmation email to the bid winner')
    const [ emailError, setEmailError ] = useState(true)

    const { id } = useParams()

    useEffect(() => {
        axios.get( `/bids-details.php?id=${id}` )
        .then((res) => {
            if( res.data.status ) {
                setBidData( res.data.data )
                setProductId( res.data.data[0].product_id )
            }
        })
    }, [])

    useEffect(() => {
        { userId &&
            axios.get( `/user-details.php?id=${userId}` )
            .then(function(res) {
                setUserData(res.data.data[0])
            })
        }
    }, [userId])

    const handleEmailToOwner = () => {
        setEmailText('Sending email')
        let emailParams = {
            'email': bidData[0].email,
            'fullname': bidData[0].fullname,
            'product_id': productId,
            'sender_email': 'dinesh.mhr2054@gmail.com'
        }
        axios.post( '/mail/bidder-confirmation.php', emailParams)
        .then(function(response) {
            if( response.data.status ) {
                setEmailText('Email sent!!')
                updateBidStatus()
            } else {
                setEmailText('Error in email process!!')
            }
        })
    }

    const updateBidStatus = () => {
        setEmailText( 'Updating Bid status' )
        axios.get( `/edit-table/update-bid-status.php?id=${id}` )
        .then((res) => {
            if( res.data.status ) {
                setEmailText( 'Bid status updated' )
                window.location.reload()
            }
        })
    }

    return (
        <div id="auction-web-admin" className="content-wrap">
            <AdminMainNavigation/>
            <div id="admin-right-content">
                { bidData &&
                    bidData.map( ( bid, index ) => {
                        return (
                            <div key={ index } className=" text-base">
                            <div className="flex flex-row mb-2">   
                                <div className="">Bid ID : </div>   
                                <div className="ml-3">{bid.bid_id }</div>
                                </div>
                            <div className="flex flex-row mb-2" >   
                                <div className="">Title : </div>   
                                <div className="ml-3">{bid.title}</div>
                                </div>
                            <div className="flex flex-row mb-2" >   
                                <div className="">Product ID : </div>   
                                <div className="ml-3">{bid.product_id}</div>
                                </div>
                            <div className="flex flex-row mb-2" >   
                                <div className="">Initial ID : </div>   
                                <div className="ml-3">{bid.initial_bid}</div>
                                </div>
                            <div className="flex flex-row mb-2" >   
                                <div className="">Deadline Date : </div>   
                                <div className="ml-3">{bid.deadline_date}</div>
                                </div>
                            <div className="flex flex-row mb-2" >   
                                <div className="">Description : </div>   
                                <div className="ml-3">{bid.description}</div>
                                </div>
                            <div className="flex flex-row mb-2" >   
                                <div className="">Bid Amount : </div>   
                                    <div className="ml-3">{bid.bid_amount}</div>
                            </div> 
                            <div className="flex flex-row mb-2" >  
                                <div className="">Bid Date : </div>   
                                <div className="ml-3">{bid.bid_date}</div>
                            </div>   
                            <div className="flex flex-row mb-2" c>
                                    <div className="">Bid Difference : </div>   
                                <div className="ml-3">{bid.bid_difference}</div>
                            </div> 
                            <div className="flex flex-row mb-2" >  
                                <div className="">Bid raise : </div>   
                                <div className="ml-3">{bid.bid_raise}</div>
                            </div>
                            <div className="flex flex-row mb-2">
                                    <div className="">Bid Amount : </div>  
                                    <div className="ml-3">{bid.bid_amount}</div>
                                </div>
                                <div className="flex flex-row mb-2">                                                
                                <div className="">Bid Status : </div>   
                                <div className="ml-3">{bid.bid_status}</div>
                            </div> 
                            <div className="flex flex-row mb-2">                                              
                                <div className="">Bid Submission Date : </div>   
                                    <div className="ml-3">{bid.submission_date}</div>
                            </div>

                            { bid.bid_status === "win" &&
                                <button className="text-white bg-indigo-900 active:bg-pink-600 font-bold uppercase text-sm px-6 py-1 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mt-1 mb-6 ease-linear transition-all duration-150" onClick={()=>handleEmailToOwner()}>{ emailText }</button>
                            }
                            { bid.bid_status === "sold_out" &&
                                <button>Bidder Confirmation Email Sent</button>
                            }

                            <div className="mt-6 shadow appearance-none border rounded w-full py-2 px-3 bg-gray-300 text-gray-900 leading-tight focus:outline-none focus:shadow-outline">
                                <div className="mt-2 text-lg text-purple-900 font-bold">
                                Bidder Information</div>
                                <tbody>
                                    <tr className="editProductUser">
                                        <td className="font-bold text-sm mr-1">Username : </td><td className="text-sm text-left ">{bid.username}</td>
                                    </tr>
                                    <tr className="editProductUser">
                                        <td className="font-bold text-sm mr-1">User ID : </td><td className="text-sm text-left ">{bid.user_id}</td>
                                    </tr>
                                    <tr className="editProductUser">    
                                        <td className="font-bold text-sm mr-1">Email : </td><td className="text-sm text-left">{bid.email}</td>
                                    </tr>
                                    <tr className="editProductUser">
                                        <td className="font-bold text-sm mr-1">Full Name : </td><td className="text-sm">{bid.fullname }</td>
                                    </tr>
                        
                                </tbody>
                            </div>    
                            </div>
                        )       
                    })
                }
                 <button className="bg-red-600 hover:bg-red-700 text-gray-900 font-semibold py-1 px-4 mt-4 border border-gray-400 shadow-md rounded shadow">Delete Bid</button>
            </div>
        </div>
    )
}
export default AdminEditBid