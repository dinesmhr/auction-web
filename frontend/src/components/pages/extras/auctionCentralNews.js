import React from 'react'
import Header from '../../header/Header'
import Footer from '../../footer/Footer'

const AuctionCentralNews = () => {
    return (
    <div id="auction-web">
        <Header/>
       	<div className="h-full ml-16 mt-20 w-3/4 font-serif text-gray-800 mb-20">
        	<div className="text-3xl uppercase text-gray-700 mb-8 bold">Auction Central News</div>
        		<div className="">
        			<p className="leading-7">International in scope, with global headquarters in Manhattan’s Chelsea 
        			district, Auction Central News (ACN) is the foremost online source for current news and 
        			specialist information pertaining to the fine art, antiques and auction sector. Produced
        			 by LiveAuctioneers as a courtesy to the online-bidding community it serves, ACN is a
        			 one-stop source for authoritative reports, columns, interviews with industry insiders, 
        			 recent auction prices and previews of upcoming auctions. Since its launch in 2007, ACN 
        			 has published more than 14,000 articles of interest to collectors and aficionados 
        			 worldwide. Auction Central News has an outstanding team of reporters and columnists in 
        			 the United States, United Kingdom, Germany and Italy. The operation is led by Editor-in-Chief 
        		     Catherine Saunders-Watson, an award-winning journalist, author and PR executive with a 25-year
        			 track record in arts media. Unlike any other digital news portal reporting on the auction business, 
        			 ACN takes a timely approach by providing its readership a constant stream of fresh news, columns, images
        			 and video from premier wire services, including the Associated Press and Agence France Presse. At the same
        			 time, ACN encourages grassroots input in the form of press releases and news tips from auctioneers
        			 , PR firms, dealers and collectors. ACN keeps followers up to date through Twitter, Facebook 
        			 and via ACN Daily Headlines, which is emailed free of charge to opt-in subscribers. Auction 
        			 Central News also incorporates Style Century Magazine, a publication within a publication that
        			 includes top-quality feature articles about the designers, art and antiques of interest to today’s 
        			 collectors. It’s like the Sunday magazine section of an international newspaper — crisp, clean and
        			 unique in its mix of subject matter — but available anytime online.</p>
        		</div>

        			<div className="mt-20">	
        				<div className=""><h2 className="uppercase text-gray-800 text-xl mb-6">Work with An Experienced Team </h2>
        				</div>
        				<div><p>AuctionWeb advertising team is expert at optimizing advertising efforts through data-driven insights and personalization.</p></div>
        				<div className="mt-6">
        					<ul className="list-outside list-disc">
        						<li className="text-gray-800 mb-2"><span className="mr-2">&#8226;</span>In-house editorial content</li>
        						<li className="text-gray-800 mb-2"><span className="mr-2">&#8226;</span>Premium website placement</li>
        						<li className="text-gray-800 mb-2"><span className="mr-2">&#8226;</span>Category-targeted placement</li>
        						<li className="text-gray-800 mb-2"><span className="mr-2">&#8226;</span>Mobile responsive advertising</li>
        						<li className="text-gray-800 mb-2"><span className="mr-2">&#8226;</span>Auction Calendar Ads</li>
        						<li className="text-gray-800 mb-2"><span className="mr-2">&#8226;</span>Social Media Promotion</li>
        					</ul>
        				</div>
        			</div>

        			<div className="mt-20 item-center font-semibold	">
        			Contact us on <a className="mailto text-blue-900" href="mailto:contact@test.com">Auction@auctionweb.com </a> for more information.
        			</div>
        		</div>
        <Footer/>
    </div>
    )
}
export default AuctionCentralNews