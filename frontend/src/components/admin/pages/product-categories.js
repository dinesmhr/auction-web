import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'
import AdminMainNavigation from '../navigation/AdminMainNavigation'
import { GrAdd } from "react-icons/gr";
import { AiOutlineDelete } from "react-icons/ai";

const axios = require('axios');

const AdminProductCategories = () => {
	const [categoryTitle, setCategoryTitle] = useState({value: ''})
	const [categoryDescription, setCategoryDescription] = useState({value: ''})
	const [categoryImage, setCategoryImage] = useState({value: ''})
	const [ categories, setCategories ] = useState(null)
	const [ buttonText, setButtonText ] = useState('Add new category')
	const [ status, setStatus ] = useState(false)
	const [ message, setMessage ] = useState('')

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
					<div className="">
						<div>
							<label className="">Category Title</label>
							<input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" name="category-title" onChange= {(e) => setCategoryTitle({value: e.target.value}) } value={categoryTitle.value} />
							{ categoryTitle.error &&
                                <span className="text-xs text-red-400">{ categoryTitle.errorMessage }</span>
                            }
						</div>
						<div>
							<label className="block">Category Description</label>
							<textarea className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" name="category-title" onChange= {(e) => setCategoryDescription({value: e.target.value}) } defaultValue={categoryDescription.value} >
							</textarea>
						</div>
						<div>
							<div className="aweb-categoryImage">
								<label className="">Category Image</label>
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
						</div>
						<button className="mb-4 mt-2 text-sm font-bold mb-2 text-grey-100 bg-indigo-800 border-2 border-gray-100 text-gray-300 rounded-md shadow-md hover:text-indigo-800 hover:bg-gray-300 p-2" onClick={(e) => addCategory(e)}>
							{ buttonText }
						</button>
						{ status && 
							<div className="aweb-success-note">
								{ message }
							</div>
						}
					
						{
							categories === null ? (
								'Loading datas'
							) : categories.length === 0 ? (
								'No product categories'
							) : (
								<table id="admin-content-table" className="m-0" style={{width:"100%"}}>
									<thead className="">
										<tr>
											<th>Title</th>
											<th>Description</th>
											<th>Actions</th>
										</tr>
									</thead>
									<tbody className="">
										{
											categories.map( ( category, index )  => {
												return (	 
													<tr key={ index }>
														<td>{category.title}</td>
														<td>{category.description}</td>
														<td><Link to={`/aweb-categories/${category.id}`}>Edit</Link></td>
													</tr>
												)
											})
										}
									</tbody>
								</table>
							)
						}
					</div>
				</div>					
			</div>
		</>
	)
}
export default AdminProductCategories;