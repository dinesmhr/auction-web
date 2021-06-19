import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import AdminMainNavigation from '../../navigation/AdminMainNavigation'

const AdminEditProductCategory = () => {
    const { id } = useParams()

    return (
        <>
            <div className="content-wrap">
				<AdminMainNavigation/>
				<div id="admin-right-content" className="float-right w-4/5 text-white p-8 h-screen mt-12">

                </div>{ /* #admin-right-content */ }
            </div>
        </>
    )
}
export default AdminEditProductCategory