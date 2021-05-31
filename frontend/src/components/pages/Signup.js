/**
 * Sign up form
 * 
 * 
 */
import React, { useState, setState } from 'react';

const initialState = {
    fullname: { value: ''},
    username: { value: ''},
    email: { value: ''},
    password: { value: ''},
    cpassword: { value: ''}
  };

const Signup = () => {
    const [ fullname, setFullname ] = useState({ value: ''});
    const [ username, setUsername ] = useState({ value: ''});
    const [ email, setEmail ] = useState({ value: ''});
    const [ password, setPassword ] = useState({ value: ''});
    const [ cpassword, setCpassword ] = useState({ value: ''});
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
            return true
        }
        return false
    }

    // validate email field
    const validateEmail = () => {
        if( email.value == '' ) {
            email.error = true;
            email.errorMessage = "Email must not be empty";
            setEmail( JSON.parse(JSON.stringify( email )) )
        } else {
            return true
        }
        return false
    }

    // validate password field
    const validatePassword = () => {
        if( password.value == '' ) {
            password.error = true;
            password.errorMessage = "Password must not be empty";
            setPassword( JSON.parse(JSON.stringify( password )) )
        } else {
            return true
        }
        return false
    }

    // validate cpassword field
    const validateCpassword = () => {
        if( cpassword.value == '' ) {
            cpassword.error = true;
            cpassword.errorMessage = "This field must not be empty";
            setCpassword( JSON.parse(JSON.stringify( cpassword )) )
        } else if( cpassword.value !== password.value ) {
            cpassword.error = true;
            cpassword.errorMessage = "Password doesnot match";
            setCpassword( JSON.parse(JSON.stringify( cpassword )) )
        } else {
            return true
        }
        return false
    }


    //const handleFullname = (value)
    const onSubmit = (e) => {
        e.preventDefault();
        if( validateFullname() && validateUsername() && validateEmail() && validatePassword() && validateCpassword() ) {
            setStatus(true)
            setMessage( 'Signed up successfully' )
        }
    }

    return (
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
                        <label>Password</label>
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
                    <input type="submit" name="submit" onClick= { (e) => onSubmit(e) } value="Sign Up"/>
                </div>
                { status && 
                    <div className="aweb-success-note">
                        { message }
                    </div>
                }
            </div>
        </form>
    )
}
export default Signup