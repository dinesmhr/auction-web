import React, { useState, useEffect } from 'react';
import { AdminRoutes } from './components/routes/adminRoutes'
import { PublicRoutes } from './components/routes/publicRoutes'
import Footer from './components/footer/Footer'
import './styles/App.css'

const axios = require('axios');

export const appContext = React.createContext()

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
    <appContext.Provider value={ {isLoggedIn, updateLoggedInStatus} }>
      <AdminRoutes />
      <PublicRoutes/>
      <Footer />
    </appContext.Provider>
  );
}
 
export default App;