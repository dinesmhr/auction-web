import React, { useState } from 'react';
import Header from '../header/Header';
import ImageUploader from 'react-images-upload';

export const ProductSubmitForm = (props) => {
	const [fileState, setFileState] = useState([]);

 	const handleFileUpload = e => {
    	setFileState(e.target.files[0]);
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
						<div className="aweb-Product-form-header">Enter the Details </div>   
							<div className="aweb-Product-Image">
							<label>Enter Product Image</label>
							<ImageUploader
								withIcon={false}
								buttonText={ 'Choose document image one' }
								onChange={handleFileUpload}
								imgExtension={['.jpg', '.png']}
								maxFileSize={5242880}
								singleImage={true}
								withPreview = {true}
							/>
							<button>Upload</button>
							</div>	
						<div className="aweb-Product-Name">
							<label for="Pname">Product Name</label>
							<input type="text" id="Pname" name="Pname" required/>	
						</div>

						<div className="aweb-Product-Description">
							<label for="PDescription">Product Description</label>
							<textarea id="PDec" name="PDec" rows="8" cols="50" required>
							Enter description
							</textarea>
						</div>

						<div className="aweb-Product-Address">
							<label for="Paddres">Product Address</label>
							<input type="text" id="Paddress" name="Paddress" required/>	
						</div>
						<div className="aweb-Product-Price">
							<label for="Pprice">Product Starting Price</label>
							<input type="number" id="Pprice" name="Pprice" required/>	
						</div>

						<div className="aweb-Product-Email">
							<label for="email">Enter email addresses:</label>
							<input type="email" id="email" name="email" required/>
						</div>
						<div className="aweb-Product-Phone">
							<label for="phone">Enter a phone number:</label>
							<input type="tel" id="phone" name="phone" required/>
						</div>
						<div className="aweb-Product-form-button">
						<button>Submit</button>
						</div>
					</div>
				</form>
			</div>
        </>
	)
}