import React, { Component } from 'react';
import AdminNavigation from '../navigation/AdminNavigation'
import MainNavigation from '../navigation/MainNavigation'

class Header extends Component {
    constructor(props) {
        super(props)
    }
    render() { 
        const { userLoggedIn } = this.props
        return (         	
<<<<<<< HEAD
            <header> 
            <nav id="aweb-main-navigation">
            		<div className="aweb-header">              	
                						<div className="aweb-site-title">Auction Web</div> 
            		</div>
                <MainNavigation userLoggedIn = {this.props.userLoggedIn}/>
                </nav> 
=======
            <header>
                { userLoggedIn &&
                    <AdminNavigation />
                }
                <div className="aweb-header">
                    <h1 className="aweb-site-title"><a href="/">Auction Web</a></h1>
                    <MainNavigation userLoggedIn = { userLoggedIn } />
                </div>
>>>>>>> 8759ddd576951e0c27784732e2f14dc56d3a1d04
            </header>
        );
    }
}
 
export default Header;