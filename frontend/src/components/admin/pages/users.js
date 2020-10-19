import React, { Fragment, useEffect, useState } from 'react';
import AdminMainNavigation from '../navigation/AdminMainNavigation'

const AdminUsers =(props) => {
	const { users }  = props
	//  const [id, setID] = useState();
	//  const [username, setUsername] = useState();
	//  const [password, setPassword] = useState();
	//  const [email, setEmail] = useState();

	//  useEffect(()=>{
	//  	async function getData() {
	//  		const res = await axios.get(`http://localhost/auction-web/api/users.php`) 
	//  		setID(res.data.data[0].id);
	//  		setUsername(res.data.data[0].username);
	//  		setPassword(res.data.data[0].password);
	//  		setEmail(res.data.data[0].email);
 	// }
	//  	getData();
	//  })

	return (
		<Fragment>
		 	<header>           
                <div className="aweb-admin-top-header">
                    <h1 className="aweb-admin-site-title">Auction Web</h1>
                    <AdminMainNavigation userLoggedIn = {props.userLoggedIn}/> 
                    	<table style={{width:"100%"}}>
                    		<thead>
								  <tr>
								    <th>Username</th>
								    <th>Email</th>
									<th>Role</th>
									<th>Actions</th>
								  </tr>
							</thead>
							<tbody>
								{
									users.map( ( user, index )  => {
										return (	 
											<tr key={ index }>
												<td>{user.username}</td>
												<td>{user.email}</td>
												<td>{`Adminstrator`}</td>
												<td>
													<button>{`Edit`}</button>
													<button>{`Delete`}</button>
												</td>
											</tr>
										)
									})
								}
							</tbody>
							 
								  				 
								  
					</table>					
                </div>
            </header>
		</Fragment>
	)
}
export default AdminUsers;