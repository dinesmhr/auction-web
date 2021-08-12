import React, { Component } from 'react';
import { AiFillFacebook } from "react-icons/ai";
import { AiFillInstagram } from "react-icons/ai";
import { AiFillLinkedin } from "react-icons/ai";
import { AiFillTwitterSquare } from "react-icons/ai";
import { AiFillYoutube } from "react-icons/ai"



const Footer = () => {
    return ( 
        <footer>
        <div className="aweb-main-footer-wrap">
            <div className="upper-footer-wrap">
                <div className="footer-item">
                    <p className="text-gray-100 text-base mb-3 font-semibold mt-3">Company</p>
                    <ul>
                        <li className="mb-2 text-gray-300 text mb-1 hover:text-gray-100"><a href="about" target="_black">About</a></li>
                        <li className="mb-2 text-gray-300 mb-1 hover:text-gray-100"><a href="/auction-central-news" target="_blank">Auction Central News</a></li>
                        <li className="mb-2 text-gray-300 mb-1 hover:text-gray-100"><a href="/careers" target="_blank">Careers</a></li>
                        <li className="mb-2 text-gray-300 mb-1 hover:text-gray-100"><a href="/get-help" target="_blank">Get Help</a></li>
                        <li className="mb-2 text-gray-300 mb-1 hover:text-gray-100"><a href="/send-feedback" target="_blank">Send Feedback</a></li>
                        <li className="mb-2 text-gray-300 mb-1 hover:text-gray-100"><a href="/contact" target="_blank">Contact Us</a></li>
                        </ul>
                </div>

               <div className="footer-item">  
                <p className="text-gray-100 text-base mb-3 font-semibold mt-3">Social Handles</p>
                    <ul>
                        <li className="mb-2  flex flex-row text-gray-300 text mb-1 hover:text-gray-100 flex"><a href="https://www.facebook.com/" target="_black"><div className="flex flex-row"><AiFillFacebook className="text-xl mr-1"/>Facebook</div></a></li>
                        <li className="mb-2 text-gray-300 mb-1 hover:text-gray-100"><a href="https://www.instagram.com/" target="_blank"><div className="flex flex-row"><AiFillInstagram className="text-xl mr-1"/>Instagram</div></a></li>
                        <li className="mb-2 text-gray-300 mb-1 hover:text-gray-100"><a href="https://www.linkedin.com/" target="_blank"><div className="flex flex-row"><AiFillLinkedin className="text-xl mr-1"/>Linkedin</div></a></li>
                        <li className="mb-2 text-gray-300 mb-1 hover:text-gray-100"><a href="https://twitter.com/?lang=en" target="_blank"><div className="flex flex-row"><AiFillTwitterSquare className="text-xl mr-1"/>Twitter</div></a></li>
                        <li className="mb-2 text-gray-300 mb-1 hover:text-gray-100"><a href="https://www.youtube.com/" target="_blank"><div className="flex flex-row"><AiFillYoutube className="text-xl mr-1"/>Youtube</div></a></li>
                    </ul>
                </div>

                <div className="footer-item">  
                <p className="text-gray-100 text-base mb-3 font-semibold mt-3">Selling</p>
                    <ul>
                        <li className="mb-2 text-gray-300 text mb-1 hover:text-gray-100"><a href="login" target="_black">Auction Sign-in</a></li>
                        <li className="mb-2 text-gray-300 mb-1 hover:text-gray-100"><a href="become-seller" target="_blank">Become A Seller</a></li>
                        <li className="mb-2 text-gray-300 mb-1 hover:text-gray-100"><a href="resource-center" target="_blank">Seller Resource Center</a></li>
                        <li className="mb-2 text-gray-300 mb-1 hover:text-gray-100"><a href="seller-review" target="_blank">Seller Review</a></li>
                        <li className="mb-2 text-gray-300 mb-1 hover:text-gray-100"><a href="why-sell" target="_blank">Why Sell</a></li>
                    </ul>
                </div>
            </div>

            <div className="lower-footer-wrap">
                <p className="text-gray-300 flex justify-center mt-10"><span>&copy;</span> 2020-2021 AuctionWeb. All Rights Reserved</p>
                <p className="text-gray-300 flex justify-center text-sm">This site is protected by reCAPTCHA and the Google Terms of service and Privacy Policy apply</p>
            </div>
        </div>
        </footer>
    );
}
 
export default Footer;