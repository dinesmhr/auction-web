/**
 * Sign up form
 * 
 */
import React, { useState, useContext } from 'react';
import { Redirect } from 'react-router-dom';
import Header from '../header/Header';
import {appContext} from '../../App'
import Footer from '../footer/Footer'

const axios = require('axios');

const Signup = () => {
    const [ fullname, setFullname ] = useState({ value: ''});
    const [ username, setUsername ] = useState({ value: ''});
    const [ email, setEmail ] = useState({ value: ''});
    const [ password, setPassword ] = useState({ value: ''});
    const [ cpassword, setCpassword ] = useState({ value: ''});
    const [ signUpText, setSignUpText ] = useState('Sign Up');
    const [ isDisabled, setIsDisabled ] = useState(false);
    const [ status, setStatus ] = useState(false);
    const [ message, setMessage ] = useState();

    const { isLoggedIn } = useContext(appContext)

    // handle username field on change
    const handleUsername = (value) => {
        setUsername({value: value})
        setTimeout( function() {
            axios.get( `/users.php?username=${value}` )
            .then( function (response) {
                if( response.data.status ) {
                    username.value = value
                    username.error = true
                    username.errorMessage = "Username not available"
                    setUsername( JSON.parse(JSON.stringify( username )) )
                    setIsDisabled(true)
                } else {
                    setIsDisabled(false)
                }
            })
        }, 2000)
    }

    // handle email field on change
    const handleEmail = (value) => {
        setEmail({value: value})
        setTimeout( function() {
            axios.get( `/users.php?email=${value}` )
            .then( function (response) {
                if( response.data.status ) {
                    email.value = value
                    email.error = true
                    email.errorMessage = "Email already exists"
                    setEmail( JSON.parse(JSON.stringify( email )) )
                    setIsDisabled(true)
                } else {
                    setIsDisabled(false)
                }
            })
        }, 2000)
    }

    // validate fullname field
    const validateFullname = () => {
        if( fullname.value === '' ) {
            fullname.error = true;
            fullname.errorMessage = "Fullname must not be empty";
            setFullname( JSON.parse(JSON.stringify( fullname )) )
        } else {
            return true
        }
        return false
    }

    // validate username field
    const validateUsername = () => {
        if( username.value === '' ) {
            username.error = true;
            username.errorMessage = "Username must not be empty";
            setUsername( JSON.parse(JSON.stringify( username )) )
        } else {
            let condition = true
            return condition
        }
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

    // validate password field
    const validatePassword = () => {
        if( password.value === '' ) {
            password.error = true
            password.errorMessage = "Password must not be empty"
        } else if( password.value.length < 8 ) {
            password.value = ''
            password.error = true
            password.errorMessage = "Password must not be less than 8 character"
        } else if( !isUpper(password.value) || !isStringHasNum(password.value) ) {
            password.error = true
            password.errorMessage = "Password doesnot meet the criteria"
        } else {
            return true
        }
        setPassword( JSON.parse(JSON.stringify( password )) )
        return false
    }

    // validate cpassword field
    const validateCpassword = () => {
        if( cpassword.value === '' ) {
            cpassword.error = true
            cpassword.errorMessage = "This field must not be empty";
        } else if( cpassword.value !== password.value ) {
            cpassword.value = ''
            cpassword.error = true
            cpassword.errorMessage = "Password doesnot match"
        } else {
            return true
        }
        setCpassword( JSON.parse(JSON.stringify( cpassword )) )
        return false
    }


    //const handleFullname = (value)
    const onSubmit = (e) => {
        e.preventDefault();
        if( validateFullname() && validateUsername() && validateEmail() && validatePassword() && validateCpassword() ) {
            setSignUpText('Signing Up')
            axios.post('/edit-table/edit-users.php', {
                submit: 'submit',
                fullname: fullname.value,
                username: username.value,
                email: email.value,
                password: password.value,
            })
            .then(function (response) {
                if( response.data.status ) {
                    setStatus(true)
                    setMessage( 'Signed up successfully' )
                } else {
                    setStatus(true)
                    setMessage( 'Error in sign up' )
                }
                setFullname({value:''})
                setUsername({value:''})
                setEmail({value:''});
                setPassword({value:''});
                setCpassword({value:''});
                setSignUpText('Sign Up')
            })
            .catch(function (error) {
                setStatus(true)
                setMessage( 'Error in sign up' )
            });
        }
    }
    
    // check if string has upper case letter
    const isUpper = ( string ) => {
        return ( /[A-Z]/.test(string) )
    }

    // check if string has upper case letter
    const isStringHasNum = ( string ) => {
        return ( /\d/.test(string) )
    }

    if( isLoggedIn ) {
        return <Redirect to="/myaccount"/>
    }

    return (
        <div id="auction-web">
            <Header/>
                <form className="mt-5 h-screen">
                    <div className="aweb-signup-form-wrapper">
                        <div className="input-wrapper">
                            <div className="form-heading">
                                <h2>Do Not Have Account? Please <span>Sign Up!</span></h2>
                            </div>
                            <div className="aweb-fullname">
                                <label className="block text-gray-700 text-sm font-bold mb-2">Fullname</label>
                                { fullname.error &&
                                    <div className="aweb-red-note">
                                        { fullname.errorMessage }
                                    </div>
                                }
                                <input className="border-gray-300 mb-2 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" name="fullname" onChange = {(e) => setFullname({ value: e.target.value }) } value={ fullname.value }/>
                            </div>
                            <div className="aweb-username">
                                <label className="block text-gray-700 text-sm font-bold mb-2">Username</label>
                                { username.error &&
                                    <div className="aweb-red-note">
                                        { username.errorMessage }
                                    </div>
                                }
                                <input className="border-gray-300 mb-2 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" name="username" onChange = {(e) => handleUsername( e.target.value ) } value={ username.value }/>
                            </div>
                            <div className="aweb-email">
                                <label className="block text-gray-700 text-sm font-bold mb-2">Email Address</label>
                                { email.error &&
                                    <div className="aweb-red-note">
                                        { email.errorMessage }
                                    </div>
                                }
                                <input className="border-gray-300 mb-2 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" name="email" onChange = {(e) => handleEmail( e.target.value) } value={ email.value }/>
                            </div>
                            <div className="aweb-password">
                                <label className="block text-gray-700 text-sm font-bold mb-2">Password ( <i>Contain at least 1 UPPERCASE letter, lowercase letters and 1 numeric character</i> ) </label>
                                { password.error &&
                                    <div className="aweb-red-note">
                                        { password.errorMessage }
                                    </div>
                                }
                                <input className="border-gray-300 mb-2 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="password" name="password" onChange = {(e) => setPassword({ value: e.target.value }) } value={ password.value }/>
                            </div>
                            <div className="aweb-password">
                                <label className="block text-gray-700 text-sm font-bold mb-2">Confirm Password</label>
                                { cpassword.error &&
                                    <div className="aweb-red-note">
                                        { cpassword.errorMessage }
                                    </div>
                                }
                                <input className="border-gray-300 mb-2 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="password" name="cpassword" onChange = {(e) => setCpassword({value: e.target.value}) } value={ cpassword.value }/>
                            </div>
                                <div className="aweb-submit">
                            <input type="submit" name="submit" onClick= { (e) => onSubmit(e) } value={ signUpText } disabled={ isDisabled }/>
                        </div>
                        { status && 
                            <div className="aweb-success-note">
                                { message }
                                <a href="/login" className="ml-2 text-red-600">Login now</a>
                            </div>
                        }
                    </div>
                        </div>
                </form>
            <Footer/>
        </div>
    )
}
export default Signup