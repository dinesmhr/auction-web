import React, { useEffect, useState } from 'react';
import AdminMainNavigation from '../navigation/AdminMainNavigation'
const axios = require('axios');

const AdminProductCategories = (props) => {
	const [ productCats, setproductCats ] = useState([])
	const { userLoggedIn } = props

	useEffect(() => {
		let _this = this
        const url = 'http://localhost/auction-web/api/product-categories.php'
        axios.get( url )
        .then(function(response) {
            if( response.data.status === true ) {
                setproductCats( response.data.data )
            }
        })
	})

	return (
		<>
		 	<header>           
				<div className="aweb-admin-top-header">
					<h1 className="aweb-admin-site-title">Auction Web</h1>
					<AdminMainNavigation userLoggedIn = { userLoggedIn }/>
					<table style={{width:"75%"}}>
						<thead>
							<tr>
                                <th>ID</th>
								<th>Name</th>
								<th>Description</th>
							</tr>
						</thead>
						<tbody>
							{
								productCats.map( ( productCat, index )  => {
									return (	 
										<tr key={ index }>
											<td>{productCat.id}</td>
											<td>{productCat.name}</td>
											<td>{productCat.description}</td>
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
export default AdminProductCategories;