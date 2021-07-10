import React from 'react'
import Header from '../../header/Header'
import Footer from '../../footer/Footer'

const GetHelp = () => {
    return (
    <div id="auction-web">
        <Header/>
			<div className="h-full ml-16 mt-20 w-3/4 font-serif text-gray-800 mb-20">
		        	<div className="text-3xl uppercase text-red-700 mb-8 bold">Get Help</div>
		        	 <div className="">
		        		<h2 className="uppercase text-gray-800 text-xl mb-6">FAQ (Frequently Asked Questions)</h2>
		        	</div>

		        	<div className="">
		        		<div className="font-semibold"><span className="mr-2">&#8226;</span>How does AuctionWeb work? 
		        			<div className="font-normal ml-8 mt-1 mb-10">AuctionWeb is a platform where verified 
		        				sellers can sell their products in a given period of time to the buyers who are 
		        				willing to pay the highest price for it. You can buy or sell item(s) here. This
		        				platform gives buyers an opportunity to bid from the comfort of their homes. AuctionWeb 
		        				is a first come first serve service like in real auctions, the bidder who bids first, changes 
		        				the price of the item.</div>
		        			</div>
		        		<div className="font-semibold"><span className="mr-2">&#8226;</span>Is the seller trustable?
		        		<div className="font-normal ml-8 mt-1 mb-10">Yes, we only let those sellers sell who ahve been verified,
		        		so the sellers are trustable.</div>
		        			</div>

		        		<div className="font-semibold"><span className="mr-2">&#8226;</span>Is the buyer trustable?
		        		<div className="font-normal ml-8 mt-1 mb-10">Yes, the buyers have to be verified before eligible for buying,
		        		so the buyers who are verified are trustable</div>
		        			</div>

		        	    <div className="font-semibold"><span className="mr-2">&#8226;</span>Can I return back the item if I am not satisfied?
		        	    <div className="font-normal ml-8 mt-1 mb-10">It depends on the seller, you would have to talk personally with
		        	    the seller to return the item.</div>
		        			</div>

		        		<div className="font-semibold"><span className="mr-2">&#8226;</span>How long will auction for particular item go on?
		        		<div className="font-normal ml-8 mt-1 mb-10">The seller determines the time period of the form. The countdown is
		        		given for the time period on the website.</div>
		        			</div>

		        		<div className="font-semibold"><span className="mr-2">&#8226;</span>Is the home delivery available?
		        		<div className="font-normal ml-8 mt-1 mb-10">Yes, home delivery is available with delivery charges, which varies from places. Contact your seller, or
		        		contact us for home delivery.</div>
		        			</div>
		        	</div>
		        	
		        	<div className="mt-20 ">
			        	If you have any queries/inquiry, please contact us at 
			        	 <a className="mailto text-blue-900" href="mailto:contact@test.com"> queries@auctionweb.com </a>
		        	</div>
		     </div>        	
        <Footer/>
    	</div>
    )
}
export default GetHelp