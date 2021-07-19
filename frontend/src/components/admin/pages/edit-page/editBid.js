import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import AdminMainNavigation from '../../navigation/AdminMainNavigation'

const AdminEditBid = () => {
    const { id } = useParams()

    useEffect(() => {

    }, [])

    return (
        <div id="auction-web-admin" className="content-wrap">
            <AdminMainNavigation/>
            <div id="admin-right-content">
                { id }
            </div>
        </div>
    )
}
export default AdminEditBid