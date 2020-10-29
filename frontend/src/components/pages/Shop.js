import React, { Component } from 'react';
import Header from '../header/Header';

const Card=()=>{
    return(
        <>
            <div className="product-card">
                <a href="/">
                    <img src="https://images.pexels.com/photos/2113994/pexels-photo-2113994.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260" alt=""/>
                </a>
                  <div className="product-box">
                      <h3 title="watch">
                        <a href="/">watch product 1</a>
                      </h3>
                         <p>Description</p>
                         <h4>Nrs 2000</h4>
                         <button>Bid Item</button>
                  </div>
            </div>
        </>
    );
}

class Shop extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {      
        const { isLoggedIn } = this.props
        return ( 
            <>            
            <Header userLoggedIn = { isLoggedIn }/> 
            <div id="auction-web-shop" className="page--shop main-wrapper"> 
           	    <div className="product-wrap">                    	                                                  
            			<Card />
            			<Card />
            			<Card />
            			<Card />
            	</div>
            </div>
           </>
        );
    }
}
export default Shop;
