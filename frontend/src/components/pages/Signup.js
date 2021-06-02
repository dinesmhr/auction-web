/**
 * Sign up form
 * 
 * 
 */
import React, { useState } from 'react';
import Header from '../header/Header';

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

    // validate fullname field
    const validateFullname = () => {
        if( fullname.value == '' ) {
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
        if( username.value == '' ) {
            username.error = true;
            username.errorMessage = "Username must not be empty";
            setUsername( JSON.parse(JSON.stringify( username )) )
        } else {
            let condition = true
            // axios.get( `/users.php?username=${username.value}` )
            // .then( function (response) {
            //     if( response.data.status ) {
            //         username.value = username.value
            //         username.error = true
            //         username.errorMessage = "Username not available"
            //         setUsername( JSON.parse(JSON.stringify( username )) )
            //         setIsDisabled(true)
            //         condition = false
            //     }
            // })
            return condition
        }
        return false
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
            let condition = true
            // axios.get( `/users.php?email=${username.email}` )
            // .then( function (response) {
            //     if( response.data.status ) {
            //         email.value = email.value
            //         email.error = true
            //         email.errorMessage = "Email already exists"
            //         setEmail( JSON.parse(JSON.stringify( email )) )
            //         console.log(email)
            //         setIsDisabled(true)
            //         condition = false
            //     }
            // })
            return condition
        }
        setEmail( JSON.parse(JSON.stringify( email )) )
        return false
    }

    // validate password field
    const validatePassword = () => {
        if( password.value == '' ) {
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
        if( cpassword.value == '' ) {
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

    return (
        <>
            <Header/>
            <form id="aweb-signup-form">
                <div className="aweb-signup-form-wrapper">
                    <div className="input-wrapper">
                        <div className="form-heading">
                            <h2>Do Not Have Account? Please <span>Sign Up!</span></h2>
                        </div>
                        <div className="aweb-fullname">
                            <label>Fullname</label>
                            { fullname.error &&
                                <div className="aweb-red-note">
                                    { fullname.errorMessage }
                                </div>
                            }
                            <input type="text" name="fullname" onChange = {(e) => setFullname({ value: e.target.value }) } value={ fullname.value }/>
                        </div>
                        <div className="aweb-username">
                            <label>Username</label>
                            { username.error &&
                                <div className="aweb-red-note">
                                    { username.errorMessage }
                                </div>
                            }
                            <input type="text" name="username" onChange = {(e) => setUsername({ value: e.target.value }) } value={ username.value }/>
                        </div>
                        <div className="aweb-email">
                            <label>Email Address</label>
                            { email.error &&
                                <div className="aweb-red-note">
                                    { email.errorMessage }
                                </div>
                            }
                            <input type="text" name="email" onChange = {(e) => setEmail({ value: e.target.value }) } value={ email.value }/>
                        </div>
                        <div className="aweb-password">
                            <label>Password ( <i>Contain at least 1 UPPERCASE letter, lowercase letters and 1 numeric character</i> ) </label>
                            { password.error &&
                                <div className="aweb-red-note">
                                    { password.errorMessage }
                                </div>
                            }
                            <input type="password" name="password" onChange = {(e) => setPassword({ value: e.target.value }) } value={ password.value }/>
                        </div>
                        <div className="aweb-password">
                            <label>Confirm Password</label>
                            { cpassword.error &&
                                <div className="aweb-red-note">
                                    { cpassword.errorMessage }
                                </div>
                            }
                            <input type="password" name="cpassword" onChange = {(e) => setCpassword({value: e.target.value}) } value={ cpassword.value }/>
                        </div>
                    </div>
                    <div className="aweb-submit">
                        <input type="submit" name="submit" onClick= { (e) => onSubmit(e) } value={ signUpText } disabled={ isDisabled }/>
                    </div>
                    { status && 
                        <div className="aweb-success-note">
                            { message }
                        </div>
                    }
                </div>
            </form>
        </>
    )
}
export default Signup