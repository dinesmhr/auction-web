import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import AdminMainNavigation from '../../navigation/AdminMainNavigation'
import DatePicker, { utils } from "react-modern-calendar-datepicker";
import ModalImage from "react-modal-image";
import { GrAdd } from "react-icons/gr";
import { AiOutlineDelete } from "react-icons/ai";
import { BiDollar } from "react-icons/bi";

const axios = require('axios');

const imagesRef = React.createRef()

const AdminEditProduct = () => {
    const [ userId, setUserId ] = useState()
    const [ userData, setUserData ] = useState()
    const [ title, setTitle ] = useState({value:''})
    const [ description, setDescription ] = useState({value:''})
    const [specifications, setSpecifications] = useState({value: [{value:''}]});
	const [initialBid, setInitialBid] = useState({value: ''});
	const [maxBid, setMaxBid] = useState({value: ''});
	const [deadlineDate, setDeadlineDate] = useState({value: ''});
	const [images, setImages] = useState({value: []});
    const [status, setStatus] = useState(false);
	const [message, setMessage] = useState('');
	const [submitText, setSubmitText] = useState('Update Product');

    const { id } = useParams()

    useEffect(() => {
        axios.get( `/products.php?id=${id}` )
        .then(function(res) {
            setUserId(res.data.data[0].user_id)
            setTitle({value: res.data.data[0].title})
            setDescription({value: res.data.data[0].description})
            setInitialBid({value: res.data.data[0].initial_bid})
            setMaxBid({value: res.data.data[0].max_bid})
            setSpecifications({value: res.data.data[0].specifications})
            const tempImages = res.data.data[0].images_path.map((image, key) => {
                let image_url = `http://localhost/auction-web/${image.split('../').pop()}`
                return ({ dataUrl : image_url })
            })
            setImages({value: tempImages})
            setDeadlineDate({value: res.data.data[0].deadline_date})
        })
    }, [])

    useEffect(() => {
        { userId &&
            axios.get( `/user-details.php?id=${userId}` )
            .then(function(res) {
                setUserData(res.data.data[0])
                console.log(res.data.data[0])
            })
        }
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
        if( title.value === '' ) {
            title.error = true;
            title.errorMessage = "Tittle must not be empty";
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
        } else {
            return true
        }
        return false
    }

	// validate maxBid field
    const validateMaxBid = () => {
        if( maxBid.value === '' ) {
            maxBid.error = true;
            maxBid.errorMessage = "Add maximub bid amount";
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
		if( validateTitle() && validateDescription() && validateInitialBid() && validateMaxBid() && validateImages() ) {
            setSubmitText( 'Submitting product' )
			let apiParams = {
				submit: "submit-product",
                id: id,
				title: title.value,
				description: description.value,
				specifications: specifications.value,
				initialBid: initialBid.value,
				maxBid: maxBid.value,
				deadlineDate: deadlineDate.value,
				images: images.value
			}
			axios.post( '/edit-table/update-products.php', apiParams)
			.then(function(response) {
				if( response.data.status ) {
					setTitle({value: ''})
					setDescription({value: ''})
					setSpecifications({value: [{value:''}]})
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

    return (
        <div id="auction-web-admin" className="content-wrap">
            <AdminMainNavigation/>
            <div id="admin-right-content">
                <div className="aweb-Product-form-button">
                    <button className="shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded" type="button" onClick={(e) => onsubmit(e) }>{submitText}</button>
                </div>
                <div>
                    { title.error &&
                        <span className="text-xs text-red-700">{ title.errorMessage }</span>
                    }
                    <input className="shadow appearance-none border rounded w-full py-2 px-3 bg-gray-200 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" name="title" onChange = { (e) => setTitle({value: e.target.value}) } value={title.value}/>
                </div>
                <div>
                    <label>Description</label>
                    <textarea className="shadow appearance-none border rounded w-full py-2 px-3 bg-gray-200 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" rows="20" onChange = { (e) => setDescription({value: e.target.value}) }>
                        {description.value}
                    </textarea>
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
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">Initial 
                        Bid</label>
                        { initialBid.error &&
                            <span className="text-xs text-red-700">{ initialBid.errorMessage }</span>
                        }
                        <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" type="text" placeholder="Add initial bid" onChange={(e) => setInitialBid({value: e.target.value})} value={initialBid.value} aria-label="Initial Bid" />
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
                        <DatePicker
                            value={deadlineDate.value}
                            onChange={(value) => setDeadlineDate({value:value})}
                            minimumDate={utils().getToday()}
                            inputPlaceholder="Select a day"
                            shouldHighlightWeekends
                            />
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
                        {  (images.value.length === 8 ) &&
                            <div>The maximum number of images you can upload is only 8 ( eight )</div>
                        }
                        <div className="inline block flex flex-row justify-around ">
                            { Array.isArray( images.value ) &&
                                images.value.map((image, key) => {
                                    return (
                                        <React.Fragment key={`unique-${key}`}>
                                            <div className="h-40 w-40 bg-cover float-left relative mt-2 mr-0.5"><span className="rounded-sm bg-red-600 absolute image-delete cursor-pointer" onClick = { () => deleteImage(key) }><AiOutlineDelete/></span>
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
                <div>
                    Author Information
                    { userData &&
                        <div>
                            <div>Full Name: { userData.fullname }</div>
                            <div>Email Address: { userData.email }</div>
                            <div>Contact Number: { userData.areaCode + userData.number }</div>
                            <div>Profession: { userData.profession }</div>
                            <div>Status: { userData.status }</div>
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}
export default AdminEditProduct