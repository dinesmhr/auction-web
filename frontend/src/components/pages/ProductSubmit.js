import React, { useState, useEffect } from 'react';
import Header from '../header/Header';
import DatePicker from "react-modern-calendar-datepicker";
import ModalImage from "react-modal-image";
import { GrAdd } from "react-icons/gr";
import { AiOutlineDelete } from "react-icons/ai";

const axios = require('axios');

const options =  [
	{ name: 'Appliances', id: 1},
	{ name: 'Apps & Games', id: 2},
	{ name: 'Arts, Crafts & Sewing', id: 3},
	{ name: 'Automotive Parts & Accessories', id: 4},
	{ name: 'Babies', id: 5},
	{ name: 'Beauty & Personal Care', id: 6},
	{ name: 'Books', id: 7},
	{ name: 'CDs & Vinyl', id: 8},
	{ name: 'Cell Phones & Accessories', id: 9},
	{ name: 'Clothing, Shoes & Jwelleries', id: 10},
	{ name: 'Collectibles & Fine Arts', id: 11},
	{ name: 'Computers', id: 12},
	{ name: 'Electronics', id: 13},
	{ name: 'Garden & Outdoor', id: 14},
	{ name: 'Grocery & Gourmet Food', id: 15},
	{ name: 'Handmade', id: 16},
	{ name: 'Health, Household & Baby Care', id: 17},
	{ name: 'Home & Kitchen', id: 18},
	{ name: 'Industrial & Scientific', id: 19},
	{ name: 'Real Estate', id: 20},
	{ name: 'Luggage & Travel Gear', id: 21},
	{ name: 'Movies & TV', id: 22},
	{ name: 'Musical Instruments', id: 23},
	{ name: 'Office Products', id: 24},
	{ name: 'Pet Supplies', id: 25},
	{ name: 'Premium Beauty', id: 26},
	{ name: 'Sports & Outdoors', id: 27},
	{ name: 'Tools & Home Improvement', id: 28},
	{ name: 'Toys & Games', id: 29},
	{ name: 'video Games', id: 30}
]

const imagesRef = React.createRef()

