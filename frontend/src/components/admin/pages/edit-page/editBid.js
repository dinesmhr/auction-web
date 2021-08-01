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
                    })
                }
            </div>
        </div>
    )
}
export default AdminEditBid