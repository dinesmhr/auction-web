import React, { useState } from 'react';
import Header from '../header/Header';
import MultiImageInput from 'react-multiple-image-input';
import DatePicker from "react-datepicker";
import { Multiselect } from 'multiselect-react-dropdown';
const axios = require('axios');

export const ProductSubmitForm = (props) => {
	const [ImageFiles, setImageFiles] = useState({});
	const [Pname, setPname] = useState('');
	const [PDescription, setPDescription] = useState('');
	const [PSpec, setPSpec] = useState('');
	const [Pcats, setPcats] = useState([]);
	const [Ptag, setPtag] = useState('');
    const [deadlineDate, setDeadlineDate] = useState(new Date());
	const [Paddress, setPaddress] = useState('');
	const [Pprice, setPprice] = useState('');
	const [email, setEmail] = useState('');
	const [phone, setPhone] = useState('');
	const [errorStatus, seterrorStatus] = useState(false);
	const [errorMessage, seterrorMessage] = useState('');
	const [submitButtonText, setsubmitButtonText] = useState('Submit');
	const crop = {
		unit: '%',
		aspect: 4 / 4,
		height: '100'
	};

	const options =  [
		{ name: 'Appliances', id: 1},
		{ name: 'Apps & Games', id: 2}
	]

	const onsubmit = (e) => {
		e.preventDefault()
        const url = 'http://localhost/auction-web/api/edit-table/edit-products.php'
        axios.post( url, {
            params: {
                images : ImageFiles,
                name : Pname,
                description : PDescription,
                specification : PSpec,
                initial_price : Pprice,
                email : email,
                contact_number : phone,
                seller_id : localStorage.auctionWebSessionUserId,
				category_ids : Pcats,
				tags: Ptag,
				bid_deadline: deadlineDate,
				address: Paddress,
                submit: true
            }
        })
        .then(function(response) {
			console.log( response.data );
            if( response.data.status ) {
				setsubmitButtonText( 'Your product is submitted to administration' )
            }
		})
		//seterrorStatus('false'),
		//seterrorMessage('Product form submitted'),
	}
	
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
							<input type="text" id="Pname" name="Pname" value={Pname} onChange={(e) => setPname(e.target.value) } required/>	
						</div>

						<div className="aweb-Product-Description">
							<label htmlFor="PDescription">Product Description:</label><br/>
							<textarea id="PDescription" name="PDescription" rows="8" cols="50" value={PDescription} required placeholder="Enter Description" onChange={(e) => setPDescription(e.target.value)}>
							</textarea>
						</div>
						<div className="aweb-Product-Specification">
							<label htmlFor="PSpec">Product Specification/Feature</label><br/>
							<textarea name="PSpec" cols="40" rows="5" value={ PSpec } onChange={(e) => setPSpec(e.target.value)}>
							</textarea>
						</div>
						<div className="aweb-Product-Category">
							<label htmlFor="PCat">Product Category:</label>
							<Multiselect
								options={options}
								selectedValues={Pcats}
								placeholder={'Select categories'}
								onSelect={(selectedList) => setPcats(selectedList)}
								onRemove={(selectedList) => setPcats(selectedList)}
								displayValue="name"
							/>
						</div>
						<div className="aweb-Product-Tag">
							<label htmlFor="Ptag">Product Tag:</label>
							<input type="text" id="Ptag" name="PTag" placeholder="Example: #book #harrypotter" value={Ptag} onChange={ (e) => setPtag(e.target.value) }/>
						</div>
						<div className="aweb-Product-Deadline">
							<label htmlFor="PDead">Product Bid Deadline:</label>
							 <DatePicker required selected={deadlineDate} onChange={ (date) => setDeadlineDate(date) }/>	
						</div>
						{/* <div className="aweb-Product-Time">
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
						</div> */}
						<div className="aweb-Product-Address">
							<label htmlFor="Paddres">Product Address: ( optional )</label>
							<input type="text" id="Paddress" name="Paddress" value={ Paddress } onChange={ (e) => setPaddress(e.target.value) }/>	
						</div>
						<div className="aweb-Product-Price">
							<label htmlFor="Pprice">Product Starting Price [in Dollar(USD)]:</label>
							<input type="number" id="Pprice" name="Pprice" value={Pprice} required onChange={ (e) => setPprice(e.target.value) }/>
						</div>
						<div className="aweb-Product-Email">
							<label htmlFor="email">Enter your email addresses:</label>
							<input type="email" id="email" name="email" value={email} required onChange={ (e) => setEmail(e.target.value) }/>
						</div>
						<div className="aweb-Product-Phone">
							<label htmlFor="phone">Enter Your phone number:</label>
							<input type="text" id="phone" name="phone" value= {phone} required onChange={ (e) => setPhone(e.target.value) }/>
						</div>
							<div className="aweb-Product-form-button">
							<button className="aweb-product-submit-button" onClick={(e) => onsubmit(e) }>{submitButtonText}</button>
						</div>			
					</div>
				</form>
			</div>
        </>
	)
}