const ProductSubmit = (props) => {
	const [userId, setUserId] = useState('')
    const [userStatus, setUserStatus] = useState('')

	const [title, setTitle] = useState({value: ''});
	const [description, setDescription] = useState({value: ''});
	const [specifications, setSpecifications] = useState({value: [{value:''}]});
	const [initialBid, setInitialBid] = useState({value: ''});
	const [deadlineDate, setDeadlineDate] = useState({value: ''});
	const [images, setImages] = useState({value: []});

	const [errorStatus, seterrorStatus] = useState(false);
	const [errorMessage, seterrorMessage] = useState('');
	const [submitButtonText, setsubmitButtonText] = useState('Submit My Product');

	const { isLoggedIn } = props

	useEffect(() => {
        axios.get( '/sessions.php' )
        .then(function(res) {
            if(res.data.login) {
                setUserId(res.data.userId)
            }
        })
    }, [])

    useEffect(() => {
        userId &&
        axios.get( `/users.php?id=${userId}`)
        .then(function(res) {
            if(res.data.status) {
                setUserStatus(res.data.data[0].status)
            }
        })
    }, [userId])

	// handle add row event specifications repeater
	const addRow = () => {
		specifications.value.push( {value: ''} )
		setSpecifications(JSON.parse(JSON.stringify(specifications)))	}

	// handle delete row event specifications repeater
	const deleteRow = (index) => {
		specifications.value.splice( index, 1 )
		setSpecifications(JSON.parse(JSON.stringify(specifications)))
	}

	// handle on image changed
	const handleSetImages = (e) => {
		let files = e.target.files
		if( files.length !== 0 ) {
			for( let i = 0; i < files.length; i++ ) {
				if(files[i]) {
					let reader = new FileReader();
					reader.readAsDataURL(files[i]);
					reader.onload = (e) => {
						images.value.push({dataUrl: e.target.result})
						setImages(JSON.parse(JSON.stringify(images)))
					}
				}
			}
		}
	}

	// trigger file input on add button click
	const handleImage = () => {
		imagesRef.current.click()
	}

	// delete image from collection
	const deleteImage = (key) => {
		images.value.splice(key,1)
		setImages(JSON.parse(JSON.stringify(images)))
	}


	// validate product title field
    const validateTitle = () => {
        if( title.value == '' ) {
            title.error = true;
            title.errorMessage = "Fullname must not be empty";
            setTitle( JSON.parse(JSON.stringify( title )) )	
        } else {
            return true
        }
        return false
    }

	const onsubmit = (e) => {
		e.preventDefault()
        const url = 'http://localhost/auction-web/api/edit-table/edit-products.php'
        axios.post( url, {
            params: {
                submit: 'submit'
            }
        })
        .then(function(response) {
            if( response.data.status ) {
				console.log( response.data.status )
            }
		})
		setsubmitButtonText( 'Your product is submitted to administration' )
		//seterrorStatus('false'),
		//seterrorMessage('Product form submitted'),
	}

	if( !isLoggedIn ) {
		return (
			<>
				<Header isLoggedIn = { isLoggedIn }/> 
				<div id="auction-web-product-submit-page">
					{ 'You must be logged in to submit your product' }
					<div className="aweb-redirect-button">
						<a href="/login" target="_blank">{ 'Proceed to login page' }</a>
					</div>
				</div>
			</>
		)
	}
	
	if( userStatus === 'not-verified' ) {
		return (
			<>
				<Header isLoggedIn = { isLoggedIn }/> 
				<div id="auction-web-product-submit-page">
					{ 'Your account must be verified  before you submit your product' }
					<div className="aweb-redirect-button">
						<a href="/user-verification" target="_blank">{ 'Submit for verification' }</a>
					</div>
				</div>
			</>
		)
	}

	if( userStatus === 'under-verification' ) {
		return (
			<>
				<Header isLoggedIn = { isLoggedIn }/> 
				<div id="auction-web-product-submit-page">
					{ 'Your account is under verification. Please wait for account to be verified' }
				</div>
			</>
		)
	}

	return (
		<>
			<Header isLoggedIn = { isLoggedIn }/> 
			<div id="auction-web-product-submit-page">
				<form id="aweb-Product-form" className="w-full max-w-lg">
					<div className="flex flex-wrap -mx-3 mb-6">
						<div className="w-full px-3">
							<div className="aweb-Product-form-header">Enter the Details</div>
						</div>
					</div>
					<div className="flex flex-wrap -mx-3 mb-6">
						<div className="w-full px-3">
							<label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">Product Title</label>
							{ title.error &&
                                <span className="text-xs text-red-700">{ title.errorMessage }</span>
                            }
							<input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" type="text" placeholder="Add product title" onChange={(e) => setTitle({value: e.target.value})} value={title.value} aria-label="Product Title" />
						</div>
					</div>

					<div className="flex flex-wrap -mx-3 mb-6">
						<div className="w-full px-3">
							<label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">Product Description</label>
							{ description.error &&
                                <span className="text-xs text-red-700">{ description.errorMessage }</span>
                            }
							<textarea className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" placeholder="Add product description" onChange={(e) => setDescription({value: e.target.value})}>
								{description.value}
							</textarea>
						</div>
					</div>

					<div className="flex flex-wrap -mx-3 mb-6">
						<div className="w-full px-3">
							<label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">Specifications/Features</label>
							{ specifications.error &&
                                <span className="text-xs text-red-700">{ specifications.errorMessage }</span>
                            }
							{ 
								specifications.value.map((specification, index) => {
									return (
										<>
											<div className="" key={index}>
												<input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" type="text" key={index} placeholder="Add features title" name={`specifications${index}`} onChange={(e) => setSpecifications({value: e.target.value})} value={specification.value} aria-label="Product Specification" />
												{ index !== 0 &&
													<button className="h-10 px-5 m-2 text-red-800 transition-colors duration-150 bg-gray-100 rounded-lg focus:shadow-outline hover:bg-white-800" type="button" onClick ={() => deleteRow(index) }>
														Delete row
													</button>
												}
											</div>
											{ ( index + 1 ) === specifications.value.length &&
												<button className="flex-shrink-0 border-transparent border-4 text-teal-500 hover:text-teal-800 text-sm py-1 px-2 rounded" type="button" onClick ={() => addRow() }>Add row</button>
											}
											{ ( index === 10 ) &&
												"Specifications/Features are limited. You can only add upto 10"
											}
										</>
									)
								})
							}
						</div>
					</div>

					<div className="flex flex-wrap -mx-3 mb-6">
						<div className="w-full px-3">
							<label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">Initial 
							Bid</label>
							{ initialBid.error &&
                                <span className="text-xs text-red-700">{ initialBid.errorMessage }</span>
                            }
							<input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" type="text" placeholder="Add product title" onChange={(e) => setInitialBid({value: e.target.value})} value={initialBid.value} aria-label="Initial Bid" />
						</div>
					</div>

					<div className="flex flex-wrap -mx-3 mb-6">
						<div className="w-full px-3">
							<label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">Bid Deadline Date</label>
							{ deadlineDate.error &&
                                <span className="text-xs text-red-700">{ deadlineDate.errorMessage }</span>
                            }
							<DatePicker
								value={deadlineDate.value}
								onChange={(value) => setDeadlineDate({value:value})}
								inputPlaceholder="Select a day"
								shouldHighlightWeekends
								/>	
						</div>
					</div>

					<div className="flex flex-wrap -mx-3 mb-6">
						<div className="w-full px-3">
							<label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">Images</label>
							{ images.error &&
                                <span className="text-xs text-red-700">{ images.errorMessage }</span>
                            }
							<input type="file" name="images" ref={imagesRef} onChange = { (e) => handleSetImages(e) } multiple="multiple" accept="image/jpg, image/jpeg" style={{display:"none"}}/>
							{  (images.value.length < 8 ) &&
								<div className="image-upload cursor-pointer w-16 h-16 p-6 border border-gray-400 border-dashed" onClick = { () => handleImage() }><GrAdd/></div>
							}
							{  (images.value.length === 8 ) &&
								<div>The maximum number of images you can upload is only 8 ( eight )</div>
							}
                            { Array.isArray( images.value ) &&
								images.value.map((image, key) => {
									return (
										<React.Fragment key={key}>
											<div className="w-48 h-48"><span className="image-delete cursor-pointer" onClick = { () => deleteImage(key) }><AiOutlineDelete/></span>
												<ModalImage
													small={image.dataUrl}
													large={image.dataUrl}
													hideDownload= {true}
													showRotate={true}
													/>
											</div>
										</React.Fragment>
									)
								})
							}
						</div>
					</div>

					<div className="aweb-Product-form-button">
						<button className="shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded" type="button" onClick={(e) => onsubmit(e) }>{submitButtonText}</button>
					</div>
				</form>
			</div>
        </>
	)
}

export default ProductSubmit