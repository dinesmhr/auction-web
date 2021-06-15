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
				image: categoryImage.value
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
			<div className="aweb-admin-top-header">
				<h1 className="aweb-admin-site-title">Auction Web</h1>
				<AdminMainNavigation/>
				<div>
					<div>
						<div>
							<label>Category Title</label>
							{ categoryTitle.error &&
                                <span class="text-xs text-red-700">{ categoryTitle.errorMessage }</span>
                            }
							<input type="text" name="category-title" onChange= {(e) => setCategoryTitle({value: e.target.value}) } value={categoryTitle} />
						</div>
						<div>
							<label>Category Description</label>
							<textarea name="category-title" onChange= {(e) => setCategoryDescription({value: e.target.value}) } defaultValue={categoryDescription} >
							</textarea>
						</div>
						<div>
							<div className="aweb-categoryImage">
								<label>Category Image</label>
								{ categoryImage.error &&
									<span class="text-xs text-red-700">{ categoryImage.errorMessage }</span>
								}
								<input type="file" name="categoryImage" ref={categoryImageRef} onChange = { (e) => handlesetCategoryImage(e) } style={{display:"none"}}/>
								{ categoryImage.dataUrl ? (
									<>
										<div className="w-48 h-48"><span className="image-delete" onClick = { () => deleteCategoryImage() }><AiOutlineDelete/></span><img className="w-48 h-48" src={categoryImage.dataUrl} alt=""/></div>
									</>
								) : (
									<div className="image-upload cursor-pointer w-16 h-16 p-6 border border-gray-400 border-dashed" onClick = { () => handleCategoryImage() }><GrAdd/></div>
								)}
							</div>
						</div>
						<button onClick={(e) => addCategory(e)}>
							{ buttonText }
						</button>
						{ status && 
							<div className="aweb-success-note">
								{ message }
							</div>
						}
					</div>
					{
						categories === null ? (
							'Loading datas'
						) : categories.length === 0 ? (
							'No product categories'
						) : (
							<table style={{width:"75%"}}>
								<thead>
									<tr>
										<th>Title</th>
										<th>Description</th>
										<th>Actions</th>
									</tr>
								</thead>
								<tbody>
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
		</>
	)
}
export default AdminProductCategories;