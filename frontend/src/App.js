import React, { useState, useEffect, useRef } from 'react';
import { AdminRoutes } from './components/routes/adminRoutes'
import { PublicRoutes } from './components/routes/publicRoutes'
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
    </appContext.Provider>
  );
}
 
export default App;