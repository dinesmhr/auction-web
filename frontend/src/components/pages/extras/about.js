import React from 'react'
import Header from '../../header/Header'
import Footer from '../../footer/Footer'

const About = () => {
    return (
    <div id="auction-web">
        <Header/>
        <div className="h-full ml-16 mt-20 w-3/4 font-serif text-gray-800 mb-20">
        	<div className="text-3xl uppercase uppercase text-gray-700 mb-8">About</div>
        		<div className="">
        			<p className="leading-7">Founded in 2020, AuctionWeb is a platform where there are sellers and buyers. Sellers can 
        			bid their product in the highest price possible and buyers can choose from different products
        			to different ranges to buy a product. It  specializes in the resale and remarketing of used,
        			wholesale and salvage title vehicles for a variety of Sellers, including insurance companies,
        			rental car companies, local municipalities, financial institutions and charities. AuctionWeb’s 
        			extensive inventory is housed on more than 8,000 acres of land and includes an array of vehicles
        			to ensure Members can find what they’re looking for from classics and exotics, early and 
        			late model cars and trucks, to industrial vehicles and more. AuctionWeb sells over two million 
        			vehicles each year, so there’s something for everyone: dismantlers, body shops, salvage buyers,
        			dealers and individual consumers.</p>
        		</div>
        			<div className="flex flex-row flex-wrap justify-around mt-16">	
        				<div className="w-2/5"><h2 className="uppercase text-yellow-600 text-2xl mb-2">buyers</h2>
        				<p className="leading-7">Our buyers bid and purchase properties using our superior technology platform. 
        				Buyers receive convenient access to property information, exclusive inventory,
        				 personalized property matches, onsite and online education, and customer support
        				  throughout the entire process.</p>
        				</div>

        				<div className="w-2/5"><h2 className="uppercase text-yellow-600 text-2xl mb-2">sellers</h2>
        				<p className="leading-7">Our sellers receive the nation’s largest and most reputable auction programs, 
        				an unrivaled marketing reach, and data intelligence and insights to move assets
        				 quickly. By leveraging digital and mobile technology, we amplify the reach and 
        				 exposure of assets on our platform.</p></div>
        			</div>
        </div>
        <Footer/>
    </div>
    )
}
export default About