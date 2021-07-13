import React from 'react'
import Header from '../../header/Header'
import Footer from '../../footer/Footer'

const WhySell = () => {
    return (
    <div id="auction-web">
        <Header/>
			<div className="h-full ml-16 mt-20 w-3/4 font-serif text-black mb-20">
		        	<div className="text-3xl uppercase text-gray-700 mb-8 bold">Why Sell</div>
		        	 <div className="">
		        		<h3 className="uppercase text-gray-700 text-xl mb-6 align-center">Why you’ll love selling on AuctionWeb</h3>
		        	</div>
		        		<div className=" flex flex-wrap">
		        			<div className="flex flex-col mb-7 w-1/2 p-12"><div className="text-indigo-800 text-xl w-6  mr-6">Easy Listing</div>
		        				<div className="mt-5 ">It’s easier than ever to list what you’re selling and get it seen by people looking for it.</div>
		        			</div>	
		        			<div className="flex flex-col mb-7 w-1/2 p-12"><div className="text-indigo-800 text-xl w-6  mr-6">Free listings</div>
		        				<div className="mt-5 ">List up to 200 items for free every month, and only pay when they sell!</div>
		        			</div>
		        			<div className="flex flex-col mb-7 w-1/2 p-12"><div className="text-indigo-800 text-xl w-6  mr-6">Seller protection</div>
		        				<div className="mt-5 ">Backed by powerful technology, a dedicated team, and proactive policies, eBay lets you sell with confidence.</div>
		        			</div>
		        			<div className="flex flex-col mb-7 w-1/2 p-12"><div className="text-indigo-800 text-xl w-6  mr-6">Many buyers</div>
		        				<div className="mt-5 ">We’re one of the world’s largest marketplaces, connecting you with buyers near and far.</div>
		        			</div>
						</div>

		        			<div className="mt-20 ">
		        			If you have a problem regarding selling or queries, please reach us at 
		        			<a className="mailto text-blue-900" href="mailto:contact@test.com"> Sellers@auctionweb.com </a>
		   			</div>
		    </div>

        <Footer/>
    </div>
    )
}
export default WhySell