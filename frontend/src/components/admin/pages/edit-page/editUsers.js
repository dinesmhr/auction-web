import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import AdminMainNavigation from '../../navigation/AdminMainNavigation'
import ModalImage from "react-modal-image";

const axios = require('axios');

const AdminEditUser = () =>  {
    const [ user, setUser ] = useState()
    const [ userStatus, setUserStatus ] = useState()
    const { id } = useParams()

    useEffect(() => {
        axios.get( `/user-details.php?id=${id}` )
        .then(function(res) {
            if( res.data.status ) {
                setUser( res.data.data )
                setUserStatus(res.data.data[0].status)
            }
        })
    })
    console.log(user)

    const verifyUser = () => {

    }

    return (
        <>         
            <div className="content-wrap">
                <AdminMainNavigation/>
                <div id="admin-right-content" className="float-right w-4/5 text-white p-8 h-screen mt-12">
                    { user &&
                        user.map(( element, index ) => {
                            return(
                                <div key={ index } >
                                    { element.fullname &&
                                        <div className="admin-single-user-field">
                                            <strong>Fullname: </strong>
                                            <div className="input_editUser bg-gray-700 appearance-none border-1 border-gray-200 rounded mb-3 w-full py-1 px-5 ml-2 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500">
                                            { element.fullname }
                                            </div>
                                        </div>
                                    }
                                    { element.email &&
                                        <div className="admin-single-user-field">
                                            <strong>Email Address:</strong>
                                            <div className="input_editUser bg-gray-700 appearance-none border-1 border-gray-200 rounded mb-3 w-full py-1 px-5 ml-2 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500">
                                             { element.email }
                                            </div>
                                        </div>
                                    }
                                    { element.username &&
                                        <div className="admin-single-user-field">                                      
                                            <strong>Username :</strong> 
                                            <div className="input_editUser bg-gray-700 appearance-none border-1 border-gray-200 rounded mb-3 w-full py-1 px-5 ml-2 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500">
                                            { element.username }
                                            </div>
                                        </div>   
                                    }
                                    { element.birthdate &&
                                        <div className="admin-single-user-field">
                                            <strong>Birth Date :</strong>
                                            <div className="input_editUser bg-gray-700 appearance-none border-1 border-gray-200 rounded mb-3 w-full py-1 px-5 ml-2 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500">

                                            <span> Day: { element.birthdate.day }</span>
                                            <span> Month: { element.birthdate.month }</span>
                                            <span> Year: { element.birthdate.year }</span>
                                        </div>
                                        </div>
                                    }
                                    { element.contact_num &&
                                        <div className="admin-single-user-field">
                                            <strong>Contact Number :</strong>
                                            <div className="input_editUser bg-gray-700 appearance-none border-1 border-gray-200 rounded mb-3 w-full py-1 px-5 ml-2 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500">
                                             { element.contact_num.areaCode + ' ' + element.contact_num.number }
                                             </div>
                                        </div>
                                    }
                                    { element.status &&
                                        <div className="admin-single-user-field">
                                            <strong>Status :</strong>
                                            <div className="input_editUser bg-gray-700 appearance-none border-1 border-gray-200 rounded mb-3 w-full py-1 px-5 ml-2 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500">
                                             { element.status }
                                             </div>
                                        </div>
                                    }
                                    { element.permanent_ad &&
                                        <div className="admin-single-user-field">
                                            <div className="flex justify-center mt-3 italic">Current Address </div>
                                            <div>
                                                Street Address:
                                                <div className="input_editUser bg-gray-700 appearance-none border-1 border-gray-200 rounded mb-3 w-full py-1 px-5 ml-2 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500">
                                                { element.current_ad.streetAddress }
                                                </div>
                                            </div>
                                            <div>                                           
                                                Postal Code:
                                                <div className="input_editUser bg-gray-700 appearance-none border-1 border-gray-200 rounded mb-3 w-full py-1 px-5 ml-2 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500">
                                                { element.current_ad.postalCode }
                                                </div>
                                            </div>
                                            <div>
                                                State/Province:
                                                <div className="input_editUser bg-gray-700 appearance-none border-1 border-gray-200 rounded mb-3 w-full py-1 px-5 ml-2 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500">
                                                { element.current_ad.stateProvince }
                                                </div>
                                            </div>
                                            <div>
                                                City:
                                                <div className="input_editUser bg-gray-700 appearance-none border-1 border-gray-200 rounded mb-3 w-full py-1 px-5 ml-2 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500">
                                                { element.current_ad.city }
                                                </div>
                                            </div>
                                            <div>
                                                Country:
                                                <div className="input_editUser bg-gray-700 appearance-none border-1 border-gray-200 rounded mb-3 w-full py-1 px-5 ml-2 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500">
                                                { element.current_ad.country }
                                                </div>
                                            </div>
                                        </div>
                                    }
                                    { element.permanent_ad &&
                                        <div className="admin-single-user-field">
                                            <div className="flex justify-center mt-3 italic">Permanent Address </div>
                                            <div>
                                                Street Address:
                                                <div className="input_editUser bg-gray-700 appearance-none border-1 border-gray-200 rounded mb-3 w-full py-1 px-5 ml-2 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500">
                                                { element.permanent_ad.streetAddress }
                                                </div>
                                            </div>
                                            <div>
                                                Postal Code:
                                                <div className="input_editUser bg-gray-700 appearance-none border-1 border-gray-200 rounded mb-3 w-full py-1 px-5 ml-2 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500">
                                                { element.permanent_ad.postalCode }
                                                </div>
                                            </div>
                                            <div>
                                                State/Province:
                                                <div className="input_editUser bg-gray-700 appearance-none border-1 border-gray-200 rounded mb-3 w-full py-1 px-5 ml-2 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500">
                                                { element.permanent_ad.stateProvince }
                                                </div>
                                            </div>
                                            <div>
                                                City:
                                                <div className="input_editUser bg-gray-700 appearance-none border-1 border-gray-200 rounded mb-3 w-full py-1 px-5 ml-2 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500">
                                                { element.permanent_ad.city }
                                                </div>
                                            </div>
                                            <div>
                                                Country:
                                                <div className="input_editUser bg-gray-700 appearance-none border-1 border-gray-200 rounded mb-3 w-full py-1 px-5 ml-2 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500">
                                                { element.permanent_ad.country }
                                                </div>
                                            </div>
                                        </div>
                                    }
                                    { element.role &&
                                        <div className="admin-single-user-field">
                                            <strong>Role :</strong>
                                            <div className="input_editUser bg-gray-700 appearance-none border-1 border-gray-200 rounded mb-3 w-full py-1 px-5 ml-2 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500">
                                             { element.role }
                                            </div> 
                                        </div>
                                    }
                                    { element.document_type &&
                                        <div className="admin-single-user-field">
                                            <strong>Document Submitted :</strong>
                                            <div className="input_editUser bg-gray-700 appearance-none border-1 border-gray-200 rounded mb-3 w-full py-1 px-5 ml-2 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500">
                                             { element.document_type }
                                            </div>
                                        </div>
                                    }
                                    { element.pphoto &&
                                        <div className="admin-single-user-field">
                                            <strong>Personal Photo :</strong> <img src={ element.pphoto } />
                                        </div>
                                    }
                                    { element.document_image_path &&
                                        <div className="admin-single-user-field w-48 h-auto mt-3">
                                            <strong>Document Image One :</strong> 
                                            <div className="mt-2">
                                                <ModalImage
                                                    small={ `http://localhost/auction-web/${element.document_image_path.split('../').pop()}` }
                                                    large={ `http://localhost/auction-web/${element.document_image_path.split('../').pop()}` }
                                                    hideDownload= {true}
                                                    showRotate={true}
                                                />
                                            </div>
                                        </div>
                                    }
                                    { element.document_image_two_path &&
                                        <div className="admin-single-user-field w-48 h-auto mt-3 mb-4">
                                            <strong>Document Image Two :</strong> 
                                            <div className="mt-2">
                                                <ModalImage
                                                    small={ `http://localhost/auction-web/${element.document_image_two_path.split('../').pop()}` }
                                                    large={ `http://localhost/auction-web/${element.document_image_two_path.split('../').pop()}` }
                                                    hideDownload= {true}
                                                    showRotate={true}
                                                />
                                            </div>
                                        </div>
                                    }
                                </div>
                            )
                        })
                    }
                    <div>
                        { ( userStatus === 'under-verification' ) &&
                                <button onClick = { (e) => verifyUser() }>Verify the user</button>
                        }
                        { ( userStatus === 'not-verified' ) &&
                                <button>Document not available for verification</button>
                        }
                        { ( userStatus === 'verified' ) &&
                                <button className="bg-white hover:bg-gray-300 text-gray-800 font-semibold py-1 px-2 mr-3 border border-gray-400 rounded shadow">Verified User</button>
                        }
                        <button className="bg-red-600 hover:bg-red-700 text-gray-900 font-semibold py-1 px-2 border border-gray-400 shadow-md rounded shadow">Delete the User</button>
                    </div>
                </div>
            </div>
        </>
    )
}
export default AdminEditUser