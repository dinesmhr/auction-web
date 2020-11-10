import React, { useState } from 'react';
import Header from '../header/Header';
import axios from 'axios';


const ProductForm =()=>{

const [ selectedFile, newSelectedFile ] = useState(null);

const fileSelectedHandler =(event)=>{
	newSelectedFile({event.target.file[0]});
}

const fileUploadHandler =()=>{
	axios.post('')
}

	return {
		<>
			<form id="aweb-Product-form">
            <div className="aweb-Product-form-wrapper">
            	<div className="aweb-Product-form-header">Enter the Details </div>   
            	 <div className="aweb-Product-Image">    	
 					 <input type="file" id="myFile" required name="filename" onChange ={fileSelectedHandler} />
 					 <button onClick={fileUploadHandler}>Upload</button>
				</div>	
 				<div className="aweb-Product-Name">
					<label for="Pname">Product Name</label>
  					<input type="text" id="Pname" name="Pname" required/>	
 				</div>

 				<div className="aweb-Product-Description">
					<label for="PDescription">Product Description</label>
					<textarea id="w3review" name="w3review" rows="8" cols="50" required>
  					Enter description
  					</textarea>
 				</div>

 				<div className="aweb-Product-Address">
 					<label for="Pname">Product Name</label>
  					<input type="text" id="Pname" name="Pname" required/>	
 				</div>

 				<div className="aweb-Product-Email">
					 <label for="emails">Enter email addresses:</label>
  					<input type="email" id="emails" name="emails" required/>
 				</div>
 				<div className="aweb-Product-Phone">
 					 <label for="phone">Enter a phone number:</label><br><br>
 					 <input type="tel" id="phone" name="phone" required/>
 				</div>
 				<div className="aweb-Product-Legal-Documents">
 						<div className="aweb-Product-Legal-Documents">    	
 					 <input type="file" id="myFile" name="filename" required/>
 					 <button>Upload</button>
				</div>	
 				</div>


            </div>
        </form>
        <>
	}
}
