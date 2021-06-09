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

    const documentImageOneRef = React.createRef()
    const documentImageTwoRef = React.createRef()
    
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

    // handle document image one
    const handleDocumentImageOne = () => {
        documentImageOneRef.current.click()
    }

    // handle document image two
    const handleDocumentImageTwo = () => {
        documentImageTwoRef.current.click()
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

    const encodeFileToDataUrl = ( file ) => {
        if( !file ) {
            return 1;
        }
        let url, reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = (e) => {
            url = e.target.result
        }
        return url
    }
    console.log(encodeFileToDataUrl(documentImage))

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
                            <div class="street-address">
                                <label>Street Address</label>
                                <input type="text" name="cstreetAddress" onChange = { (e) => setCurrentAddress({ streetAddress: e.target.value, city: currentAddress.city, stateProvince: currentAddress.stateProvince, postalCode: currentAddress.postalCode, country: currentAddress.country }) } value={currentAddress.streetAddress}/>
                            </div>
                            <div class="city">
                                <label>City</label>
                                <input type="text" name="city" onChange = { (e) => setCurrentAddress({ streetAddress: currentAddress.streetAddress, city: e.target.value, stateProvince: currentAddress.stateProvince, postalCode: currentAddress.postalCode, country: currentAddress.country }) } value={currentAddress.city}/>
                            </div>
                            <div class="stateProvince">
                                <label>State/Province</label>
                                <input type="text" name="stateProvince" onChange = { (e) => setCurrentAddress({ streetAddress: currentAddress.streetAddress, city: currentAddress.city, stateProvince: e.target.value, postalCode: currentAddress.postalCode, country: currentAddress.country }) } value={currentAddress.stateProvince}/>
                            </div>
                            <div class="postalCode">
                                <label>Postal Code</label>
                                <input type="text" name="postalCode" onChange = { (e) => setCurrentAddress({ streetAddress: currentAddress.streetAddress, city: currentAddress.city, stateProvince: currentAddress.stateProvince, postalCode: e.target.value, country: currentAddress.country }) } value={currentAddress.postalCode}/>
                            </div>
                            <div class="country">
                                <label>Country</label>
                                <input type="text" name="country" onChange = { (e) => setCurrentAddress({ streetAddress: currentAddress.streetAddress, city: currentAddress.city, stateProvince: currentAddress.stateProvince, postalCode: currentAddress.postalCode, country: e.target.value }) } value={currentAddress.country}/>
                            </div>
                        </div>
                        <div className="input-wrapper">
                            <div className="aweb-heading">
                                { 'Permanent Address' }
                            </div>
                            <div class="street-address">
                                <label>Street Address</label>
                                <input type="text" name="cstreetAddress" onChange = { (e) => setPermanentAddress({ streetAddress: e.target.value, city: permanentAddress.city, stateProvince: permanentAddress.stateProvince, postalCode: permanentAddress.postalCode, country: permanentAddress.country }) } value={permanentAddress.streetAddress}/>
                            </div>
                            <div class="city">
                                <label>City</label>
                                <input type="text" name="city" onChange = { (e) => setPermanentAddress({ streetAddress: permanentAddress.streetAddress, city: e.target.value, stateProvince: permanentAddress.stateProvince, postalCode: permanentAddress.postalCode, country: permanentAddress.country }) } value={permanentAddress.city}/>
                            </div>
                            <div class="stateProvince">
                                <label>State/Province</label>
                                <input type="text" name="stateProvince" onChange = { (e) => setPermanentAddress({ streetAddress: permanentAddress.streetAddress, city: permanentAddress.city, stateProvince: e.target.value, postalCode: permanentAddress.postalCode, country: permanentAddress.country }) } value={permanentAddress.stateProvince}/>
                            </div>
                            <div class="postalCode">
                                <label>Postal Code</label>
                                <input type="text" name="postalCode" onChange = { (e) => setPermanentAddress({ streetAddress: permanentAddress.streetAddress, city: permanentAddress.city, stateProvince: permanentAddress.stateProvince, postalCode: e.target.value, country: permanentAddress.country }) } value={permanentAddress.postalCode}/>
                            </div>
                            <div class="country">
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
                            <div className="aweb-documentImageOne">
                                <label>Document Image One</label>
                                <input type="file" name="documentImageTwo" ref={documentImageOneRef} onChange = { (e) => setDocumentImage(e.target.files[0]) } style={{display:"none"}}/>
                                <div className="image-upload" onClick = { () => handleDocumentImageOne() }>Add</div>
                            </div>
                            <div className="aweb-documentImageTwo">
                                <label>Document Image Two</label>
                                <input type="file" name="documentImageTwo" ref={documentImageTwoRef} onChange = { (e) => setDocumentImageOne(e.target.value) } style={{display:"none"}}/>
                                <div className="image-upload" onClick = { () => handleDocumentImageTwo() }>Add</div>
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