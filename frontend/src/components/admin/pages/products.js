import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'
import AdminMainNavigation from '../navigation/AdminMainNavigation'
const axios = require('axios');

const AdminProducts = () => {
	const [ products, setProducts ] = useState(null)

	useEffect(() => {
        axios.get( '/products.php' )
        .then(function(response) {
            if( response.data.status === true ) {
                setProducts( response.data.data )
            }
        })
	})

	return (
		<>           
			<div className="aweb-admin-top-header">
				<h1 className="aweb-admin-site-title">Auction Web</h1>
				<AdminMainNavigation/>
				<div>
					{
						products === null ? (
							'Loading datas'
						) : products.length === 0 ? (
							'No Products'
						) : (
							<table style={{width:"75%"}}>
								<thead>
									<tr>
										<th>Name</th>
										<th>Initial Price</th>
										<th>Seller Id</th>
										<th>Actions</th>
										<th>Status</th>
									</tr>
								</thead>
								<tbody>
									{
										products.map( ( product, index )  => {
											return (	 
												<tr key={ index }>
													<td>{product.title}</td>
													<td>{product.initial_bid} USD</td>
													<td>{product.user_id}</td>
													<td>
														<button><Link to={ `/aweb-products/${product.id}` }>{`Edit`}</Link></button>
													</td>
													<td>{product.status}</td>
												</tr>
											)
										})
									}
								</tbody>
							</table>
						)
					}
				</div>
			</div>
		</>
	)
}
export default AdminProducts;