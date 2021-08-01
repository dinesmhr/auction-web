import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import AdminMainNavigation from '../../navigation/AdminMainNavigation'

const axios = require('axios')

const AdminEditBid = () => {
    const [ bidData, setBidData ] = useState()
    const { id } = useParams()

    useEffect(() => {
        axios.get( `/bids-details.php?id=${id}` )
        .then((res) => {
            if( res.data.status ) {
                setBidData( res.data.data )
            }
        })
    }, [])

    return (
        <div id="auction-web-admin" className="content-wrap">
            <AdminMainNavigation/>
            <div id="admin-right-content">
                { bidData &&
                    bidData.map( ( bid, index ) => {
                        console.log(bid)
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


                                            <div className="mt-6 shadow appearance-none border rounded w-full py-2 px-3 bg-gray-300 text-gray-900 leading-tight focus:outline-none focus:shadow-outline">
                                                <div className="mt-2 text-lg text-purple-900 font-bold">
                                            Seller Information</div>
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
            </div>
        </div>
    )
}
export default AdminEditBid