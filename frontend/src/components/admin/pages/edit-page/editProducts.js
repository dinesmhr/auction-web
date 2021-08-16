import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import AdminMainNavigation from '../../navigation/AdminMainNavigation'
import ModalImage from "react-modal-image";
import { GrAdd } from "react-icons/gr";
import { AiOutlineDelete } from "react-icons/ai";
import { BiDollar } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";

const axios = require('axios');

const imagesRef = React.createRef()

const AdminEditProduct = () => {
    const [ userId, setUserId ] = useState()
    const [ userData, setUserData ] = useState()
    const [ categoriesData, setCategoriesData ] = useState()
    const [ tagsData, setTagsData ] = useState()
    const [ title, setTitle ] = useState({value:''})
    const [ description, setDescription ] = useState({value:''})
    const [ details, setDetails ] = useState({value:''})
    const [ specifications, setSpecifications ] = useState({value: [{value:''}]});
	const [ initialBid, setInitialBid ] = useState({value: ''});
	const [ maxBid, setMaxBid ] = useState({value: ''});
    const [ bidRaise, setBidRaise ] = useState({value: ''});
	const [ deadlineDate, setDeadlineDate ] = useState({value: ''});
    const [ deadlineTime, setDeadlineTime ] = useState({value: ''});
	const [ images, setImages ] = useState({value: []});
    const [ categories, setCategories ] = useState([]);
    const [ tags, setTags ] = useState([]);
    const [ productStatus, setProductStatus ] = useState('');
    const [ status, setStatus ] = useState(false);
	const [ message, setMessage ] = useState('');
	const [ submitText, setSubmitText]  = useState('Update Product');

    const [ initialCategories, setInitialCategories ] = useState([]);
    const [ initialTags, setInitialTags ] = useState([]);
    const [ updateTerm, setUpdateTerm ] = useState(true);
    const [ emailText, setEmailText ] = useState('Send confirmation email to the owner')
    const [ emailError, setEmailError ] = useState(true)
    // bidder info
    const [ currentHighestBid, setCurrentHighestBid ] = useState()
    const [ bidderId, setBidderId ] = useState()

    const { id } = useParams()

    useEffect(() => {
        axios.get( `/products.php?id=${id}` )
        .then(function(res) {
            setUserId(res.data.data[0].user_id)
            setTitle({value: res.data.data[0].title})
            setDescription({value: res.data.data[0].description})
            setInitialBid({value: res.data.data[0].initial_bid})
            setMaxBid({value: res.data.data[0].max_bid})
            setBidRaise({value: res.data.data[0].bid_raise})
            setSpecifications({value: res.data.data[0].specifications})
            setDetails({value: res.data.data[0].details})
            const tempImages = res.data.data[0].images_path.map((image, key) => {
                if( !image.includes('http://localhost/auction-web/') ) {
                    image = `http://localhost/auction-web/${image.split('../').pop()}`
                }
                return ({ dataUrl : image })
            })
            setImages({value: tempImages})
            setDeadlineDate({value: res.data.data[0].deadline_date.substring(0,10)})
            setDeadlineTime({value: res.data.data[0].deadline_date.substring(11)})
            setProductStatus({value: res.data.data[0].status})
        })
    }, [])

    // set initial categories of the product
    useEffect(() => {
        axios.get( `/product-meta.php?product_id=${id}&meta_key=cat` )
        .then(function(res) {
            if(res.data.status) {
                const tempCats = res.data.data.map((cat) => {
                    return cat.term_id
                })
                setInitialCategories(tempCats)
            }
        })
    }, [updateTerm])

    // set initial tags of the product
    useEffect(() => {
        axios.get( `/product-meta.php?product_id=${id}&meta_key=tag` )
        .then(function(res) {
            if(res.data.status) {
                const tempTags = res.data.data.map((tag) => {
                    return tag.term_id
                })
                setInitialTags(tempTags)
            }
        })
    }, [updateTerm])
    
    // set categories of the product
    useEffect(() => {
        axios.get( `/product-meta.php?product_id=${id}&meta_key=cat` )
        .then(function(res) {
            if(res.data.status) {
                const tempCats = res.data.data.map((cat) => {
                    return cat.term_id
                })
                setCategories(tempCats)
            }
        })
    }, [updateTerm])

    // set tags of the product
    useEffect(() => {
        axios.get( `/product-meta.php?product_id=${id}&meta_key=tag` )
        .then(function(res) {
            if(res.data.status) {
                const tempTags = res.data.data.map((tag) => {
                    return tag.term_id
                })
                setTags(tempTags)
            }
        })
    }, [updateTerm])

    useEffect(() => {
        { userId &&
            axios.get( `/user-details.php?id=${userId}` )
            .then(function(res) {
                setUserData(res.data.data[0])
            })
        }
    }, [userId])

    // set list of categories
    useEffect(() => {
        axios.get( `/product-categories.php` )
        .then(function(res) {
            setCategoriesData(res.data.data)
        })
    }, [])

    // set list of tags
    useEffect(() => {
        axios.get( `/product-tags.php` )
        .then(function(res) {
            setTagsData(res.data.data)
        })
    }, [])

    // set current highest bid
    useEffect(() => {
        let isMounted = true;
        async function fetchData() {
            let results = await axios.get( `/bids.php?return_type=highest_bid&product_id=${id}` )
            if( results.data.status ) {
                if(isMounted)  {
                    setBidderId(results.data.data[0].bid_id)
                    setCurrentHighestBid(results.data.data[0].bid_amount)
                }
            }
        }

        fetchData()
        return () => { isMounted = false };
    }, [])
    
    // handle categories multi checkbox
    const handleCategories = (e) => {
        if(categories.includes(e.target.value)) {
            categories.splice( categories.indexOf(e.target.value), 1 )
        } else {
            categories.push(e.target.value)
        }
        setCategories(JSON.parse(JSON.stringify(categories)))
    }

    // handle tags multi checkbox
    const handleTags = (e) => {
        if(tags.includes(e.target.value)) {
            tags.splice( tags.indexOf(e.target.value), 1 )
        } else {
            tags.push(e.target.value)
        }
        setTags(JSON.parse(JSON.stringify(tags)))
    }

    // set specifications on change
	const handlesetSpecifications = (e,index) => {
		specifications.value[index].value = e.target.value
		setSpecifications(JSON.parse(JSON.stringify(specifications)))
	}

	// handle add row event specifications repeater
	const addRow = () => {
		specifications.value.push( {value: ''} )
		setSpecifications(JSON.parse(JSON.stringify(specifications)))
    }

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

    // return unmatched value from first array
    const getUnmatchedArray = (firstArray, lastArray) => {
        let unmatchedArray = []
        if( firstArray ) {
            unmatchedArray = firstArray.filter((cat) =>  {
                return lastArray.indexOf(cat) === -1
            })
        }
        return unmatchedArray;
    }

	const onsubmit = (e) => {
		e.preventDefault()
        let deadlineFullDate = deadlineDate.value + ' ' + deadlineTime.value
		if( validateTitle() && validateDescription() && validateInitialBid() && validateMaxBid() && validateImages() ) {
            setSubmitText( 'Submitting product' )
            const finalCategories = { 
                delete: getUnmatchedArray(initialCategories, categories),
                add : getUnmatchedArray(categories, initialCategories)
            }
            const finalTags = { 
                delete: getUnmatchedArray(initialTags, tags),
                add : getUnmatchedArray(tags, initialTags)
            }
			let apiParams = {
				submit: "update-product",
                id: id,
				title: title.value,
				description: description.value,
				specifications: specifications.value,
                details: details.value,
				initialBid: initialBid.value,
				maxBid: maxBid.value,
                bidRaise: bidRaise.value,
				deadlineDate: deadlineFullDate,
				images: images.value,
                tags: finalTags,
                categories: finalCategories,
                status: productStatus.value
			}
			axios.post( '/edit-table/update-products.php', apiParams)
			.then(function(response) {
				if( response.data.status ) {
                    setUpdateTerm(!updateTerm)
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
				setSubmitText( 'Update Product' )
			});
		}
	}

    const handleEmailToOwner = () => {
        setEmailText('Sending email')
        let emailParams = {
            'email': userData.email,
            'fullname': userData.fullname,
            'bidder_id': bidderId,
            'product_id': id,
            'sender_email': 'dinesh.mhr2054@gmail.com'
        }
        axios.post( '/mail/seller-confirmation.php', emailParams)
        .then(function(response) {
            if( response.data.status ) {
                setEmailText('Email sent!!')
                setEmailError(false)
            } else {
                setEmailText('Error in email process!!')
            }
        })

        if( ! emailError ) {
            let deadlineFullDate = deadlineDate.value + ' ' + deadlineTime.value
            const finalCategories = { 
                delete: getUnmatchedArray(initialCategories, categories),
                add : getUnmatchedArray(categories, initialCategories)
            }
            const finalTags = { 
                delete: getUnmatchedArray(initialTags, tags),
                add : getUnmatchedArray(tags, initialTags)
            }
            let apiParams = {
                submit: "update-product",
                id: id,
                title: title.value,
                description: description.value,
                specifications: specifications.value,
                details: details.value,
                initialBid: initialBid.value,
                maxBid: maxBid.value,
                bidRaise: bidRaise.value,
                deadlineDate: deadlineFullDate,
                images: images.value,
                tags: finalTags,
                categories: finalCategories,
                status: 'sold_out'
            }
            setEmailText('Updating product status')
            axios.post( '/edit-table/update-products.php', apiParams)
            .then(function(response) {
                if( response.data.status ) {
                    setUpdateTerm(!updateTerm)
                    setStatus(true)
                    setMessage(response.data.message)
                    setEmailText('Updated product status')
                } else {
                    setStatus(true)
                    setMessage(response.data.message)
                }
            })
        }
    }

    return (
        <div id="auction-web-admin" className="content-wrap">
            <AdminMainNavigation/>
            <div id="admin-right-content">
                <div className="aweb-Product-form-button">
                    <button id="admin-action-trigger-button" className="text-white active:bg-pink-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mt-1 mb-6 ease-linear transition-all duration-150" type="button" onClick={(e) => onsubmit(e) }>{submitText}</button>
                    <button className="bg-red-600 hover:bg-red-700 text-gray-900 font-semibold py-2 px-4 mt-1 border border-gray-400 shadow-md rounded shadow">Delete Product</button>
                </div>
                <div>
                    { title.error &&
                        <span className="text-xs text-red-700">{ title.errorMessage }</span>
                    }
                    <input className="text-sm shadow appearance-none border rounded w-full py-2 px-3 bg-gray-200 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" name="title" onChange = { (e) => setTitle({value: e.target.value}) } value={title.value}/>
                </div>
                <div className="mt-4">
                    <div>Description : </div>
                    <textarea className="text-sm mt-2 shadow appearance-none border rounded w-full py-2 px-3 bg-gray-200 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" rows="20" value={description.value} onChange = { (e) => setDescription({value: e.target.value}) }>
                    </textarea>
                </div>
                <div className="flex flex-wrap -mx-3 mb-6 mt-4">
                    <div className="w-full px-3">
                        <div className="">Specifications/Features :</div>
                        <div className="bg-gray-200 mt-2 pb-3">
                            { specifications.error &&
                                <span className="text-xs text-red-700">{ specifications.errorMessage }</span>
                            }
                            { 
                                specifications.value.map((specification, index) => {
                                    return (
                                        <>
                                            <div className="" key={index}>
                                            { index !== 0 &&
                                                <button className="fill-current text-red-700 ml-3 p-1 text-2xl hover:text-red-600 " type="button" onClick ={() => deleteRow(index) }>
                                                <AiFillDelete  Delete row />
                                                </button>
                                            }
                                            <input className="text-sm appearance-none block w-full bg-gray-200 text-gray-700 border-b-2 border-0 border-gray-600 py-3 px-4 mb-3  focus:outline-none focus:bg-white focus:border-gray-500" type="text" key={index} placeholder="Add features title" name={`specifications${index}`} onChange={(e) => handlesetSpecifications(e,index)} value={specification.value} aria-label="Product Specification" />
                                                
                                            { ( index + 1 ) === specifications.value.length &&
                                                <button className="ml-4 mt-2 mb-2 bg-gray-800 flex-shrink-0 border-transparent border-4 text-teal-500 hover:bg-gray-800 text-sm py-1 px-2 rounded" type="button" onClick ={() => addRow() }>Add row</button>
                                            }
                                            { ( index === 10 ) &&
                                                "Specifications/Features are limited. You can only add upto 10"
                                            }
                                            </div>
                                        </>
                                    )
                                })
                            }
                        </div>
                    </div>
                </div>

                <div className="flex flex-wrap -mx-3 mb-6">
                    <div className="w-full px-3">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">Other Details</label>
                        { details.error &&
                            <span className="text-xs text-red-700">{ details.errorMessage }</span>
                        }
                        <textarea className="text-sm mt-2 shadow appearance-none border rounded w-full py-2 px-3 bg-gray-200 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" rows="20" value={details.value} onChange = { (e) => setDetails({value: e.target.value}) }>
                        </textarea>
                    </div>
                </div>

                <div className="flex flex-wrap -mx-3 mb-6">
                    <div className="w-full px-3">
                        <div className="">Initial 
                        Bid :<BiDollar/></div>
                        { initialBid.error &&
                            <span className="text-xs text-red-700 ">{ initialBid.errorMessage }</span>
                        }
                        <input className="text-sm mt-2 appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" type="text" placeholder="Add initial bid" onChange={(e) => setInitialBid({value: e.target.value})} value={initialBid.value} aria-label="Initial Bid" />
                    </div>
                </div>

                <div className="flex flex-wrap -mx-3 mb-6">
                    <div className="w-full px-3">
                        <div className="">Maximum Bid :<BiDollar/></div>
                        { maxBid.error &&
                            <span className="text-xs text-red-700">{ maxBid.errorMessage }</span>
                        }
                        <input className="text-sm mt-2 appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" type="text" placeholder="Add maximum bid" onChange={(e) => setMaxBid({value: e.target.value})} value={maxBid.value} aria-label="Initial Bid" />
                    </div>
                </div>

                <div className="flex flex-wrap -mx-3 mb-6">
                    <div className="w-full px-3">
                        <div className="">Bid Raise :<BiDollar/></div>
                        { bidRaise.error &&
                            <span className="text-xs text-red-700">{ bidRaise.errorMessage }</span>
                        }
                        <input className="text-sm mt-2 appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" type="text" placeholder="Add bid raise amount" onChange={(e) => setBidRaise({value: e.target.value})} value={bidRaise.value} aria-label="Initial Bid" />
                    </div>
                </div>

                <div className="flex flex-wrap -mx-3 mb-6  w-full px-3 flex-col items-center mt-4">
                        <div>
                            <div className="mb-2">Bid Deadline Date :</div>
                        </div>
                        { deadlineDate.error &&
                            <div>
                                <span className="text-xs text-red-700 flex justify-center">{ deadlineDate.errorMessage }</span>
                            </div>
                        }
                        <input type="date" className="text-gray-700" onChange ={ (e) => setDeadlineDate({value : e.target.value})} value={deadlineDate.value} min={new Date().toISOString().substring(0,10)}/>
                        <input type="time" className="text-gray-700" onChange ={ (e) => setDeadlineTime({value : e.target.value})} value={deadlineTime.value}/>
                </div>

                <div className="-mx-3 mb-8 p-6 mt-4">
                    <div className="min-h-full">
                        <div className="mb-2">Images :</div>
                        { images.error &&
                            <span className="text-xs text-red-700">{ images.errorMessage }</span>
                        }
                        <input type="file" name="images" ref={imagesRef} onChange = { (e) => handleSetImages(e) } multiple="multiple" accept="image/jpg, image/jpeg" style={{display:"none"}}/>
                        {  (images.value.length < 8 ) &&
                            <div className="mt-1 img-add image-upload cursor-pointer w-16 h-16 p-6 border border-gray-300 border-dashed" onClick = { () => handleImage() }><GrAdd/></div>
                        }
                        {  (images.value.length === 8 ) &&
                            <div>The maximum number of images you can upload is only 8 ( eight )</div>
                        }
                        <div className="inline block flex flex-row justify-around ">
                            { Array.isArray( images.value ) &&
                                images.value.map((image, key) => {
                                    return (
                                        <React.Fragment key={`unique-${key}`}>
                                            <div className="h-40 w-40 bg-cover float-left relative mt-2 mr-0.5 overflow-hidden"><span className=" bg-red-600 absolute image-delete cursor-pointer" onClick = { () => deleteImage(key) }><AiOutlineDelete/></span>
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

                <div>
                 <div className="mt-4">
                    Categories : </div>
                    <div className="flex flex-row p-1">
                        { categoriesData &&
                            categoriesData.map((category, index) => {
                                let checkedStatus = false
                                if( categories.includes(category.id) ) {
                                    checkedStatus = true
                                }
                                return(
                                    <React.Fragment key={`unique-${index}`}><input key={index} onChange = { (e) => handleCategories(e) } className="mt-1" type="checkbox" value={ category.id } checked={checkedStatus}/><div className="mr-1 ml-1 text-sm">{ category.title }</div></React.Fragment>
                                )
                            })
                        }
                    </div>
                </div>

                <div className="flex flex-col p-1">
                   <div className="mt-4"> Tags : </div>
                    <div className="flex flex-row">
                        { tagsData &&
                            tagsData.map(( tag, index) => {
                                let checkedStatus = false
                                if( tags.includes(tag.id) ) {
                                    checkedStatus = true
                                }
                                return(
                                    <><input key={index} onChange = { (e) => handleTags(e) } type="checkbox" value={ tag.id } checked={checkedStatus}/><div className="mr-1 ml-1 text-sm">{ tag.title }</div></>
                                )
                            })
                        }
                    </div>
                </div>

                <div className="p-1">
                    <div className="mt-4">Status : </div>
                    <div className="">
                        <select className="text-sm text-black mt-1" value={productStatus.value} onChange={(e) => setProductStatus({value: e.target.value})}>
                            <option value="draft" >Draft</option>
                            <option value="available">Available</option>
                            <option value="sold">Sold</option>
                            <option value="unavailable">Unavailable</option>
                        </select>
                    </div>
                </div>

                <div className="aweb-Product-form-button mt-3 mb-4">
                    <button id="admin-action-trigger-button" className="text-white active:bg-pink-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mt-1 mb-6 ease-linear transition-all duration-150" type="button" onClick={(e) => onsubmit(e) }>{submitText}</button>
                    <button className="bg-red-600 hover:bg-red-700 text-gray-900 font-semibold py-2 px-4 mt-1 border border-gray-400 shadow-md rounded shadow">Delete Product</button>
                </div>
                { status && 
                    <div className="aweb-success-note mb-2">
                        { message }
                    </div>
                }
                <hr/>

                <div>
                   <div className="text-gray-300 text-lg mb-1"> Highest Bid Information</div>
                    { currentHighestBid && 
                        <div>
                           <div> Highest Bid : {currentHighestBid}</div>
                            <div>View Bid Detail : <Link className="text-white bg-indigo-900 active:bg-pink-600 font-bold uppercase text-sm px-6 py-1 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mt-1 mb-6 ease-linear transition-all duration-150" to={`/aweb-bids/${bidderId}`} >View</Link></div>
                        </div>
                    }
                    { productStatus.value === "bid_success" &&
                        <button className="text-white bg-indigo-900 active:bg-pink-600 font-bold uppercase text-sm px-6 py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mt-1 mb-6 ease-linear transition-all duration-150" onClick={()=>handleEmailToOwner()}>{ emailText }</button>
                    }
                    { productStatus.value === "sold_out" &&
                        <button>Seller Confirmation Email Sent</button>
                    }
                    { !currentHighestBid && 
                       <>Bid is not placed yet</>
                    }
                </div>
                <div className="mt-3 shadow appearance-none border rounded w-full py-2 px-3 bg-gray-300 text-gray-900 leading-tight focus:outline-none focus:shadow-outline">
                <div className="mt-2 text-lg text-purple-900 font-bold">
                    Seller Information</div>
                    { userData &&
                        <tbody>
                            <tr className="editProductUser">
                                <td className="font-bold text-sm mr-1">Full Name : </td><td className="text-sm text-left ">{ userData.fullname }</td>
                            </tr>
                            <tr className="editProductUser">
                                <td className="font-bold text-sm mr-1">Email Address : </td><td className="text-sm text-left ">{ userData.email }</td>
                            </tr>
                            <tr className="editProductUser">    
                                <td className="font-bold text-sm mr-1">Contact Number : </td><td className="text-sm text-left">{ userData.contact_num.areaCode + userData.contact_num.number }</td>
                            </tr>
                            <tr className="editProductUser">
                                <td className="font-bold text-sm mr-1">Profession : </td><td className="text-sm">{ userData.profession }</td>
                            </tr>
                            <tr className="editProductUser">  
                                <td className="font-bold text-sm mr-1"> Status : </td><td className="text-sm">{ userData.status }</td>
                            </tr>        
                        </tbody>
                    }
                </div>
            </div>
        </div>
    )
}
export default AdminEditProduct