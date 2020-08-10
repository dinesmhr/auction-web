import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Header from './components/header/Header'
import Footer from './components/footer/Footer'
import Home from './components/pages/Home'
import Shop from './components/pages/Shop'
import Login from './components/pages/Login'
import './styles/App.css'

class App extends Component {
  render() { 
    return (
      <BrowserRouter>
        <div id="auction-web">
          <Header />
            <Switch>
              <Route path="/" exact component={Home}></Route>
              <Route path="/shop" component={Shop}></Route>
              <Route path="/login" component={Login}></Route>
            </Switch>
          <Footer />
        </div>
      </BrowserRouter>
    );
  }
}
 
export default App;