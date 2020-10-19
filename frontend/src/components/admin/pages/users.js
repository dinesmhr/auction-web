  
import React, { Component, useEffect, useState } from 'react';
import AdminMainNavigation from '../navigation/AdminMainNavigation'
import axios from 'axios';


const AdminUsers =(props) =>{


	const [id, setID] = useState();
	const [username, setUsername] = useState();
	const [password, setPassword] = useState();
	const [email, setEmail] = useState();


	useEffect(()=>{
		async function getData() {
			const res = await axios.get(`http://localhost/auction-web/api/users.php`) 
		

			setID(res.data.data[0].id);
			setUsername(res.data.data[0].username);
			setPassword(res.data.data[0].password);
			setEmail(res.data.data[0].email);
		}
		getData();
	})


	

	return (
		<>
		 <header>           
                <div className="aweb-admin-top-header">
                    <h1 className="aweb-admin-site-title">Auction Web</h1>
                    <AdminMainNavigation userLoggedIn = {props.userLoggedIn}/> 
                    	<table style={{width:"100%"}}>
                    		<thead>
								  <tr>
								    <th>ID</th>
								    <th>Username</th>
								    <th>Password</th>
								    <th>Email</th>
								  </tr>
							</thead>
							<tbody>
								<tr>
								    <td>{id}</td>
								    <td>S{username}</td>
								    <td>{password}</td>
								    <td>{email}</td>
								  </tr>								  					 
							</tbody>	  
					</table>					
                </div>
            </header>
		</>

		)


}


export default AdminUsers;