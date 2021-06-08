/**
 * User verification constant function
 * 
 * @since 1.0.0
 * 
 */
import React, { useState } from 'react';
import Header from '../header/Header';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import ImageUploader from 'react-images-upload';

const axios = require('axios');

const UserVerification = () => {
    const [ isLoggedIn, setIsLoggedIn ] = useState(false)
    const [ loggedUserName, setLoggedUserName ] = useState('')
    const [ userStatus, setUserStatus ] = useState('')
    const [ submitText, setSubmitText ] = useState('Submit For Verification')
    const [ fullname, setFullname ] = useState()
    const [ email, setEmail ] = useState()
    const [ profession, setProfession ] = useState()
    const [ birthDate, setBirthDate ] = useState()
    const [ currentAddress, setCurrentAddress ] = useState({ streetAddress: '', city: '', stateProvince: '', postalCode: '', country: '' })
    const [ permanentAddress, setPermanentAddress ] = useState({ streetAddress: '', city: '', stateProvince: '', postalCode: '', country: '' })
    const [ contactNumber, setContactNumber ] = useState({ areaCode: '', number: '' })
    const [ documentType, setDocumentType ] = useState()
    const [ documentId, setDocumentId ] = useState()
    const [ documentImage, setDocumentImage ] = useState()
    
    const getUserStatus = () => {
        let _this = this
        const { userId } = this.state
        const url = 'http://localhost/auction-web/api/users.php'
        axios.get( url, {
            params: {
                id: userId
            }
        })
        .then(function(response) {
            if( response.status === 200 ) {
                _this.setState({ 
                    userStatus : response.data.data[0].status
                })
            }
        })
    }

    const onInputChange = ( key, value ) => {
        this.setState({
          [key] : value
        })
    }

    // encodeFileToDataUrl( key, file ) {
    //     let reader = new FileReader();
    //     reader.readAsDataURL(file[0]);
    //     reader.onload = (e) => {
    //         localStorage.setItem( key, e.target.result )
    //     }
    //     return( localStorage[key] )
    // }

    const onSubmit = (e) => {
        e.preventDefault()
    }

    if( userStatus === 'under-verification' ) {
        return (
            <>
                <Header userLoggedIn = { isLoggedIn }/> 
                <div id="auction-web-user-verification">
                    <div className="aweb-heading">
                        { `You are logged in as ${loggedUserName}. Your account is currently under verification process. Thank you for your patience!!` }
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
                        { `You are logged in as ${loggedUserName}. Please verify your account here.` }
                    </div>
                    <div className="input-wrapper">
                        <div className="aweb-heading-personal-details">
                            { 'Personal Details' }
                        </div>
                        <div className="aweb-fullname">
                            <label>Fullname</label>
                            <input type="text" name="fullname" required onChange={ (e) => this.onInputChange( 'fullname', e.target.value) } value={ fullname }/>
                        </div>
                        <div className="aweb-profession">
                            <label>Profession</label>
                            <input type="text" name="profession" required onChange={ (e) => this.onInputChange( 'profession', e.target.value) } value={ profession }/>
                        </div>
                        <div className="aweb-contactNumber">
                            <label>Contact Number</label>
                            <input type="number" name="contactNumber" required onChange={ (e) => this.onInputChange( 'contactNumber', e.target.value) } value={ contactNumber }/>
                        </div>
                        <div className="aweb-birthDate">
                            <label>Birth Date</label>
                            <DatePicker required selected={birthDate} onChange={date => this.onInputChange( 'birthDate', date)} />
                        </div>
                        <div className="aweb-currentAddress">
                            <label>Current Address</label>
                            <input type="text" name="currentAddress" required onChange={ (e) => this.onInputChange( 'currentAddress', e.target.value) } value={ currentAddress }/>
                        </div>
                        <div className="aweb-permanentAddress">
                            <label>Permanent Address</label>
                            <input type="text" name="permanentAddress" required onChange={ (e) => this.onInputChange( 'permanentAddress', e.target.value) } value={ permanentAddress }/>
                        </div>
                        <div className="input-wrapper">
                            <div className="aweb-heading">
                                { 'Document Details' }
                            </div>
                            <div className="aweb-pp-photo">
                                <label>Password Size Photo</label>
                                <ImageUploader
                                    withIcon={false}
                                    buttonText={ 'Choose document image one' }
                                    onChange={ (value) => this.onInputChange( 'pphoto', value )}
                                    imgExtension={['.jpg', '.png']}
                                    maxFileSize={5242880}
                                    singleImage={true}
                                    withPreview = {true}
                                />
                            </div>
                            <div className="aweb-pp-photo">
                                <label>Document Type</label>
                                <select onChange={(e) => this.onInputChange( 'documentType', e.target.value ) }>
                                    <option value='citizenship'>{ 'Citizenship' }</option>
                                    <option value='passport'>{ 'Passport' }</option>
                                </select>
                            </div>
                            <div className="aweb-documentImageOne">
                                <label>Document Image One</label>
                                <ImageUploader
                                    withIcon={false}
                                    buttonText={ 'Choose document image one' }
                                    onChange={ (value) => this.onInputChange( 'documentImageOne', value )}
                                    imgExtension={['.jpg', '.png']}
                                    maxFileSize={5242880}
                                    singleImage={true}
                                    withPreview = {true}
                                />
                            </div>
                            <div className="aweb-documentImageTwo">
                                <label>Document Image Two</label>
                                <ImageUploader
                                    withIcon={false}
                                    buttonText={ 'Choose document image two' }
                                    onChange={ (value) => this.onInputChange( 'documentImageTwo', value )}
                                    imgExtension={['.jpg', '.png']}
                                    maxFileSize={5242880}
                                    singleImage={true}
                                    withPreview = {true}
                                />
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