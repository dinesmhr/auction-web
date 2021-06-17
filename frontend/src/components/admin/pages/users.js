import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'
import AdminMainNavigation from '../navigation/AdminMainNavigation'
import { BsDot } from "react-icons/bs";

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
			<div className="content-wrap">
				<AdminMainNavigation/>
				<div id="admin-right-content" className="float-right w-4/5 text-white p-8 h-screen mt-12">
					{ 
						users === null ? (
							<div id="admin-content-table" className="tracking-wider"><span className="grid p-4">Loading datas</span></div>
						) : users.length === 0 ? (
							<div id="admin-content-table" className="tracking-wider"><span className="grid p-4">No users found</span></div>
						) : (
							<div id="admin-content-table" className="tracking-wider">
								<div className="admin-content-table-row-heading grid grid-cols-4 flex flex-row font-semibold">
									<span className="py-4 px-14">Fullname</span>
									<span className="py-4 px-14">Email</span>
									<span className="py-4 px-14">Role</span>
									<span className="py-4 px-14">Actions</span>
								</div>
								{
									users.map( ( user, index )  => {
										return (	 
											<div key={ index } className="admin-content-table-row grid grid-cols-4 flex flex-row text-sm">
												<span className="py-2 px-11 flex"><BsDot className="mt-1"/><span className="px-2">{user.fullname}</span></span>
												<span className="py-2 px-11">{user.email}</span>
												<span className="py-2 px-11">{user.role}</span>
												<span className="py-2 px-14">
													<button className="bg-transparent py-1 px-4 hover:bg-blue-500 text-blue-700 font-semibold hover:text-white border border-blue-500 hover:border-transparent rounded"><Link to={`/aweb-users/${user.id}`}>Edit</Link></button>
												</span>
											</div>
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

export default AdminUsers;