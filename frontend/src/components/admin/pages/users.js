import React, { Component } from 'react';
import AdminMainNavigation from '../navigation/AdminMainNavigation'

class AdminUsers extends Component {
	render() {
		const { users, userLoggedIn }  = this.props
		return (
			<>
				<header>           
					<div className="aweb-admin-top-header">
						<h1 className="aweb-admin-site-title">Auction Web</h1>
						<AdminMainNavigation userLoggedIn = { userLoggedIn }/> 
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
										console.log( user )
										return (	 
											<tr key={ index }>
												<td>{ user.first_name + user.middle_name + ' ' + user.last_name }</td>
												<td>{ user.user_email }</td>
												<td>{ user.user_role }</td>
												<td>
													<button><a href={ `/aweb-users/${user.id}` }>{`Edit`}</a></button>
												</td>
												<td>{user.verified}</td>
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
}

export default AdminUsers;