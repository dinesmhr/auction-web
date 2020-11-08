import React from 'react';
import AdminMainNavigation from '../navigation/AdminMainNavigation'

const AdminProducts = (props) => {

	return (
		<>
		 	<header>           
                <div className="aweb-admin-top-header">
                    <h1 className="aweb-admin-site-title">Auction Web</h1>
                    <AdminMainNavigation userLoggedIn = {props.userLoggedIn}/> 
                    <table style={{width:"100%"}}>
						<thead>
							<tr>
								<th>Title</th>
								<th>Status</th>
							</tr>
						</thead>
						<tbody>
							
						</tbody>
					</table>					
                </div>
            </header>
		</>
	)
}
export default AdminProducts;