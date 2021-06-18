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
                                            <strong>Fullname :</strong>
                                            { element.fullname }
                                        </div>
                                    }
                                    { element.email &&
                                        <div className="admin-single-user-field">
                                            <strong>Email Address :</strong> { element.email }
                                        </div>
                                    }
                                    { element.username &&
                                        <div className="admin-single-user-field">
                                            <strong>Username :</strong> { element.username }
                                        </div>   
                                    }
                                    { element.birthdate &&
                                        <div className="admin-single-user-field">
                                            <strong>Birth Date :</strong>
                                            <span> Day: { element.birthdate.day }</span>
                                            <span> Month: { element.birthdate.month }</span>
                                            <span> Year: { element.birthdate.year }</span>
                                        </div>
                                    }
                                    { element.contact_num &&
                                        <div className="admin-single-user-field">
                                            <strong>Contact Number :</strong> { element.contact_num.areaCode + ' ' + element.contact_num.number }
                                        </div>
                                    }
                                    { element.status &&
                                        <div className="admin-single-user-field">
                                            <strong>Status :</strong> { element.status }
                                        </div>
                                    }
                                    { element.permanent_ad &&
                                        <div className="admin-single-user-field">
                                            <div>Current Address </div>
                                            <div>
                                                Street Address:
                                                { element.current_ad.streetAddress }
                                            </div>
                                            <div>
                                                Postal Code:
                                                { element.current_ad.postalCode }
                                            </div>
                                            <div>
                                                State/Province:
                                                { element.current_ad.stateProvince }
                                            </div>
                                            <div>
                                                City:
                                                { element.current_ad.city }
                                            </div>
                                            <div>
                                                Country:
                                                { element.current_ad.country }
                                            </div>
                                        </div>
                                    }
                                    { element.permanent_ad &&
                                        <div className="admin-single-user-field">
                                            <div>Permanent Address </div>
                                            <div>
                                                Street Address:
                                                { element.permanent_ad.streetAddress }
                                            </div>
                                            <div>
                                                Postal Code:
                                                { element.permanent_ad.postalCode }
                                            </div>
                                            <div>
                                                State/Province:
                                                { element.permanent_ad.stateProvince }
                                            </div>
                                            <div>
                                                City:
                                                { element.permanent_ad.city }
                                            </div>
                                            <div>
                                                Country:
                                                { element.permanent_ad.country }
                                            </div>
                                        </div>
                                    }
                                    { element.role &&
                                        <div className="admin-single-user-field">
                                            <strong>Role :</strong> { element.role }
                                        </div>
                                    }
                                    { element.document_type &&
                                        <div className="admin-single-user-field">
                                            <strong>Document Submitted :</strong> { element.document_type }
                                        </div>
                                    }
                                    { element.pphoto &&
                                        <div className="admin-single-user-field">
                                            <strong>Personal Photo :</strong> <img src={ element.pphoto } />
                                        </div>
                                    }
                                    { element.document_image_path &&
                                        <div className="admin-single-user-field">
                                            <strong>Document Image One :</strong> 
                                            <div>
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
                                        <div className="admin-single-user-field">
                                            <strong>Document Image Two :</strong> 
                                            <div>
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
                                <button>Verified User</button>
                        }
                        <button>Delete the User</button>
                    </div>
                </div>
            </div>
        </>
    )
}
export default AdminEditUser