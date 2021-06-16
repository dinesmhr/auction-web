import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'
import AdminMainNavigation from '../navigation/AdminMainNavigation'
import { AiOutlineDelete } from "react-icons/ai";
import { ImCross } from "react-icons/im";
const axios = require('axios');

const AdminProductCategories = () => {
	const [categoryTitle, setCategoryTitle] = useState({value: ''})
	const [categoryDescription, setCategoryDescription] = useState({value: ''})
	const [categoryImage, setCategoryImage] = useState({value: ''})
	const [categories, setCategories] = useState(null)
	const [buttonText, setButtonText] = useState('Add new category')
	const [status, setStatus] = useState(false)
	const [message, setMessage] = useState('')
	const [showCategoryModal, setShowCategoryModal] = React.useState(false);

	const categoryImageRef = React.createRef()

	useEffect(() => {
        axios.get( '/product-categories.php' )
        .then(function(response) {
            if( response.data.status === true ) {
                setCategories( response.data.data )
            } else {
				setCategories('')
			}
        })
	})

	// trigger category image
    const handleCategoryImage = () => {
        categoryImageRef.current.click()
    }

	// help set category image one
    const handlesetCategoryImage = (file) => {
        setCategoryImage({value: file.target.files[0]})
        if(file.target.files[0]) {
            let reader = new FileReader();
            reader.readAsDataURL(file.target.files[0]);
            reader.onload = (e) => {
                setCategoryImage({dataUrl: e.target.result})
            }
        } else {
            setCategoryImage({value: '', dataUrl: ''})
        }
    }
	const deleteCategoryImage = () => {
        setCategoryImage({value: ''})
    }

	// validate category title
	const validateCategoryTitle = () => {
		if( categoryTitle.value === '' ) {
            categoryTitle.error = true
            categoryTitle.errorMessage = "Title field is empty"
        } else {
            return true
        }
        setCategoryTitle( JSON.parse(JSON.stringify( categoryTitle )) )
        return false
	}

	// handle add new category
	const addCategory = (e) => {
		e.preventDefault()
		if( validateCategoryTitle() ) {
			setButtonText( 'Adding category' )
			axios.post( '/edit-table/edit-categories.php', {
				submit: 'submit',
				title: categoryTitle.value,
				description: categoryDescription.value,
				image: categoryImage
			})
			.then(function(res) {
				if( res.data.status === true ) {
					setCategoryTitle({value: ''})
					setCategoryDescription({value: ''})
					setCategoryImage({value: ''})
					setStatus(true)
					setMessage('Category created')
				} else {
					setStatus(true)
					setMessage('Error in creating category')
				}
			})
		}
		setButtonText( 'Add new category' )
	}

	return (
		<>
			<div className="content-wrap">
				<AdminMainNavigation/>
				<div id="admin-right-content" className="float-right w-4/5 text-white p-20 h-screen mt-12">
					<div className="admin-page-top-description p-5 font-extralight italic text-sm">
						{ `Manage, Edit or Delete the product categories in this panel. Navigate to the single category edit page ` }
					</div>
					<button id="admin-action-trigger-button" className="text-white active:bg-pink-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mt-1 mb-10 ease-linear transition-all duration-150" type="button" onClick={() => setShowCategoryModal(true)}>
						{ buttonText }
					</button>
					{ showCategoryModal ? (
						<>
							<div id="admin-modal-box" className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
							>
								<div className="relative my-6 mx-20">
								{/*content*/}
								<div className="admin-modal-box border-0 rounded-lg shadow-lg relative flex flex-col w-96 outline-none focus:outline-none">
									{/*header*/}
									<div className="flex items-start p-2 admin-modal-border">
									<h3 className="text-2xl font-semibold">
										{ `Create Category` }
									</h3>
									<button className="p-1 ml-auto bg-gray border-0 text-white opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
										onClick={() => setShowCategoryModal(false)}
									>
										<span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
										×
										</span>
									</button>
									</div>
									{/*body*/}
									<div className="relative p-6 flex-auto">
										<div className="py-2">
											<label className="py-1">Category Title</label>
											<input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" name="category-title" onChange= {(e) => setCategoryTitle({value: e.target.value}) } value={categoryTitle.value} />
											{ categoryTitle.error &&
												<span className="text-xs text-red-400">{ categoryTitle.errorMessage }</span>
											}
										</div>
										<div className="py-2">
											<label className="block py-1">Category Description</label>
											<textarea className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" name="category-title" onChange= {(e) => setCategoryDescription({value: e.target.value}) } defaultValue={categoryDescription.value} >
											</textarea>
										</div>
										<div className="aweb-categoryImage py-2">
											<label className="py-1">Category Image</label>
											{ categoryImage.error &&
												<span class="text-xs text-red-400">{ categoryImage.errorMessage }</span>
											}
											<input type="file" name="categoryImage" ref={categoryImageRef} onChange = { (e) => handlesetCategoryImage(e) } style={{display:"none"}}/>
											{ categoryImage.dataUrl ? (
												<>
													<div className="relative w-48 h-48"><span className="image-delete absolute cursor-pointer right-0 text-red-500 hover:font-sm" onClick = { () => deleteCategoryImage() }><AiOutlineDelete/></span><img className="w-48 h-48" src={categoryImage.dataUrl} alt=""/></div>
												</>
											) : (
												<div className="image-upload relative cursor-pointer w-56 h-12 border border-gray-400 border-dashed" onClick = { () => handleCategoryImage() }><span className="absolute font-thin left-16 top-3">{ `Add image` }</span></div>
											)}
										</div>
										<button id="admin-action-trigger-button" className="text-white active:bg-pink-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mt-1 mb-10 ease-linear transition-all duration-150" type="button" onClick={(e) => addCategory(e)}>
											{ buttonText }
										</button>

										{ status && 
											<div className="aweb-success-note">
												{ message }
											</div>
										}
									</div>
									{/*footer*/}
									<div className="flex border-bottom: 1px solid #151a30; items-center justify-end p-6 ">
										<button className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="button" onClick={() => setShowCategoryModal(false)}>
											Close
										</button>
									</div>
								</div>
								</div>
							</div>
							<div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
						</>
					) : null}

					{
						categories === null ? (
							'Loading datas'
						) : categories.length === 0 ? (
							'No product categories'
						) : (
							<div id="admin-content-table" className="tracking-wider">
								<div className="admin-content-table-row-heading grid grid-cols-3 flex flex-row font-semibold">
									<span className="py-4 px-20">Title</span>
									<span className="py-4 px-20">Count</span>
									<span className="py-4 px-20">Actions</span>
								</div>
								{
									categories.map( ( category, index )  => {
										return (	 
											<div key={ index } className="admin-content-table-row grid grid-cols-3 flex flex-row">
												<span className="py-2 px-16">{category.title}</span>
												<span className="py-2 px-24">{category.products_ids.length}</span>
												<span className="py-2 px-20">
													<button className="bg-transparent py-1 px-4 hover:bg-blue-500 text-blue-700 font-semibold hover:text-white border border-blue-500 hover:border-transparent rounded"><Link to={`/aweb-categories/${category.id}`}>Edit</Link></button>
												</span>
											</div>
										)
									})
								}
							</div>
						)
					}
				</div>					
			</div>
		</>
	)
}
export default AdminProductCategories;