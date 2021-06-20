import React, { useState, useEffect } from 'react';
import { AdminRoutes } from './components/routes/adminRoutes'
import { PublicRoutes } from './components/routes/publicRoutes'
import Footer from './components/footer/Footer'
import './styles/App.css'

const axios = require('axios');

const App = () => {
  const [ isLoggedIn, setIsLoggedIn ] = useState(false)

  // 
  const updateLoggedInStatus = () => {
    setIsLoggedIn(!isLoggedIn)
  }

  useEffect(() => {
    axios.get( '/sessions.php' )
    .then(function(res) {
      setIsLoggedIn( res.data.login )
    })
  }, [isLoggedIn])

  return (
    <>
      <AdminRoutes isLoggedIn = { isLoggedIn } />
      <PublicRoutes isLoggedIn = { isLoggedIn } updateLoggedInStatus = { updateLoggedInStatus }/>
      <Footer />
    </>
  );
}
 
export default App;