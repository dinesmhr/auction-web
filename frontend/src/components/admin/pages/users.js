import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'
import AdminMainNavigation from '../navigation/AdminMainNavigation'

const axios = require('axios')

const AdminUsers= () => {
	const [users, setUsers] = useState(null)

	useEffect(() => {
		axios.get( '/users.php' )
		.then(function(res) {
			setUsers(res.data.data)
		})
	})
	
	return (
		<>
			<div className="aweb-admin-top-header">
				<h1 className="aweb-admin-site-title">Auction Web</h1>
				<AdminMainNavigation/>
				<div>
					{ 
						users === null ? (
							'Loading datas'
						) : (
							<table style={{width:"100%"}}>
								<thead>
									<tr>
										<th>Fullname</th>
										<th>Email</th>
										<th>Role</th>
										<th>Actions</th>
										<th>Status</th>
									</tr>
								</thead>
								<tbody>
									{
										users.map( ( user, index )  => {
											return (	 
												<tr key={ index }>
													<td>{ user.fullname }</td>
													<td>{ user.email }</td>
													<td>{ user.role }</td>
													<td>
														<button><Link to={ `/aweb-users/${user.id}` }>{`Edit`}</Link></button>
													</td>
													<td>{user.status}</td>
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

export default AdminUsers;