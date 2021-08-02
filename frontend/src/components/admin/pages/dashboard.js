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
                                <div class="border-b-2 mt-4 flex flex-row pb-16 pt-10 ">
                                    <div className="mr-16 text-center">
                                        <div>{ bid.fullname }</div>
                                        <div className="mb-2 mt-1 mb-2">{ bid.email }</div>
                                        <div><button id="admin-action-trigger-button" className="text-white active:bg-pink-600 font-bold uppercase text-sm px-6 py-2 ml-2 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1  mb-3  ease-linear transition-all duration-150" type="button"><Link target="_blank" to={`/aweb-users/${bid.user_id}`}>User Details</Link></button></div>  
                                    </div>
                                    <div className="mr-16 text-center">
                                     <div>
                                        { `placed bid on ` }
                                    </div>
                                       <div className=" mb-2"> { bid.title } </div>
                                       <div> <button id="admin-action-trigger-button" className="text-white active:bg-pink-600 font-bold uppercase text-sm px-6 py-2 ml-2 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1  mb-3  ease-linear transition-all duration-150" type="button"><Link target="_blank" to={`/product/${bid.product_id}`}>View Product</Link></button></div>
                                    </div>
                                    
                                    <div>
                                    <div className="text-center">
                                        { ` with bid raise of ${bid.bid_raise}` }
                                    </div>
                                    <div className="mb-2">
                                        { ` on date ${bid.bid_date}` }
                                    </div>
                                        <button id="admin-action-trigger-button" className="text-white active:bg-pink-600 font-bold uppercase text-sm px-6 py-2 ml-2 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1  mb-3  ease-linear transition-all duration-150" type="button"><Link to={`/aweb-bids/${bid.bid_id}`}>{ `View Bid Details` }</Link></button>
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