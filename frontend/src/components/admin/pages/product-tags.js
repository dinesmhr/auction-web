
import React, { useEffect, useState } from 'react';
import AdminMainNavigation from '../navigation/AdminMainNavigation'
import { ImCross } from "react-icons/im";
import { AiFillTag } from "react-icons/ai";

const axios = require('axios');

const AdminProductTags = () => {
	const [tagTitle, setTagTitle] = useState({value: ''})
	const [editTagId, setEditTagId] = useState()
	const [editTagTitle, setEditTagTitle] = useState({value: ''})
	const [editButtonText, setEditButtonText] = useState('Update tag')
	const [editStatus, setEditStatus] = useState(false)
	const [editMessage, setEditMessage] = useState('')
	const [tags, setTags] = useState(null)
	const [buttonText, setButtonText] = useState('Add new tag')
	const [status, setStatus] = useState(false)
	const [message, setMessage] = useState('')
	const [showTagModal, setShowTagModal] = useState(false);
	const [showTagUpdateModal, setShowTagUpdateModal] = useState(false);

	useEffect(() => {
        axios.get( '/product-tags.php' )
        .then(function(response) {
            if( response.data.status === true ) {
                setTags( response.data.data )
            } else {
				setTags('')
			}
        })
	})

	// validate tag title
	const validateTagTitle = () => {
		if( tagTitle.value === '' ) {
            tagTitle.error = true
            tagTitle.errorMessage = "Title field is empty"
        } else {
            return true
        }
        setTagTitle( JSON.parse(JSON.stringify( tagTitle )) )
        return false
	}

	// handle add new tag
	const addTag = (e) => {
		e.preventDefault()
		if( validateTagTitle() ) {
			setButtonText( 'Adding tag' )
			axios.post( '/edit-table/edit-tags.php', {
				submit: 'submit',
				title: tagTitle.value
			})
			.then(function(res) {
				if( res.data.status === true ) {
					setTagTitle({value: ''})
					setStatus(true)
					setMessage('Tag created')
				} else {
					setStatus(true)
					setMessage('Error in creating tag')
				}
			})
		}
		setButtonText( 'Add new tag' )
	}

	const handleEditClick = (id, title) => {
		setEditTagId(id)
		setEditTagTitle({value: title})
		setShowTagUpdateModal(true)
	}

	// validate tag title
	const validateEditTagTitle = () => {
		if( editTagTitle.value === '' ) {
            editTagTitle.error = true
            editTagTitle.errorMessage = "Title field is empty"
        } else {
            return true
        }
        setEditTagTitle( JSON.parse(JSON.stringify( editTagTitle )) )
        return false
	}

	// handle update tag
	const updateTag = (e) => {
		e.preventDefault()
		if( validateEditTagTitle() ) {
			setEditButtonText( 'Updating tag' )
			axios.post( '/edit-table/update-tag.php', {
				submit: 'submit',
				id: editTagId,
				title: editTagTitle.value
			})
			.then(function(res) {
				if( res.data.status === true ) {
					setEditStatus(true)
					setEditMessage('Tag updated')
				} else {
					setEditStatus(true)
					setEditMessage('Error in updating tag')
				}
			})
		}
		setEditButtonText( 'Update tag' )
	}

	return (
		<>
			<div id="auction-web-admin" className="content-wrap">
				<AdminMainNavigation/>
				<div id="admin-right-content">
					<div className="admin-page-top-description p-5 font-extralight italic text-sm">
						{ `Manage, Edit or Delete the product tags in this panel. Navigate to the single tag edit page ` }
					</div>
					<button id="admin-action-trigger-button" className="text-white active:bg-pink-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mt-1 mb-10 ease-linear transition-all duration-150" type="button" onClick={() => setShowTagModal(true)}>
						{ buttonText }
					</button>
					{ showTagModal ? (
						<>
							<div id="admin-modal-box" className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
							>
								<div className="relative my-6 mx-20">
								{/*content*/}
								<div className="admin-modal-box border-0 rounded-lg shadow-lg relative flex flex-col w-96 outline-none focus:outline-none">
									{/*header*/}
									<div className="flex items-start p-2 admin-modal-border">
									<h3 className="text-2xl font-semibold pl-4">
										{ `Create Tag` }
									</h3>
									<button className="p-1 ml-auto bg-gray border-0 text-white float-right text-base outline-none focus:outline-none" onClick={() => setShowTagModal(false)}
									>
										<ImCross/>
									</button>
									</div>
									{/*body*/}
									<div className="relative p-6 flex-auto">
										<div className="py-2">
											<label className="py-1">Tag Title</label>
											<input className="shadow appearance-none border rounded w-full py-2 px-3 bg-gray-200 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" name="tag-title" onChange= {(e) => setTagTitle({value: e.target.value}) } value={tagTitle.value} />
											{ tagTitle.error &&
												<span className="text-xs text-red-400">{ tagTitle.errorMessage }</span>
											}
										</div>
										<button id="admin-action-trigger-button" className="text-white active:bg-pink-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg focus:outline-none mr-1 mt-1 mb-10 ease-linear transition-all duration-150" type="button" onClick={(e) => addTag(e)}>
											{ buttonText }
										</button>

										{ status && 
											<div className="aweb-success-note">
												{ message }
											</div>
										}
									</div>
								</div>
								</div>
							</div>
							<div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
						</>
					) : null}

					{
						tags === null ? (
							<div id="admin-content-table" className="tracking-wider"><span className="grid p-4">Loading datas</span></div>
						) : tags.length === 0 ? (
							<div id="admin-content-table" className="tracking-wider"><span className="grid p-4">No product tags</span></div>
						) : (
							<div id="admin-content-table" className="tracking-wider">
								<div className="admin-content-table-row-heading grid grid-cols-3 flex flex-row font-semibold">
									<span className="py-4 px-20">Title</span>
									<span className="py-4 px-20">Count</span>
									<span className="py-4 px-20">Actions</span>
								</div>
								{
									tags.map( ( tag, index )  => {
										return (	 
											<div key={ index } className="admin-content-table-row grid grid-cols-3 flex flex-row text-sm">
												<span className="py-2 px-16 flex"><AiFillTag className="mt-1"/><span className="px-2">{tag.title}</span></span>
												<span className="py-2 px-24">{tag.id}</span>
												<span className="py-2 px-20">
													<button className="bg-transparent py-1 px-4 hover:bg-blue-500 text-blue-700 font-semibold hover:text-white border border-blue-500 hover:border-transparent rounded" onClick = { () => handleEditClick(tag.id, tag.title)}>Edit</button>
												</span>
											</div>
										)
									})
								}
								{ showTagUpdateModal ? (
									<>
										<div id="admin-modal-box" className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
										>
											<div className="relative my-6 mx-20">
											{/*content*/}
											<div className="admin-modal-box border-0 rounded-lg shadow-lg relative flex flex-col w-96 outline-none focus:outline-none">
												{/*header*/}
												<div className="flex items-start p-2 admin-modal-border">
												<h3 className="text-2xl font-semibold pl-4">
													{ `Update Tag` }
												</h3>
												<button className="p-1 ml-auto bg-gray border-0 text-white float-right text-base outline-none focus:outline-none" onClick={() => setShowTagUpdateModal(false)}
												>
													<ImCross/>
												</button>
												</div>
												{/*body*/}
												<div className="relative p-6 flex-auto">
													<div className="py-2">
														<label className="py-1">Tag Title</label>
														<input className="shadow appearance-none border rounded w-full py-2 px-3 bg-gray-200 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" name="tag-title" onChange= {(e) => setEditTagTitle({value: e.target.value}) } value={editTagTitle.value} />
														{ editTagTitle.error &&
															<span className="text-xs text-red-400">{ editTagTitle.errorMessage }</span>
														}
													</div>
													<button id="admin-action-trigger-button" className="text-white active:bg-pink-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg focus:outline-none mr-1 mt-1 mb-10 ease-linear transition-all duration-150" type="button" onClick={(e) => updateTag(e)}>
														{ editButtonText }
													</button>
			
													{ editStatus && 
														<div className="aweb-success-note">
															{ editMessage }
														</div>
													}
												</div>
											</div>
											</div>
										</div>
										<div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
									</>
								) : null}
							</div>
						)
					}
				</div>					
			</div>
		</>
	)
}
export default AdminProductTags;