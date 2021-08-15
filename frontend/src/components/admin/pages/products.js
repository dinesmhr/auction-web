import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'
import AdminMainNavigation from '../navigation/AdminMainNavigation'
import { BsDot } from "react-icons/bs"

const axios = require('axios');

const AdminProducts = () => {
	const [ products, setProducts ] = useState(null)
	const [ filterValue, setFilterValue ] = useState('all')

	useEffect(() => {
        axios.get( '/products.php' )
        .then(function(response) {
            if( response.data.status === true ) {
                setProducts( response.data.data )
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
					<div className="mb-3">
						<span className="mr-2">Filter By</span>
						<select onChange = { (e) => handleFilter(e) } className="text-gray-800">
							<option value="all" className="text-gray-800">All</option>
							<option value="draft" className="text-gray-800">Draft</option>
							<option value="available" className="text-gray-800">Available</option>
							<option value="bid_failed" className="text-gray-800">Bid Failed</option>
							<option value="bid_success" className="text-gray-800">Bid Success</option>
							<option value="sold-out" className="text-gray-800">Sold Out</option>
						</select>
					</div>
					{
						products === null ? (
							<div id="admin-content-table" className="tracking-wider"><span className="grid p-4">Loading datas</span></div>
						) : products.length === 0 ? (
							<div id="admin-content-table" className="tracking-wider"><span className="grid p-4">No products found</span></div>
						) : (
							<div id="admin-content-table" className="tracking-wider">
								<div className="admin-content-table-row-heading grid grid-cols-4 flex flex-row font-semibold">
									<span className="py-4 px-14">Name</span>
									<span className="py-4 px-14">Initial Price</span>
									<span className="py-4 px-14">Status</span>
									<span className="py-4 px-14">Actions</span>
								</div>
								{
									products.map( ( product, index )  => {
										return (
											( product.status === filterValue || filterValue === 'all' ) ?
												<div key={ index } className="admin-content-table-row grid grid-cols-4 flex flex-row text-sm">
													<span className="py-2 px-8 flex"><BsDot className="mt-1"/><span className="px-2">{product.title}</span></span>
													<span className="py-2 px-16">{product.initial_bid}</span>
													<span className="py-2 px-16">{product.status}</span>
													<span className="py-2 px-14">
														<button className="bg-transparent py-1 px-4 hover:bg-blue-500 text-blue-700 font-semibold hover:text-white border border-blue-500 hover:border-transparent rounded"><Link to={`/aweb-products/${product.id}`}>Edit</Link></button>
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
export default AdminProducts;