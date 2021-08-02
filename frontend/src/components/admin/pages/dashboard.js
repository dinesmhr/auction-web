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
                    <h2>Bids Log</h2>
                    { bids && 
                        bids.map((bid) => {
                            return ( 
                                <div class="border-b-2">
                                    <div>
                                        <div>{ bid.fullname }<button><Link target="_blank" to={`/aweb-users/${bid.user_id}`}>User Details</Link></button></div>
                                        <div>{ bid.email }</div>
                                    </div>
                                    <div>
                                        { `placed bid on ` }
                                    </div>
                                    <div>
                                        { bid.title }
                                        <button><Link target="_blank" to={`/product/${bid.product_id}`}>View Product</Link></button>
                                    </div>
                                    <div>
                                        { ` with bid raise of ${bid.bid_raise}` }
                                    </div>
                                    <div>
                                        { ` on date ${bid.bid_date}` }
                                    </div>
                                    <div>
                                        <button><Link to={`/aweb-bids/${bid.bid_id}`}>{ `View Bid Details` }</Link></button>
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