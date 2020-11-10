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
import Select from 'react-select'

export const UserVerification = (props) => {
    const [ fullname, setFullname ] = useState()
    const [ parentName, setParentName ] = useState()
    const [ professionName, setProfessionName ] = useState()
    const [ contactNumber, setContactNumber ] = useState()
    const [ birthDate, setBirthDate] = useState()
    const [ currentAddress, setCurrentAddress ] = useState()
    const [ permanentAddress, setPermanentAddress ] = useState()
    const [ pphoto, setPphoto ] = useState()
    const [ documentType, setDocumentType ] = useState('citizenship')
    const [ documentImageOne, setDocumentImageOne ] = useState()
    const [ documentImageTwo, setDocumentImageTwo ] = useState()
    const { isLoggedin } = props
    let loggedUserName = sessionStorage.auctionWebSessionUserName

    const documentTypeOptions = [
        { value: '', label: ' -- Select --' },
        { value: 'citizenship', label: 'Citizenship' },
        { value: 'passport', label: 'Passport' }
      ]
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
                            <input type="text" name="fullname" required onChange={ (e) => setFullname( e.target.value) } value={ fullname }/>
                        </div>
                        <div className="aweb-parentName">
                            <label>Father/Mother's Name</label>
                            <input type="text" name="parentName" required onChange={ (e) => setParentName( e.target.value) } value={ parentName }/>
                        </div>
                        <div className="aweb-professionName">
                            <label>Profession</label>
                            <input type="text" name="professionName" required onChange={ (e) => setProfessionName( e.target.value) } value={ professionName }/>
                        </div>
                        <div className="aweb-contactNumber">
                            <label>Contact Number</label>
                            <input type="number" name="contactNumber" required onChange={ (e) => setContactNumber( e.target.value) } value={ contactNumber }/>
                        </div>
                        <div className="aweb-birthDate">
                            <label>Birth Date</label>
                            <DatePicker required selected={birthDate} onChange={date => setBirthDate(date)} />
                        </div>
                        <div className="aweb-currentAddress">
                            <label>Current Address</label>
                            <input type="text" name="currentAddress" required onChange={ (e) => setCurrentAddress( e.target.value) } value={ currentAddress }/>
                        </div>
                        <div className="aweb-permanentAddress">
                            <label>Permanent Address</label>
                            <input type="text" name="permanentAddress" required onChange={ (e) => setPermanentAddress( e.target.value) } value={ permanentAddress }/>
                            <button onClick = {(e) => setPermanentAddress( currentAddress ) }>{ 'Copy current address' }</button>
                        </div>
                        <div className="input-wrapper">
                            <div className="aweb-heading">
                                { 'Personal Details' }
                            </div>
                            <div className="aweb-pp-photo">
                                <label>Password Size Photo</label>
                                <input type="text" name="pphoto" required onChange={ (e) => setPphoto( e.target.value) } value={ pphoto }/>
                            </div>
                            <div className="aweb-pp-photo">
                                <label>Password Size Photo</label>
                                <Select options={ documentTypeOptions } defaultValue={documentType} onInputChange={(e) => console.log(e) }/>
                            </div>
                            { ( documentType != '' ) &&
                                <>
                                    <div className="aweb-documentImageOne">
                                        <label>Document Image One</label>
                                        <input type="text" name="documentImageOne" required onChange={ (e) => setDocumentImageOne( e.target.value) } value={ documentImageOne }/>
                                    </div>
                                    <div className="aweb-documentImageTwo">
                                        <label>Document Image Two</label>
                                        <input type="text" name="documentImageTwo" required onChange={ (e) => setDocumentImageTwo( e.target.value) } value={ documentImageTwo }/>
                                    </div>
                                </>
                            }
                        </div>
                        <div className="aweb-submit">
                            <input type="submit" name="submit" onClick= { (e) => onVerify() } value="Verify"/>
                        </div>
                    </div>
                </form>
            </div>
        </>
    )
}

const onVerify = () => {
    console.log( 'Verified' )
}