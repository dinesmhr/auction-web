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

class UserVerification extends Component {
    constructor(props) {
        super(props)
        this.state = {
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
        }
    }
    
    onInputChange( key, value ) {
        this.setState({
          [key] : value
        })
    }

    onVerify(e) {
        e.preventDefault()
        console.log( this.state )
    }

    render() {
        const { isLoggedin } = this.props
        const { fullname, parentName, professionName, contactNumber, birthDate, currentAddress, permanentAddress } = this.state
        let loggedUserName = sessionStorage.auctionWebSessionUserName
        return(
            <>
                <Header userLoggedIn = { isLoggedin }/> 
                <div id="auction-web-user-verification">
                    <form id="aweb-user-verification-form">
                        <div className="aweb-heading">
                            { `You are logged in as ${loggedUserName}. Please verify your account here.` }
                        </div>
                        <div className="input-wrapper">
                            <div className="aweb-heading">
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
                                <input type="submit" name="submit" onClick= { (e) => this.onVerify(e) } value="Verify"/>
                            </div>
                        </div>
                    </form>
                </div>
            </>
        )
    }
}

export default UserVerification