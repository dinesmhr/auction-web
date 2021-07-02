import React, { Component } from 'react';


const Footer = () => {
    return ( 
        <footer>
        <div className="aweb-main-footer-wrap">
            <div className="upper-footer-wrap">
                <div class="footer-item">
                    <p className="text-gray-100 text-base mb-3 font-semibold mt-3">Company</p>
                    <ul>
                        <li className="text-gray-300 text mb-1 hover:text-gray-100"><a href="" target="_black">About</a></li>
                        <li className="text-gray-300 mb-1 hover:text-gray-100"><a href="" target="_blank">Auction Central News</a></li>
                        <li className="text-gray-300 mb-1 hover:text-gray-100"><a href="h" target="_blank">Careers</a></li>
                        <li className="text-gray-300 mb-1 hover:text-gray-100"><a href="" target="_blank">Get Help</a></li>
                        <li className="text-gray-300 mb-1 hover:text-gray-100"><a href="" target="_blank">Send Feedback</a></li>
                    </ul>
                </div>

               <div class="footer-item">  
                <p className="text-gray-100 text-base mb-3 font-semibold mt-3">Winning</p>
                    <ul>
                        <li className="text-gray-300 text mb-1 hover:text-gray-100"><a href="" target="_black">Auction Calender</a></li>
                        <li className="text-gray-300 mb-1 hover:text-gray-100"><a href="" target="_blank">Auction House Directory</a></li>
                        <li className="text-gray-300 mb-1 hover:text-gray-100"><a href="h" target="_blank">Auction Price Results</a></li>
                        <li className="text-gray-300 mb-1 hover:text-gray-100"><a href="" target="_blank">Auction Near Me</a></li>
                        <li className="text-gray-300 mb-1 hover:text-gray-100"><a href="" target="_blank">How Auction Works</a></li>
                    </ul>
                </div>

                <div class="footer-item">  
                <p className="text-gray-100 text-base mb-3 font-semibold mt-3">Selling</p>
                    <ul>
                        <li className="text-gray-300 text mb-1 hover:text-gray-100"><a href="" target="_black">Auction Sign-in</a></li>
                        <li className="text-gray-300 mb-1 hover:text-gray-100"><a href="" target="_blank">Become A Seller</a></li>
                        <li className="text-gray-300 mb-1 hover:text-gray-100"><a href="h" target="_blank">Consign an Item</a></li>
                        <li className="text-gray-300 mb-1 hover:text-gray-100"><a href="" target="_blank">Seller Resource Center</a></li>
                        <li className="text-gray-300 mb-1 hover:text-gray-100"><a href="" target="_blank">Seller Review</a></li>
                        <li className="text-gray-300 mb-1 hover:text-gray-100"><a href="" target="_blank">Why Sell</a></li>
                    </ul>
                </div>
            </div>

            <div className="lower-footer-wrap">
                <p className="text-gray-300 flex justify-center mt-5"><span>&copy;</span> 2020-2021 AuctionWeb. All Rights Reserved</p>
                <p className="text-gray-300 flex justify-center text-sm">This site is protected by reCAPTCHA and the Google Terms of service and Privacy Policy apply</p>
            </div>
        </div>
        </footer>
    );
}
 
export default Footer;