import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import AdminMainNavigation from '../../navigation/AdminMainNavigation'

const axios = require('axios');

const AdminEditProduct = () => {
    const [ title, setTitle ] = useState({value:''})
    const [ description, setDescription ] = useState({value:''})
    const { id } = useParams()

    useEffect(() => {
        axios.get( `/products.php?id=${id}` )
        .then(function(res) {
            console.log(res.data.data[0])
            setTitle({value: res.data.data[0].title})
            setDescription({value: res.data.data[0].description})
        })
    })

    return (
        <div id="auction-web-admin" className="content-wrap">
            <AdminMainNavigation/>
            <div id="admin-right-content" className="float-right w-4/5 text-white p-8 h-screen mt-12">
                <div>
                    <input className="shadow appearance-none border rounded w-full py-2 px-3 bg-gray-200 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" name="title" onChange = { (e) => setTitle({value: e.target.value}) } value={title.value}/>
                </div>
                <div>
                    <textarea className="shadow appearance-none border rounded w-full py-2 px-3 bg-gray-200 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" onChange = { (e) => setDescription({value: e.target.value}) }>
                        {description.value}
                    </textarea>
                </div>
            </div>
        </div>
    )
}
export default AdminEditProduct