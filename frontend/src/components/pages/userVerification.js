/**
 * User verification constant function
 * 
 * @since 1.0.0
 * 
 */
import React, { useState, useEffect } from 'react';
import Header from '../header/Header';
import "react-datepicker/dist/react-datepicker.css";
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import DatePicker from "react-modern-calendar-datepicker";
import "react-modern-calendar-datepicker/lib/DatePicker.css";
import { GrAdd } from "react-icons/gr";
import { AiOutlineDelete } from "react-icons/ai";

const axios = require('axios')

const UserVerification = () => {
    const [ userId, setUserId ] = useState('')
    const [ isLoggedIn, setIsLoggedIn ] = useState(false)
    const [ loggedUserData, setLoggedUserData ] = useState({})
    const [ userStatus, setUserStatus ] = useState('')
    const [ submitText, setSubmitText ] = useState('Submit For Verification')
    const [ fullname, setFullname ] = useState({ value: ''})
    const [ email, setEmail ] = useState({value:''})
    const [ profession, setProfession ] = useState({value:''})
    const [ birthDate, setBirthDate ] = useState({value: ''})
    const [ currentAddress, setCurrentAddress ] = useState({ streetAddress: '', city: '', stateProvince: '', postalCode: '', country: '' })
    const [ permanentAddress, setPermanentAddress ] = useState({ streetAddress: '', city: '', stateProvince: '', postalCode: '', country: '' })
    const [ contactNumber, setContactNumber ] = useState({ areaCode: '+977', number: '' })
    const [ documentType, setDocumentType ] = useState({value:'citizenship'})
    const [ documentImage, setDocumentImage ] = useState({value:''})
    const [ documentImageOne, setDocumentImageOne ] = useState({value:''})
    const [ status, setStatus ] = useState(false)
    const [ message, setMessage ] = useState('')

    const documentImageRef = React.createRef()
    const documentImageOneRef = React.createRef()
    
    useEffect(() => {
        axios.get( '/sessions.php' )
        .then(function(res) {
            if(res.data.login) {
                setIsLoggedIn(true)
                setUserId(res.data.userId)
            }
        })
    }, [])

    const checkUserDetails = () => {
        axios.get( `/users.php?id=${userId}`)
        .then(function(res) {
            if(res.data.status) {
                setLoggedUserData(res.data.data[0])
                setFullname({value: res.data.data[0].fullname})
                setEmail({value: res.data.data[0].email})
                setUserStatus(res.data.data[0].status)
            }
        })
    }
    useEffect(() => {
        userId &&
        checkUserDetails()
    }, [userId])

    // trigger document image
    const handleDocumentImage = () => {
        documentImageRef.current.click()
    }

    // trigger document image one
    const handleDocumentImageOne = () => {
        documentImageOneRef.current.click()
    }

    // help set document image one
    const handlesetDocumentImage = (file) => {
        setDocumentImage({value: file.target.files[0]})
        if(file.target.files[0]) {
            let reader = new FileReader();
            reader.readAsDataURL(file.target.files[0]);
            reader.onload = (e) => {
                setDocumentImage({dataUrl: e.target.result})
            }
        } else {
            setDocumentImage({value: '', dataUrl: ''})
        }
    }
    const deleteDocumentImage = () => {
        setDocumentImage({value: ''})
    }

    // help set document image One
    const handlesetDocumentImageOne = (file) => {
        setDocumentImageOne({value: file.target.files[0]})
        if(file.target.files[0]) {
            let reader = new FileReader();
            reader.readAsDataURL(file.target.files[0]);
            reader.onload = (e) => {
                setDocumentImageOne({dataUrl: e.target.result})
            }
        } else {
            setDocumentImageOne({value: '', dataUrl: ''})
        }
    }
    const deleteDocumentImageOne = () => {
        setDocumentImageOne({value: ''})
    }

    /******************** Validation Fields Section  ********************/
    // validate fullname
    const validateFullname = () => {
        if( fullname.value === '' ) {
            fullname.error = true
            fullname.errorMessage = "Fullname field cannot be empty"
        } else {
            return true
        }
        setFullname( JSON.parse(JSON.stringify( fullname )) )
        return false
    }

    // validate email field
    const validateEmail = () => {
        let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if( email.value === '' ) {
            email.error = true;
            email.errorMessage = "Email must not be empty";
        } else if( !re.test( email.value ) ) { 
            email.error = true;
            email.errorMessage = "Email is not valid";
        }  else {
            return true
        }
        setEmail( JSON.parse(JSON.stringify( email )) )
        return false
    }

    const validateContactNumber = () => {
        if( contactNumber.areaCode === '' || contactNumber.number === '' ) {
            contactNumber.error = true
            contactNumber.errorMessage = "Add contact number"
        } else if(/[A-Z]/.test(contactNumber.number) || /[a-z]/.test(contactNumber.number) ) {
            contactNumber.error = true
            contactNumber.errorMessage = "Invalid contact number"
        } else {
            return true
        }
        setContactNumber( JSON.parse(JSON.stringify( contactNumber )) )
        return false
    }

    const validateBirthdate = () => {
        if( birthDate.value === '' ) {
            birthDate.error = true
            birthDate.errorMessage = "Select Birthdate"
        } else {
            return true
        }
        setBirthDate( JSON.parse(JSON.stringify( birthDate )) )
        return false
    }
    
    const validatePermanentAddress = () => {
        if( permanentAddress.streetAddress === '' || permanentAddress.city === '' || permanentAddress.stateProvince === '' || permanentAddress.postalCode === '' || permanentAddress.country === '' ) {
            permanentAddress.error = true
            permanentAddress.errorMessage = "All fields are required"
        } else {
            return true
        }
        setPermanentAddress( JSON.parse(JSON.stringify( permanentAddress )) )
        return false
    }

    const validateDocumentImage = () => {
        if( documentImage.value === '' ) {
            documentImage.error = true
            documentImage.errorMessage = "No image uploaded"
        } else {
            return true
        }
        setDocumentImage( JSON.parse(JSON.stringify( documentImage )) )
        return false
    }

    const onSubmit = (e) => {
        e.preventDefault()
        if( validateFullname() && validateEmail() && validateContactNumber() && validateBirthdate() && validatePermanentAddress() && validateDocumentImage() ) {
            setSubmitText( 'Submitting for verification' )
            axios.post('/edit-table/edit-users-details.php', {
                submit: 'verification',
                userid: userId,
                fullname: fullname.value,
                email: email.value,
                profession: profession.value,
                birthdate: birthDate.value,
                currentAddress: currentAddress,
                permanentAddress: permanentAddress,
                contactNumber: contactNumber,
                documentType: documentType.value,
                documentImage: documentImage,
                documentImageOne: documentImageOne
            })
            .then(function (response) {
                if( response.data.status ) {
                    setStatus(true)
                    setMessage( 'Signed up successfully' )
                } else {
                    setStatus(true)
                    setMessage( 'Error in sign up' )
                }
                setProfession({value:''})
                setBirthDate({value: ''})
                setCurrentAddress({ streetAddress: '', city: '', stateProvince: '', postalCode: '', country: '' })
                setPermanentAddress({ streetAddress: '', city: '', stateProvince: '', postalCode: '', country: '' })
                setContactNumber({ areaCode: '+977', number: '' })
                setDocumentType({value: ''})
                setDocumentImage({value:''})
                setDocumentImageOne({value:''})
                checkUserDetails()
                setSubmitText( 'Submit For Verification.' )
            })
            .catch(function (error) {
                setStatus(true)
                setMessage( 'Error in sign up' )
            });
        } else {
            setSubmitText( 'Submit For Verification' )
        }
    }

    if( userStatus === 'under-verification' ) {
        return (
            <>
                <Header isLoggedIn = { isLoggedIn }/> 
                <div id="auction-web-user-verification">
                    <div className="aweb-heading">
                    { 
                        `You are logged in as ${fullname.value}. Your account is currently under verification process. Thank you for your patience!!`
                    }
                    </div>
                </div>
            </>
        )
    }

    return(
        <>
            <Header isLoggedIn = { isLoggedIn }/> 
            <div id="auction-web-user-verification">
                <form id="aweb-user-verification-form">
                    <div className="aweb-heading">
                        { 
                            `You are logged in as ${ fullname.value}. Please verify your account here.` 
                        }
                    </div>
                    <div className="input-wrapper">
                        <div className="aweb-heading-personal-details">
                            { 'Personal Details' }
                        </div>
                        <div className="aweb-fullname">
                            <label>Fullname</label>
                            { fullname.error &&
                                <div className="aweb-red-note">
                                    { fullname.errorMessage }
                                </div>
                            }
                            <input type="text" name="fullname" onChange={ (e) => setFullname({ value: e.target.value}) } value={ fullname.value } disabled/>
                        </div>
                        <div className="aweb-email">
                            <label>Email Address</label>
                            { email.error &&
                                <div className="aweb-red-note">
                                    { email.errorMessage }
                                </div>
                            }
                            <input type="text" name="email" onChange={ (e) => setEmail({ value: e.target.value}) } value={ email.value } disabled/>
                        </div>
                        <div className="aweb-profession">
                            <label>Profession</label>
                            { profession.error &&
                                <div className="aweb-red-note">
                                    { profession.errorMessage }
                                </div>
                            }
                            <input type="text" name="profession" required onChange={ (e) => setProfession({ value: e.target.value }) } value={ profession.value }/>
                        </div>
                        <div className="">
                            <div className="aweb-heading">
                                { 'Contact Number' }
                            </div>
                            { contactNumber.error &&
                                <div className="aweb-red-note">
                                    { contactNumber.errorMessage }
                                </div>
                            }
                            <div className="aweb-areacode">
                                <PhoneInput
                                    country={'np'}
                                    value={contactNumber.areaCode}
                                    onChange={ phone => setContactNumber({ areaCode: phone, number: contactNumber.number })}
                                />
                            </div>
                            <div className="aweb-contactNumber">
                                <input type="text" name="contactNumber" required onChange={ (e) => setContactNumber({ areaCode: contactNumber.areaCode, number: e.target.value }) } value={ contactNumber.number }/>
                            </div>
                        </div>
                        <div className="aweb-birthDate">
                            <label>Birth Date</label>
                            { birthDate.error &&
                                <div className="aweb-red-note">
                                    { birthDate.errorMessage }
                                </div>
                            }
                            <DatePicker
                                value={birthDate.value}
                                onChange={(value) => setBirthDate({value:value})}
                                inputPlaceholder="Select a day"
                                shouldHighlightWeekends
                                />                      
                        </div>
                        <div className="input-wrapper">
                            <div className="aweb-heading">
                                { 'Current Address' }
                            </div>
                            { currentAddress.error &&
                                <div className="aweb-red-note">
                                    { currentAddress.errorMessage }
                                </div>
                            }
                            <div className="street-address">
                                <label>Street Address</label>
                                <input type="text" name="cstreetAddress" onChange = { (e) => setCurrentAddress({ streetAddress: e.target.value, city: currentAddress.city, stateProvince: currentAddress.stateProvince, postalCode: currentAddress.postalCode, country: currentAddress.country }) } value={currentAddress.streetAddress}/>
                            </div>
                            <div className="city">
                                <label>City</label>
                                <input type="text" name="city" onChange = { (e) => setCurrentAddress({ streetAddress: currentAddress.streetAddress, city: e.target.value, stateProvince: currentAddress.stateProvince, postalCode: currentAddress.postalCode, country: currentAddress.country }) } value={currentAddress.city}/>
                            </div>
                            <div className="stateProvince">
                                <label>State/Province</label>
                                <input type="text" name="stateProvince" onChange = { (e) => setCurrentAddress({ streetAddress: currentAddress.streetAddress, city: currentAddress.city, stateProvince: e.target.value, postalCode: currentAddress.postalCode, country: currentAddress.country }) } value={currentAddress.stateProvince}/>
                            </div>
                            <div className="postalCode">
                                <label>Postal Code</label>
                                <input type="text" name="postalCode" onChange = { (e) => setCurrentAddress({ streetAddress: currentAddress.streetAddress, city: currentAddress.city, stateProvince: currentAddress.stateProvince, postalCode: e.target.value, country: currentAddress.country }) } value={currentAddress.postalCode}/>
                            </div>
                            <div className="country">
                                <label>Country</label>
                                <input type="text" name="country" onChange = { (e) => setCurrentAddress({ streetAddress: currentAddress.streetAddress, city: currentAddress.city, stateProvince: currentAddress.stateProvince, postalCode: currentAddress.postalCode, country: e.target.value }) } value={currentAddress.country}/>
                            </div>
                        </div>
                        <div className="input-wrapper">
                            <div className="aweb-heading">
                                { 'Permanent Address' }
                            </div>
                            { permanentAddress.error &&
                                <div className="aweb-red-note">
                                    { permanentAddress.errorMessage }
                                </div>
                            }
                            <div className="street-address">
                                <label>Street Address</label>
                                <input type="text" name="cstreetAddress" onChange = { (e) => setPermanentAddress({ streetAddress: e.target.value, city: permanentAddress.city, stateProvince: permanentAddress.stateProvince, postalCode: permanentAddress.postalCode, country: permanentAddress.country }) } value={permanentAddress.streetAddress}/>
                            </div>
                            <div className="city">
                                <label>City</label>
                                <input type="text" name="city" onChange = { (e) => setPermanentAddress({ streetAddress: permanentAddress.streetAddress, city: e.target.value, stateProvince: permanentAddress.stateProvince, postalCode: permanentAddress.postalCode, country: permanentAddress.country }) } value={permanentAddress.city}/>
                            </div>
                            <div className="stateProvince">
                                <label>State/Province</label>
                                <input type="text" name="stateProvince" onChange = { (e) => setPermanentAddress({ streetAddress: permanentAddress.streetAddress, city: permanentAddress.city, stateProvince: e.target.value, postalCode: permanentAddress.postalCode, country: permanentAddress.country }) } value={permanentAddress.stateProvince}/>
                            </div>
                            <div className="postalCode">
                                <label>Postal Code</label>
                                <input type="text" name="postalCode" onChange = { (e) => setPermanentAddress({ streetAddress: permanentAddress.streetAddress, city: permanentAddress.city, stateProvince: permanentAddress.stateProvince, postalCode: e.target.value, country: permanentAddress.country }) } value={permanentAddress.postalCode}/>
                            </div>
                            <div className="country">
                                <label>Country</label>
                                <input type="text" name="country" onChange = { (e) => setPermanentAddress({ streetAddress: permanentAddress.streetAddress, city: permanentAddress.city, stateProvince: permanentAddress.stateProvince, postalCode: permanentAddress.postalCode, country: e.target.value }) } value={permanentAddress.country}/>
                            </div>
                        </div>
                        <div className="input-wrapper">
                            <div className="aweb-heading">
                                { 'Document Details' }
                            </div>
                            <div className="aweb-doc-type">
                                <label>Document Type</label>
                                <select onChange={(e) => setDocumentType({value: e.target.value}) }>
                                    <option value='citizenship'>{ 'Citizenship' }</option>
                                    <option value='passport'>{ 'Passport' }</option>
                                </select>
                            </div>
                            <div className="aweb-documentImage">
                                <label>Document Image One</label>
                                { documentImage.error &&
                                    <div className="aweb-red-note">
                                        { documentImage.errorMessage }
                                    </div>
                                }
                                <input type="file" name="documentImage" ref={documentImageRef} onChange = { (e) => handlesetDocumentImage(e) } style={{display:"none"}}/>
                                { documentImage.dataUrl ? (
                                    <>
                                        <span className="image-delete" onClick = { () => deleteDocumentImage() }><AiOutlineDelete/></span>
                                        <span><img src={documentImage.dataUrl} /></span>
                                    </>
                                ) : (
                                    <span className="image-upload" onClick = { () => handleDocumentImage() }><GrAdd/></span>
                                )}
                            </div>
                            <div className="aweb-documentImageOne">
                                <label>Document Image Two</label>
                                <input type="file" name="documentImageOne" ref={documentImageOneRef} onChange = { (e) => handlesetDocumentImageOne(e) } style={{display:"none"}}/>
                                { documentImageOne.dataUrl ? (
                                    <>
                                        <span className="image-delete" onClick = { () => deleteDocumentImageOne() }><AiOutlineDelete/></span>
                                        <span><img src={documentImageOne.dataUrl} /></span>
                                    </>
                                ) : (
                                    <span className="image-upload" onClick = { () => handleDocumentImageOne() }><GrAdd/></span>
                                )}
                            </div>
                        </div>
                        <div className="aweb-submit">
                            <input type="submit" name="submit" onClick= { (e) => onSubmit(e) } value={ submitText }/>
                        </div>
                        { status && 
                            <div className="aweb-success-note">
                                { message }
                            </div>
                        }
                    </div>
                </form>
            </div>
        </>
    )
}

export default UserVerification