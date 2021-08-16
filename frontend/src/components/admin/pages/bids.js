import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'
import AdminMainNavigation from '../navigation/AdminMainNavigation'
import { BsDot } from "react-icons/bs"
import { BiMoney } from "react-icons/bi";

const axios = require('axios');

const AdminBids = () => {
	const [ bids, setBids ] = useState(null)
	const [ filterValue, setFilterValue ] = useState('all')
	
	useEffect(() => {
        axios.get( '/bids-details.php' )
        .then(function(response) {
            if( response.data.status === true ) {
                setBids( response.data.data )
            }
        })
	})

	const handleFilter = (e) => {
		setFilterValue(e.target.value)
	}

	return (
		<>           
			<div id="auction-web-admin" className="content-wrap">
				<AdminMainNavigation/>
				<div id="admin-right-content">
					<div className="mb-2">
						<span className="mr-2"> Filter By</span> 
						<select onChange = { (e) => handleFilter(e) } className="text-gray-800">
							<option value="all" className="text-gray-800">All</option>
							<option value="active" className="text-gray-800">Active</option>
							<option value="beat" className="text-gray-800">Beat</option>
							<option value="win" className="text-gray-800">Win</option>
							<option value="bid_lose" className="text-gray-800">Bid Lose</option>
							<option value="sold_out" className="text-gray-800">Sold Out</option>
						</select>
					</div>
					{
						bids === null ? (
							<div id="admin-content-table" className="tracking-wider"><span className="grid p-4">Loading datas</span></div>
						) : bids.length === 0 ? (
							<div id="admin-content-table" className="tracking-wider"><span className="grid p-4">No products found</span></div>
						) :  (
							<div id="admin-content-table" className="tracking-wider">
								<div className="admin-content-table-row-heading grid grid-cols-6 flex flex-row font-semibold">
									<span className="py-4 px-6">Bid Id</span>
									<span className="py-4 px-6">User</span>
                                    <span className="py-4 px-6">Product Name</span>
                                    <span className="py-4 px-6">Bid Date</span>
									<span className="py-4 px-6">Status</span>
									<span className="py-4 px-6">Actions</span>
								</div>
								{
									bids.map( ( bid, index )  => {
										return (
											( bid.bid_status === filterValue || filterValue === 'all' ) ? 
												<div key={ index } className="admin-content-table-row grid grid-cols-6 flex flex-row text-sm">
													<span className="py-2 px-6 flex"><BiMoney className="mt-1"/><span className="px-2">{bid.bid_id}</span></span>
													<span className="py-2 px-6">{bid.username}</span>
													<span className="py-2 px-6">{bid.title}</span>
													<span className="py-2 px-6">{bid.bid_date}</span>
													<span className="py-2 px-6">{bid.bid_status}</span>
													<span className="py-2 px-6">
														<button className="bg-transparent py-1 px-4 hover:bg-blue-500 text-blue-700 font-semibold hover:text-white border border-blue-500 hover:border-transparent rounded"><Link to={`/aweb-bids/${bid.bid_id}`}>Edit</Link></button>
													</span>
												</div>
											: null
										)
									})
								} 
							</div>
						)
					}
				</div>
			</div>
		</>
	)
}
export default AdminBids;