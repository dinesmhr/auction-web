import React, { useEffect, useState } from 'react';
import AdminMainNavigation from '../navigation/AdminMainNavigation'
const axios = require('axios');

const AdminProducts = (props) => {
	const [ products, setProducts ] = useState([])
	const { userLoggedIn } = props

	useEffect(() => {
		let _this = this
        const url = 'http://localhost/auction-web/api/products.php'
        axios.get( url )
        .then(function(response) {
            if( response.data.status === true ) {
                setProducts( response.data.data )
            }
        })
	})

	return (
		<>
		 	<header>           
				<div className="aweb-admin-top-header">
					<h1 className="aweb-admin-site-title">Auction Web</h1>
					<AdminMainNavigation userLoggedIn = { userLoggedIn }/> 
					<table style={{width:"100%"}}>
						<thead>
							<tr>
								<th>Name</th>
								<th>Status</th>
								<th>Initial Price</th>
								<th>Seller Id</th>
								<th>Actions</th>
							</tr>
						</thead>
						<tbody>
							{
								products.map( ( product, index )  => {
									return (	 
										<tr key={ index }>
											<td>{product.name}</td>
											<td>{product.status}</td>
											<td>{product.initial_price}</td>
											<td>{product.seller_id}</td>
											<td>
												<button><a href={ `/aweb-users/${product.id}` }>{`Edit`}</a></button>
											</td>
										</tr>
									)
								})
							}
						</tbody>
					</table>					
				</div>
			</header>
		</>
	)
}
export default AdminProducts;