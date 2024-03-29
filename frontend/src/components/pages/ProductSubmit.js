import React, { useState, useEffect, useContext } from 'react';
import Header from '../header/Header';
import ModalImage from "react-modal-image";
import { GrAdd } from "react-icons/gr";
import { AiOutlineDelete } from "react-icons/ai";
import { BiDollar } from "react-icons/bi";
import {appContext} from '../../App'
import Footer from '../footer/Footer'
const axios = require('axios');
const imagesRef = React.createRef()

const ProductSubmit = () => {
	const [userId, setUserId] = useState('')
    const [userStatus, setUserStatus] = useState('')
	const [title, setTitle] = useState({value: ''});
	const [description, setDescription] = useState({value: ''});
	const [specifications, setSpecifications] = useState({value: [{value:''}]});
	const [details, setDetails] = useState({value: ''});
	const [initialBid, setInitialBid] = useState({value: ''});
	const [maxBid, setMaxBid] = useState({value: ''});
	const [deadlineDate, setDeadlineDate] = useState({value: ''});
	const [deadlineTime, setDeadlineTime] = useState({value: ''});
	const [images, setImages] = useState({value: []});
	const [status, setStatus] = useState(false);
	const [message, setMessage] = useState('');
	const [submitText, setSubmitText] = useState('Submit My Product');

	const { isLoggedIn } = useContext(appContext)
	useEffect(() => {
        axios.get( '/sessions.php' )
        .then(function(res) {
            if(res.data.login) {
                setUserId(res.data.userId)
            }
        })
    })

    useEffect(() => {
        userId &&
        axios.get( `/users.php?id=${userId}`)
        .then(function(res) {
            if(res.data.status) {
                setUserStatus(res.data.data[0].status)
            }
        })
    }, [userId])

	// set specifications on change
	const handlesetSpecifications = (e,index) => {
		specifications.value[index].value = e.target.value
		setSpecifications(JSON.parse(JSON.stringify(specifications)))
	}

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
				//if( i >=8 ) { break; }
				if(files[i]) {
					if( files[i].size > 10000000 ) {
						images.error = true;
						images.errorMessage = "Image size is bigger than 5MB";
						setImages( JSON.parse(JSON.stringify( images )) )
					} else {
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
        if( title.value === '' ) {
            title.error = true;
            title.errorMessage = "Title must not be empty";
            setTitle( JSON.parse(JSON.stringify( title )) )	
        } else {
            return true
        }
        return false
    }

	// validate product description field
    const validateDescription = () => {
        if( description.value === '' ) {
            description.error = true;
            description.errorMessage = "Description must not be empty";
            setDescription( JSON.parse(JSON.stringify( description )) )	
        } else {
            return true
        }
        return false
    }

	// validate initialBid field
    const validateInitialBid = () => {
        if( initialBid.value === '' ) {
            initialBid.error = true;
            initialBid.errorMessage = "Add initial bid amount";
            setInitialBid( JSON.parse(JSON.stringify( initialBid )) )
        } else if( initialBid.value.toString().length > 7 ) {
			initialBid.error = true;
            initialBid.errorMessage = "Invalid amount";
            setInitialBid( JSON.parse(JSON.stringify( initialBid )) )
		} else {
            return true
        }
        return false
    }

	// validate maxBid field
    const validateMaxBid = () => {
        if( maxBid.value === '' ) {
            maxBid.error = true;
            maxBid.errorMessage = "Add maximum bid amount";
            setMaxBid( JSON.parse(JSON.stringify( maxBid )) )       
        } else if ( initialBid.value >= maxBid.value ) {
			maxBid.error = true;
			maxBid.errorMessage = "Max bid amount must always be grater than Initial Bid amount";
			setMaxBid( JSON.parse(JSON.stringify( maxBid )) )
		} else if ( initialBid.value === maxBid.value ) {
            maxBid.error = true;
            maxBid.errorMessage = "Max bid amount cannot be same sa Initial bid. It must be greater";
            setMaxBid( JSON.parse(JSON.stringify( maxBid )) )
		} else {
			return true
		}
        return false
    }

	// validate image field
    const validateImages = () => {
        if( images.value.length === 0 ) {
            images.error = true;
            images.errorMessage = "Add at least one image";
            setImages( JSON.parse(JSON.stringify( images )) )	
        } else {
            return true
        }
        return false
    }

	const onsubmit = (e) => {
		e.preventDefault()
		let deadlineFullDate = deadlineDate.value + ' ' + deadlineTime.value
		if( validateTitle() && validateDescription() && validateInitialBid() && validateMaxBid() && validateImages() ) {
			setSubmitText( 'Submitting product' )
			let apiParams = {
				submit: "submit-product",
				title: title.value,
				userId: userId,
				description: description.value,
				specifications: specifications.value,
				details : details.value,
				initialBid: initialBid.value,
				maxBid: maxBid.value,
				deadlineDate: deadlineFullDate,
				images: images.value
			}
			axios.post( '/edit-table/edit-products.php', apiParams)
			.then(function(response) {
				if( response.data.status ) {
					setTitle({value: ''})
					setDescription({value: ''})
					setSpecifications({value: [{value:''}]})
					setDetails({value: ''})
					setInitialBid({value: ''})
					setMaxBid({value: ''})
					setDeadlineDate({value: ''})
					setImages({value: []})
					setStatus(true)
					setMessage(response.data.message)
				} else {
					setStatus(true)
					setMessage(response.data.message)
				}
			})
			.catch(function (error) {
				setStatus(true)
				setMessage('There is an error')
			})
			.then(function () {
				setSubmitText( 'Submit My Product' )
			});
		}
	}

	if( !isLoggedIn ) {
		return (
			<div id="auction-web">
				<Header/>
					<div id="auction-web-product-submit-page" className="h-screen">
						{ 'You must be logged in to submit your product' }
						<div className="aweb-redirect-button">
							<a href="/login" target="_blank">{ 'Proceed to login page' }</a>
						</div>
					</div>
				<Footer/>
			</div>
		)
	}
	
	if( userStatus === 'not-verified' ) {
		return (
			<div id="auction-web">
				<Header/>
					<div id="auction-web-product-submit-page">
						{ 'Your account must be verified  before you submit your product' }
						<div className="aweb-redirect-button">
							<a href="/user-verification" target="_blank">{ 'Submit for verification' }</a>
						</div>
					</div>
				<Footer/>
			</div>
		)
	}

	if( userStatus === 'under-verification' ) {
		return (
			<div id="auction-web">
				<Header/>
					<div id="auction-web-product-submit-page">
						{ 'Your account is under verification. Please wait for account to be verified' }
					</div>
				<Footer/>
			</div>
		)
	}

	return (
		<div id="auction-web">
			<Header isLoggedIn = { isLoggedIn }/> 
				<div id="auction-web-product-submit-page">
					<div className="product-submit-wrap max-w-3xl m-auto">
						<form id="aweb-Product-form" className="w-full bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
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
									<textarea className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" placeholder="Add product description" onChange={(e) => setDescription({value: e.target.value})} defaultValue={description.value}>
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
														<input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" type="text" key={index} placeholder="Add features title" name={`specifications${index}`} onChange={(e) => handlesetSpecifications(e,index)} value={specification.value} aria-label="Product Specification" />
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
									<label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">Other Details</label>
									{ details.error &&
										<span className="text-xs text-red-700">{ details.errorMessage }</span>
									}
									<textarea className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" placeholder="Add product details" onChange={(e) => setDetails({value: e.target.value})} defaultValue={details.value}>
									</textarea>
								</div>
							</div>

							<div className="flex flex-wrap -mx-3 mb-6">
								<div className="w-full px-3">
									<label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">Initial 
									Bid</label>
									{ initialBid.error &&
										<span className="text-xs text-red-700">{ initialBid.errorMessage }</span>
									}
									<input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" type="text" placeholder="Add initial bid" onChange={(e) => { setInitialBid({value: e.target.value}) } } value={initialBid.value} aria-label="Initial Bid" />
									<BiDollar/>
								</div>
							</div>

							<div className="flex flex-wrap -mx-3 mb-6">
								<div className="w-full px-3">
									<label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">Maximum 
									Bid</label>
									{ maxBid.error &&
										<span className="text-xs text-red-700">{ maxBid.errorMessage }</span>
									}
									<input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" type="text" placeholder="Add maximum bid" onChange={(e) => setMaxBid({value: e.target.value})} value={maxBid.value} aria-label="Initial Bid" />
									<BiDollar/>
								</div>
							</div>

							<div className="flex flex-wrap -mx-3 mb-6">
								<div className="w-full px-3">
									<label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">Bid Deadline Date</label>
									{ deadlineDate.error &&
										<span className="text-xs text-red-700">{ deadlineDate.errorMessage }</span>
									}
									<input type="date" onChange ={ (e) => setDeadlineDate({value : e.target.value})} value={deadlineDate.value} min={new Date().toISOString().substring(0,10)}/>
									<input type="time" onChange ={ (e) => setDeadlineTime({value : e.target.value})} value={deadlineTime.value}/>
								</div>
							</div>

							<div className="-mx-3 mb-6">
								<div className="min-h-full">
									<label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">Images</label>
									{ images.error &&
										<span className="text-xs text-red-700">{ images.errorMessage }</span>
									}
									<input type="file" name="images" ref={imagesRef} onChange = { (e) => handleSetImages(e) } multiple="multiple" accept="image/jpg, image/jpeg" style={{display:"none"}}/>
									{  (images.value.length < 8 ) &&
										<div className="image-upload cursor-pointer w-16 h-16 p-6 border border-gray-400 border-dashed" onClick = { () => handleImage() }><GrAdd/></div>
									}
									{<i>`Upload the images with size less than 10MB`</i>}
									{  (images.value.length >= 8 ) &&
										<div>The maximum number of images you can upload is only 8 ( eight )</div>
									}
								<div className="inline block flex flex-row justify-around ">
									{ Array.isArray( images.value ) &&
										images.value.map((image, key) => {
											return (
												<React.Fragment key={`unique-${key}`}>
													<div className="h-40 w-40 bg-cover float-left relative mt-2 mr-0.5 overflow-hidden"><span className="rounded-sm bg-red-600 absolute image-delete cursor-pointer" onClick = { () => deleteImage(key) }><AiOutlineDelete/></span>
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
							</div>

							<div className="aweb-Product-form-button">
								<button className="shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded" type="button" onClick={(e) => onsubmit(e) }>{submitText}</button>
							</div>
							{ status && 
								<div className="aweb-success-note">
									{ message }
								</div>
							}
						</form>
					</div>
				</div>
			<Footer/>
        </div>
	)
}

export default ProductSubmit