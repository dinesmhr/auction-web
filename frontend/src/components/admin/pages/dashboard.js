import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'
import AdminMainNavigation from '../navigation/AdminMainNavigation'

const axios = require('axios')

const AdminDashboard = () => {
    const [ bids, setBids ] = useState()

    useEffect(() => {
        axios.get( `/bids-details.php` )
        .then((res) => {
            if( res.data.status ) {
                setBids(res.data.data)
            }
        })
    }, [])

    return (
        <div className="content-wrap">
            <AdminMainNavigation/>
            <div id="admin-right-content">
                <div>
                    <h2 className="text-xl text-gray mb-8">Bids Log</h2>
                    { bids && 
                        bids.map((bid) => {
                            return ( 
                                <div class="border-b-2 mt-4 flex flex-col pb-16 pt-10 ">
                                    <div className="mr-16 text-center flex ">
                                        <div><span className="font-semibold text-lg leading-4 ">{ bid.fullname }</span></div>
                                        <div className="mb-2 ml-1">{ bid.email }</div>
                                        <div><button id="admin-action-trigger-button" className="text-white active:bg-pink-600 font-bold uppercase text-sm px-6 py-1 ml-2 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1  mb-3  ease-linear transition-all duration-150" type="button"><Link target="_blank" to={`/aweb-users/${bid.user_id}`}>User Details</Link></button></div>  
                                    </div>
                                    <div className="mr-16 text-center flex flex-ro1">
                                     <div>
                                        { `placed bid on ` }
                                    </div >
                                       <div className=" mb-2 ml-1"> <span className="font-semibold text-lg leading-4">{ bid.title } </span></div>
                                       <div> <button id="admin-action-trigger-button" className="text-white active:bg-pink-600 font-bold uppercase text-sm px-6 py-1 ml-2 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1  mb-3  ease-linear transition-all duration-150" type="button"><Link target="_blank" to={`/product/${bid.product_id}`}>View Product</Link></button></div>
                                    </div>
                                    
                                    <div className="flex flex-row ">
                                    <div className="text-center "> <span className="font-semibold text-lg leading-4 ">{` ${bid.bid_raise}`} </span>
                                    </div>
                                    <div className="mt-1 ml-1 leading-4">
                                        { ` on date ${bid.bid_date}` }
                                    </div>
                                        <button id="admin-action-trigger-button" className="text-white active:bg-pink-600 font-bold uppercase text-sm px-6 py-1 ml-2 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1  mb-3  ease-linear transition-all duration-150" type="button"><Link to={`/aweb-bids/${bid.bid_id}`}>{ `View Bid Details` }</Link></button>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </div>
    );
}
 
export default AdminDashboard;