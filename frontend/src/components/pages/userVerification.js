/**
 * User verification constant function
 * 
 * @since 1.0.0
 * 
 */
import React, { Component } from 'react';
import Header from '../header/Header';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import ImageUploader from 'react-images-upload';

const axios = require('axios');

class UserVerification extends Component {
    constructor(props) {
        super(props)
        this.state = {
            userId: localStorage.auctionWebSessionUserId,
            userStatus: '',
            fullname : '',
            parentName : '',
            professionName : '',
            contactNumber : '',
            birthDate : '',
            currentAddress : '',
            permanentAddress : '',
            pphoto : [],
            documentType : 'citizenship',
            documentImageOne : [],
            documentImageTwo : [],
            errorStatus: false,
            errorMessage: '',
            verifyButtonText: 'Verify'
        }
    }
    
    getUserStatus() {
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

    onInputChange( key, value ) {
        this.setState({
          [key] : value
        })
    }

    encodeFileToDataUrl( key, file ) {
        let reader = new FileReader();
        reader.readAsDataURL(file[0]);
        reader.onload = (e) => {
            localStorage.setItem( key, e.target.result )
        }
        return( localStorage[key] )
    }

    onVerify(e) {
        e.preventDefault()
        let _this = this
        const { userId, fullname, parentName, professionName, contactNumber, birthDate, currentAddress, permanentAddress, pphoto, documentType, documentImageOne, documentImageTwo } = this.state
        const url = 'http://localhost/auction-web/api/edit-table/edit-users-details.php'
        axios.post( url, {
            params: {
                id : userId,
                fullname : fullname,
                parent_name : parentName,
                profession : professionName,
                contact_number : contactNumber,
                birth_date : birthDate,
                current_address : currentAddress,
                permanent_address : permanentAddress,
                pphoto : this.encodeFileToDataUrl( 'pphoto', pphoto ),
                document_type : documentType,
                document_image_one : this.encodeFileToDataUrl( 'documentImageOne', documentImageOne ),
                document_image_two : this.encodeFileToDataUrl( 'documentImageTwo', documentImageTwo ),
                submit: true
            }
        })
        .then(function(response) {
            if( response.data.status ) {
                this.setState({
                    errorStatus : false,
                    errorMessage : response.data.message,
                    verifyButtonText: 'Your document is submitted to administration'
                })
                _this.getUserStatus()
            }
        })
    }

    componentDidMount() {
        this.getUserStatus()
    }

    render() {
        const { isLoggedin } = this.props
        const { userStatus, fullname, parentName, professionName, contactNumber, birthDate, currentAddress, permanentAddress, errorMessage } = this.state
        let loggedUserName = localStorage.auctionWebSessionUserName
        
        if( !isLoggedin ) {
            return (
                <>
                    <Header userLoggedIn = { isLoggedin }/> 
                    <div id="auction-web-user-verification">
                        <div className="aweb-heading">
                            { `You dont have registered your account to Auction Web. ` }
                            <a href="/login">{ "Sign Up Now?" }</a>
                        </div>
                    </div>
                </>
            )
        }

        if( userStatus === 'under-verification' ) {
            return (
                <>
                    <Header userLoggedIn = { isLoggedin }/> 
                    <div id="auction-web-user-verification">
                        <div className="aweb-heading">
                            { `You are logged in as ${loggedUserName}. Your account is currently under verification process. Thank you for your patience!!` }
                        </div>
                    </div>
                </>
            )
        }

        if( errorMessage ) {
            return(
                <>
                    <Header userLoggedIn = { isLoggedin }/> 
                    <div id="auction-web-user-verification">
                        <div className="aweb-note">
                            { errorMessage }
                        </div>
                    </div>
                </>
            )
        }
        return(
            <>
                <Header userLoggedIn = { isLoggedin }/> 
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
                            <div className="aweb-parentName">
                                <label>Father/Mother's Name</label>
                                <input type="text" name="parentName" required onChange={ (e) => this.onInputChange( 'parentName', e.target.value) } value={ parentName }/>
                            </div>
                            <div className="aweb-professionName">
                                <label>Profession</label>
                                <input type="text" name="professionName" required onChange={ (e) => this.onInputChange( 'professionName', e.target.value) } value={ professionName }/>
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
                                <input type="submit" name="submit" onClick= { (e) => this.onVerify(e) } value={ this.state.verifyButtonText }/>
                            </div>
                        </div>
                    </form>
                </div>
            </>
        )
    }
}

export default UserVerification