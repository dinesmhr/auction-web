/**
 * User verification constant function
 * 
 * @since 1.0.0
 * 
 */
import React, { useState, useEffect } from 'react';
import Header from '../header/Header';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import ImageUploader from 'react-images-upload';
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
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
    const [ birthDate, setBirthDate ] = useState()
    const [ currentAddress, setCurrentAddress ] = useState({ streetAddress: '', city: '', stateProvince: '', postalCode: '', country: '' })
    const [ permanentAddress, setPermanentAddress ] = useState({ streetAddress: '', city: '', stateProvince: '', postalCode: '', country: '' })
    const [ contactNumber, setContactNumber ] = useState({ areaCode: '', number: '' })
    const [ documentType, setDocumentType ] = useState({value:''})
    const [ documentImage, setDocumentImage ] = useState({value:''})
    const [ documentImageOne, setDocumentImageOne ] = useState({value:''})

    const documentImageRef = React.createRef()
    const documentImageOneRef = React.createRef()
    
    useEffect(() => {
        axios.get( '/sessions.php' )
        .then(function(res) {
            if(res.data.login) {
                setUserId(res.data.userId)
            }
        })
    }, [])

    useEffect(() => {
        userId &&
        axios.get( `/users.php?id=${userId}`)
        .then(function(res) {
            if(res.data.status) {
                setLoggedUserData(res.data.data[0])
                setFullname({value: res.data.data[0].fullname})
                setEmail({value: res.data.data[0].email})
                setUserStatus(res.data.data[0].status)
            }
        })
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

    // validate email field
    const validateEmail = () => {
        let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if( email.value == '' ) {
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

    // const encodeFileToDataUrl = ( file ) => {
    //     if( !file ) {
    //         return 1;
    //     }
    //     let url, reader = new FileReader();
    //     reader.readAsDataURL(file);
    //     reader.onload = (e) => {
    //         url = e.target.result
    //         console.log(url)
    //     }
    //     return url
    // }
    // console.log(encodeFileToDataUrl(documentImage.value))

    const onSubmit = (e) => {
        e.preventDefault()
    }

    if( userStatus === 'under-verification' ) {
        return (
            <>
                <Header userLoggedIn = { isLoggedIn }/> 
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
            <Header userLoggedIn = { isLoggedIn }/> 
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
                            <input type="text" name="fullname" required onChange={ (e) => setFullname({ value: e.target.value}) } value={ fullname.value }/>
                        </div>
                        <div className="aweb-email">
                            <label>Email Address</label>
                            <input type="text" name="email" required onChange={ (e) => setEmail({ value: e.target.value}) } value={ email.value }/>
                        </div>
                        <div className="aweb-profession">
                            <label>Profession</label>
                            <input type="text" name="profession" required onChange={ (e) => setProfession({ value: e.target.value }) } value={ profession.value }/>
                        </div>
                        <div className="">
                            <div className="aweb-heading">
                                { 'Contact Number' }
                            </div>
                            <div className="aweb-areacode">
                                <PhoneInput
                                    country={'np'}
                                    value={contactNumber.areaCode}
                                    onChange={ phone => setContactNumber({ areaCode: phone, number: contactNumber.number })}
                                />
                            </div>
                            <div    className="aweb-contactNumber">
                                <input type="text" name="contactNumber" required onChange={ (e) => setContactNumber({ areaCode: contactNumber.areaCode, number: e.target.value }) } value={ contactNumber.number }/>
                            </div>
                        </div>
                        <div className="aweb-birthDate">
                            <label>Birth Date</label>
                            <DatePicker required selected={birthDate} onChange={date => this.onInputChange( 'birthDate', date)} />
                        </div>
                        <div className="input-wrapper">
                            <div className="aweb-heading">
                                { 'Current Address' }
                            </div>
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
                    </div>
                </form>
            </div>
        </>
    )
}

export default UserVerification