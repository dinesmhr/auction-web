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
                                    <div key={ index } className="admin-content-table-row grid grid-cols-6 flex flex-row text-sm">
                                    <span className="py-2 px-6">{bid.bid_id }</span>
                                    <span className="py-2 px-6">{bid.title}</span>
                                    <span className="py-2 px-6">{bid.product_id}</span>
                                    <span className="py-2 px-6">{bid.initial_bid}</span>
                                    <span className="py-2 px-6">{bid.max_bid}</span>
                                               <span className="py-2 px-6">{bid.deadline_date}</span>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}
export default AdminEditBid