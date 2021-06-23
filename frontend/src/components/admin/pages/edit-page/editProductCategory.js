import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import AdminMainNavigation from '../../navigation/AdminMainNavigation'
import { AiOutlineDelete } from "react-icons/ai";
import { GrAdd } from "react-icons/gr";

const axios = require('axios')

const AdminEditProductCategory = () => {
    const [categoryTitle, setCategoryTitle] = useState({value: ''})
	const [categoryDescription, setCategoryDescription] = useState({value: ''})
	const [categoryImage, setCategoryImage] = useState({value: ''})
    const [buttonText, setButtonText] = useState('Update category')
	const [status, setStatus] = useState(false)
	const [message, setMessage] = useState('')
    const { id } = useParams()

    const categoryImageRef = React.createRef()

    useEffect(() => {
        axios.get(`/product-categories.php?id=${id}`)
        .then(function(res) {
            setCategoryTitle({value:res.data.data[0].title})
            setCategoryDescription({value:res.data.data[0].description})
            let image = res.data.data[0].image_path[0]
            if( !image.includes('http://localhost/auction-web/') ) {
                image = `http://localhost/auction-web/${image.split('../').pop()}`
            }
            setCategoryImage({dataUrl:image})
        })
    }, [])

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
	const updateCategory = (e) => {
		e.preventDefault()
		if( validateCategoryTitle() ) {
			setButtonText( 'Adding category' )
			axios.post( '/edit-table/update-category.php', {
				submit: 'submit',
				title: categoryTitle.value,
				description: categoryDescription.value,
				image: categoryImage
			})
			.then(function(res) {
				if( res.data.status === true ) {
					setStatus(true)
					setMessage('Category updated')
				} else {
					setStatus(true)
					setMessage('Error in updating category')
				}
			})
		}
		setButtonText( 'Update category' )
	}

    return (
        <>
            <div id="auction-web-admin" className="content-wrap">
				<AdminMainNavigation/>
				<div id="admin-right-content">
                    <div className="py-2">
                        <label className="py-1">Category Title</label>
                        <input className="shadow appearance-none border rounded w-full py-2 px-3 bg-gray-200 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" name="category-title" onChange= {(e) => setCategoryTitle({value: e.target.value}) } value={categoryTitle.value} />
                        { categoryTitle.error &&
                            <span className="text-xs text-red-400">{ categoryTitle.errorMessage }</span>
                        }
                    </div>
                    <div className="py-2">
                        <label className="block py-1">Category Description</label>
                        <textarea className="shadow appearance-none border rounded w-full py-2 px-3 bg-gray-200 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" name="category-title" onChange= {(e) => setCategoryDescription({value: e.target.value}) } defaultValue={categoryDescription.value} >
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
                                <div className="relative w-48 h-48"><span className="bg-red-600 absolute image-delete absolute cursor-pointer right-0 text-red-500 hover:font-sm" onClick = { () => deleteCategoryImage() }><AiOutlineDelete/></span><img className="w-48 h-48" src={categoryImage.dataUrl} alt=""/></div>
                            </>
                        ) : (
                            <div className="image-upload cursor-pointer w-16 h-16 p-6 border border-gray-400 border-dashed" onClick = { () => handleCategoryImage() }><GrAdd/></div>
                        )}
                    </div>
                    <button id="admin-action-trigger-button" className="text-white active:bg-pink-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg focus:outline-none mr-1 mt-1 mb-10 ease-linear transition-all duration-150" type="button" onClick={(e) => updateCategory(e)}>
                        { buttonText }
                    </button>

                    { status && 
                        <div className="aweb-success-note">
                            { message }
                        </div>
                    }
                </div>
            </div>
        </>
    )
}
export default AdminEditProductCategory