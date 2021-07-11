import React from 'react'
import Header from '../../header/Header'
import Footer from '../../footer/Footer'

const BecomeSeller = () => {
    return (
    <div id="auction-web">
        <Header/>
			<div className="h-full ml-16 mt-20 w-3/4 font-serif text-black mb-20">
		        	<div className="text-3xl uppercase text-gray-700 mb-8 bold">Become a Seller</div>

		        		<div className="">
		        			<div className="flex flex-row mb-7"><span className="w-6 text-6xl text-indigo-900 mr-6">1</span>
		        				<div className="mt-5 ml-2"> Sign up on AuctionWeb.</div>
		        			</div>	
		        			<div className="flex flex-row mb-7"><span className="w-6 text-6xl text-indigo-900 mr-6">2</span>
		        				<div className="mt-5 ml-2"> Login and put in your details to verify your account.</div>
		        			</div>
		        			<div className="flex flex-row mb-7"><span className="w-6 text-6xl text-indigo-900 mr-6">3</span>
		        				<div className="mt-5 ml-2"> Wait for the admin to verify your account.</div>
		        			</div>
		        			<div className="flex flex-row mb-7"><span className="w-6 text-6xl text-indigo-900 mr-6">4</span>
		        				<div className="mt-5 ml-2"> You can sell the products now.</div>
		        			</div>
						</div>

						<div className="mt-20 text-gray-800 tracking-wide text-sm">
							<p className=""> Note: Please note that you may not be verified if you do not put in valid details or
						 any malicious activity is found.</p>
						</div>

		        			<div className="mt-20 ">
		        			If you have a problem regarding selling or verification, please reach us at 
		        			<a className="mailto text-blue-900" href="mailto:contact@test.com"> Sellers@auctionweb.com </a>
		   			</div>
		    </div>
        <Footer/>
    </div>
    )
}
export default BecomeSeller