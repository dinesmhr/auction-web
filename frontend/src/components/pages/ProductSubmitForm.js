import React, { useState } from 'react';
import Header from '../header/Header';
import MultiImageInput from 'react-multiple-image-input';
import DatePicker from "react-datepicker";
import TimezoneSelect from 'react-timezone-select';

export const ProductSubmitForm = (props) => {
	const [ImageFiles, setImageFiles] = useState({});
    const [startDate, setStartDate] = useState(new Date());
    const [selectedTimezone, setSelectedTimezone] = useState({});
	const crop = {
		unit: '%',
		aspect: 4 / 4,
		height: '100'
	};

	const { isLoggedin } = props
	if( !isLoggedin ) {
		return (
			<>
				<Header userLoggedIn = { isLoggedin }/> 
				<div id="auction-web-product-submit-page">
					{ 'You must be logged in to submit your product' }
					<div className="aweb-redirect-button">
						<a href="/login" target="_blank">{ 'Proceed to login page' }</a>
					</div>
				</div>
			</>
		)
	}

	return (
		<>
			<Header userLoggedIn = { isLoggedin }/> 
			<div id="auction-web-product-submit-page">
				<form id="aweb-Product-form">
					<div className="aweb-Product-form-wrapper">
						<div className="aweb-Product-form-header">Enter the Details</div>						
							<div className="aweb-Product-Image">  	
							<label>Enter Product Images:</label>
							<MultiImageInput
      							images={ImageFiles}
     					 		setImages={setImageFiles}
     					 		max={5}
      							cropConfig={{ crop, ruleOfThirds: true }}
   							 />
							</div>	
						<div className="aweb-Product-Name">
							<label htmlFor="Pname">Product Name:</label>
							<input type="text" id="Pname" name="Pname" required/>	
						</div>

						<div className="aweb-Product-Description">
							<label htmlFor="PDescription">Product Description:</label><br/>
							<textarea id="PDec" name="PDec" rows="8" cols="50" required placeholder="Enter Description">
							</textarea>
						</div>
						<div className="aweb-Product-Specification">
							<label htmlFor="PSpec">Product Specification/Feature</label><br/>
							<textarea name="Text1" cols="40" rows="5"></textarea>
						</div>
						<div className="aweb-Product-Category">
							<label htmlFor="PCat">Product Category:</label>
						 <select name="Category" id="PCat" name="PCat" required>	
							<option value="">Appliances</option> 
							<option value="">Apps & Games</option>
							<option value="">Arts, Crafts, & Sewing</option>
							<option value="">Automotive Parts & Accessories</option>
							<option value="">Baby</option>
							<option value="">Beauty & Personal Care</option>
							<option value="">Books</option>
							<option value="">CDs & Vinyl</option>
							<option value="">Cell Phones & Accessories</option>
							<option value="">Clothing, Shoes and Jewelry</option>
							<option value="">Collectibles & Fine Art</option>
							<option value="">Computers</option>
							<option value="">Electronics</option>
							<option value="">Garden & Outdoor</option>
							<option value="">Grocery & Gourmet Food</option>
							<option value="">Handmade</option>
							<option value="">Health, Household & Baby Care</option>
							<option value="">Home & Kitchen</option>
							<option value="">Industrial & Scientific</option>
							<option value="">Real Estate</option>
							<option value="">Luggage & Travel Gear</option>
							<option value="">Movies & TV</option>
							<option value="">Musical Instruments</option>
							<option value="">Office Products</option>
							<option value="">Pet Supplies</option>
							<option value="">Premium Beauty</option>
							<option value="">Sports & Outdoors</option>
							<option value="">Tools & Home Improvement</option>
							<option value="">Toys & Games</option>
							<option value="">Video Games</option>
 						 </select>
						</div>
						<div className="aweb-Product-Tag">
							<label htmlFor="PCat">Product Tag:</label>
							<input type="text" id="Ptag" name="PTag" placeholder="Example: #book #harrypotter"/>	
						</div>
						<div className="aweb-Product-Deadline">
							<label htmlFor="PDead">Product Bid Deadline:</label>
							 <DatePicker required selected={startDate} onChange={date => setStartDate(date)}/>	
						</div>
						<div className="aweb-Product-Time">
							<label htmlFor="PDt">Product Deadline Time:</label>
							<input type="time" id="P" name="pDt" required/>
						</div>
							<div className="aweb-Product-timezone">
							<label htmlFor="PTz">enter your Timezone:</label>
							<TimezoneSelect
          							value={selectedTimezone}
         							 onChange={setSelectedTimezone}
         							 required
       						/>
						</div>
						<div className="aweb-Product-Address">
							<label htmlFor="Paddres">Product Address:</label>
							<input type="text" id="Paddress" name="Paddress" required/>	
						</div>
						<div className="aweb-Product-Price">
							<label htmlFor="Pprice">Product Starting Price [in Dollar(USD)]:</label>
							<input type="number" id="Pprice" name="Pprice" required/>	
						</div>
						<div className="aweb-Product-Email">
							<label htmlFor="email">Enter your email addresses:</label>
							<input type="email" id="email" name="email" required/>
						</div>
						<div className="aweb-Product-Phone">
							<label htmlFor="phone">Enter Your phone number:</label>
							<input type="tel" id="phone" name="phone" required/>
						</div>
							<div className="aweb-Product-form-button">
							<button className="aweb-product-submit-button">Submit</button>
						</div>			
					</div>
				</form>
			</div>
        </>
	)
}