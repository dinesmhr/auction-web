import React from 'react'
import Header from '../../header/Header'
import Footer from '../../footer/Footer'

const Careers = () => {
    return (
    <div id="auction-web">
        <Header/>
			<div className="h-full ml-16 mt-20 w-3/4 font-serif text-gray-800 mb-20">
		        	<div className="text-3xl uppercase text-gray-700 mb-8 bold">Career Opportunities</div>
		        		<div className="">
		        			<p className="leading-7">As a global organization, we operate in an environment without
		        			 boundaries, creating a dynamic atmosphere of energy and excitement, career development
		        			 and growth. With AuctionWeb's commitment to diversity, our colleagues have unparalleled 
		        			 expertise and passion, spanning over 70 specialities. While we have a venerable history,
		        			 today we are a dynamic, 21st century organization committed to innovation. AuctionWeb has
		        			 recognised that great works of art, fashion, real estate as well as the collectors interested in 
		        			 consigning and acquiring them, inhabit the global sphere. At AuctionWeb, we are always happy to
		        			 welcome applications and enquiries. </p>
		        		</div>

		        			<div className="mt-20 ">
		        			If you are interested in employment opportunities
		        			 at any of our AuctionWeb's offices, please send us your CV and resume at <a className="mailto text-blue-900" href="mailto:contact@test.com">Careers@auctionweb.com </a>
		        			</div>
		     </div>
        <Footer/>
    </div>
    )
}
export default Careers