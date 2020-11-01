import React, { Component } from 'react';
import { AdminRoutes } from './components/routes/adminRoutes'
import { PublicRoutes } from './components/routes/publicRoutes'
import Footer from './components/footer/Footer'
import './styles/App.css'

const axios = require('axios');

class App extends Component {
  constructor(props) {
    super(props)
    let userLoggedin
    if( sessionStorage.auctionWebSessionUserLogged === 'true' ) {
      userLoggedin = true
    } else {
      userLoggedin = false
    }
    this.state = {
      users: [],
      isLoaded: true,
      error: false,
      errorMessage: '',
      isLoggedin: userLoggedin
    }
  }

  async componentDidMount() {
    let _this = this
    const url = 'http://localhost/auction-web/api/users.php'
    axios.get(url)
    .then(function ( response ) {
        if( response.status === 200 ) {
            _this.setState({ 
              users : response.data.data,
              isLoaded: true,
              error: false
            })
        }
    })
    .catch(function (error) {
        _this.setState({ 
          isLoaded: false,
          error: true,
          errorMessage: error
        })
    })
    .then(function () {
        console.log( "Request Completed" )
    });
}

  render() {
    return (
      <div id="auction-web">
            <AdminRoutes users = { this.state.users } isLoggedin = { this.state.isLoggedin } />
            <PublicRoutes users = { this.state.users } isLoggedin = { this.state.isLoggedin } />
        <Footer />
      </div>
    );
  }
}
 
export default App;