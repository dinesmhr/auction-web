import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import Header from '../header/Header';

const axios = require('axios');

const Login = (props) => {
    const [ username, setUsername ] = useState({value: ''})
    const [ password, setPassword ] = useState({value: ''})
    const [ error, setError ] = useState(false)
    const [ errorMessage, setErrorMessage ] = useState()
    const [ isDisabled ] = useState(false);

    const { isLoggedIn, updateLoggedInStatus } = props
    
    const onSubmit = (e) => {
        e.preventDefault()
        axios.get( `/users.php?username=${username.value}` )
        .then( function (response) {
            if( !response.data.status ) { //if no response with given username
                setError(true)
                setErrorMessage("Username not exists")
            } else {
                if( response.data.data[0].password !== password.value ) { //if Username matched
                    setError(true)
                    setErrorMessage("Password incorrect")
                } else { // if both password username matched
                    axios.post( `/edit-table/edit-session.php`, {
                        login: 'true',
                        userId: response.data.data[0].id
                    })
                    .then(function(res) {
                        updateLoggedInStatus()
                    })
                }
            }
        })
    }

    if( isLoggedIn ) {
        return <Redirect to="/myaccount"/>
    }
    
    return (
        <>
            <Header isLoggedIn = { isLoggedIn }/>
            <div id="auction-web-login" className="page--login main-wrapper aweb-clearfix">
                <form id="aweb-login-form">
                    <div className="aweb-login-form-wrapper">
                        <div className="input-wrapper">
                            <div className="aweb-login-note">Login</div>
                            { error &&
                                <div className="aweb-red-note">
                                    { errorMessage }
                                </div>
                            }
                            <div className="aweb-username">
                                <label>Username</label>
                                <input type="text" name="username" onChange={ (e) => setUsername({ value: e.target.value }) } value={ username.value }/>
                            </div>
                            <div className="aweb-password">
                                <label>Password</label>
                                <input type="password" name="password" onChange={ (e) => setPassword({ value: e.target.value }) } value={ password.value }/>
                            </div>
                        </div>
                        <div className="aweb-submit">
                            <input type="submit" name="submit" onClick= { (e) => onSubmit(e) } value={ 'Log In' } disabled={ isDisabled }/>
                        </div>
                    </div>
                </form>
            </div>
        </>
    )
}

export default Login;
/*
class Login extends Component {
    constructor(props) {
        super( props )
        this.state = { 
            username: '',
            password: '',
            errorField: false,
            errorMessage: ''
        }
    }

    setInputValueChange( key, val ) {
        this.setState({
            [key] : val
        })
    }

    checkUsernameAlreadyExists( val ) {
        const { users } = this.props
        let status = false
        users.map( ( user, index ) => {
            if( user.username === val ) {
                this.setState({
                    su_username_errorField: true,
                    su_username_errorMessage: 'Username unavailable'
                })
                status = true
            }
        })
        return status
    }

    getCurrentUser() {
        let _this = this
        const { username, password } = _this.state
        const { updateLoggedState } = this.props
        const url = 'http://localhost/auction-web/api/users.php'
        axios.get( url, {
            params: {
                username: username
            }
        })
        .then(function (response) {
            if( response.status === 200 ) {
                if( response.data.status === true ) {
                    _this.setState({ 
                        errorField: false 
                    })
                    if( password !== response.data.data[0].user_pass ) {
                        _this.setState({
                            errorField: true,
                            errorMessage: 'Username or password incorrect!'
                        })
                    } else {
                        _this.setState({
                            errorField: false,
                            errorMessage: 'User authenticated'
                        })
                        localStorage.clear()
                        localStorage.setItem( 'auctionWebSessionUserLogged', true )
                        localStorage.setItem( 'auctionWebSessionUserId', response.data.data[0].ID )
                        localStorage.setItem( 'auctionWebSessionUserName', response.data.data[0].first_name )
                        localStorage.setItem( 'auctionWebSessionUserStatus', response.data.data[0].verified )
                        updateLoggedState()
                    }
                } else {
                    _this.setState({
                        errorField: true,
                        errorMessage: 'Username not exists!'
                    })
                }
            }
        })
        .catch(function (error) {
            _this.setState({
                errorField: true,
                errorMessage: error
            })
        })
        .then(function () {
            console.log( "Request Completed" )
        });
    }

    registerUser() {
        let _this = this
        const { su_fullname, su_username, su_email, su_password } = this.state
        const url = 'http://localhost/auction-web/api/edit-table/edit-users.php'
        axios.get( url, {
            params: {
                fullname: su_fullname,
                username: su_username,
                email: su_email,
                password: su_password,
                submit: true
            }
        })
        .then(function(response) {
            if( response.data.status ) {
                _this.setState({
                    su_status: true,
                    su_message: 'User signed up succesfully!!',
                    su_fullname: '',
                    su_fullname_errorField: false,
                    su_fullname_errorMessage: '',
                    su_username: '',
                    su_username_errorField: false,
                    su_username_errorMessage: '',
                    su_email: '',
                    su_email_errorField: false,
                    su_email_errorMessage: '',
                    su_password: '',
                    su_password_errorField: false,
                    su_password_errorMessage: '',
                    su_confirm_password: '',
                    su_confirm_password_errorField: false,
                    su_confirm_password_errorMessage: ''
                })
            }
        })
    }

    onSubmit(e) {
        e.preventDefault()
        const { username, password } = this.state
        if( '' === username && '' === password ) {
            this.setState({
                errorField: true,
                errorMessage: 'Fields are empty!'
            })
        } else if ( '' === username ) {
            this.setState({
                errorField: true,
                errorMessage: 'username field is empty!'
            })
        } else if ( '' === password ) {
            this.setState({
                errorField: true,
                errorMessage: 'password field is empty!'
            })
        } else {
            this.setState({
                errorField: false,
                errorMessage: ''
            })
            this.getCurrentUser()
        }
    }

    onSignup(e) {
        e.preventDefault();
        const { su_fullname, su_username, su_email, su_password, su_confirm_password } = this.state
        if( '' === su_fullname ) {
            this.setState({
                su_fullname_errorField: true,
                su_fullname_errorMessage: 'Field is required!',
                su_username_errorField: false,
                su_username_errorMessage: '',
                su_email_errorField: false,
                su_email_errorMessage: '',
                su_password_errorField: false,
                su_password_errorMessage: '',
                su_confirm_password_errorField: false,
                su_confirm_password_errorMessage: ''
            })
        } else if( '' === su_username ) {
            this.setState({
                su_fullname_errorField: false,
                su_fullname_errorMessage: '',
                su_username_errorField: true,
                su_username_errorMessage: 'Field is required!',
                su_email_errorField: false,
                su_email_errorMessage: '',
                su_password_errorField: false,
                su_password_errorMessage: '',
                su_confirm_password_errorField: false,
                su_confirm_password_errorMessage: ''
            })
        } else if( '' === su_email ) {
            this.setState({
                su_fullname_errorField: false,
                su_fullname_errorMessage: '',
                su_username_errorField: false,
                su_username_errorMessage: '',
                su_email_errorField: true,
                su_email_errorMessage: 'Field is required!',
                su_password_errorField: false,
                su_password_errorMessage: '',
                su_confirm_password_errorField: false,
                su_confirm_password_errorMessage: ''
            })
        } else if( '' === su_password ) {
            this.setState({
                su_fullname_errorField: false,
                su_fullname_errorMessage: '',
                su_username_errorField: false,
                su_username_errorMessage: '',
                su_email_errorField: false,
                su_email_errorMessage: '',
                su_password_errorField: true,
                su_password_errorMessage: 'Field is required!',
                su_confirm_password_errorField: false,
                su_confirm_password_errorMessage: ''
            })
        } else if( '' === su_confirm_password ) {
            this.setState({
                su_fullname_errorField: false,
                su_fullname_errorMessage: '',
                su_username_errorField: false,
                su_username_errorMessage: '',
                su_email_errorField: false,
                su_email_errorMessage: '',
                su_password_errorField: false,
                su_password_errorMessage: '',
                su_confirm_password_errorField: true,
                su_confirm_password_errorMessage: 'Field is required!'
            })
        } else if( su_password !== su_confirm_password ) {
            this.setState({
                su_fullname_errorField: false,
                su_fullname_errorMessage: '',
                su_username_errorField: false,
                su_username_errorMessage: '',
                su_email_errorField: false,
                su_email_errorMessage: '',
                su_password_errorField: false,
                su_password_errorMessage: '',
                su_confirm_password_errorField: true,
                su_confirm_password_errorMessage: 'Password must me same'
            })
        } else {
            this.setState({
                su_fullname_errorField: false,
                su_fullname_errorMessage: '',
                su_username_errorField: false,
                su_username_errorMessage: '',
                su_email_errorField: false,
                su_email_errorMessage: '',
                su_password_errorField: false,
                su_password_errorMessage: '',
                su_confirm_password_errorField: false,
                su_confirm_password_errorMessage: ''
            })
            if( this.checkUsernameAlreadyExists( su_username ) ) {
                this.setState({
                    su_status: true,
                    su_message: 'Some field are invalid!!'
                })
            } else {
                this.registerUser();
            }
        }
    }

    userLoggedOutAction() {
        const { updateLoggedState } = this.props
        localStorage.clear()
        localStorage.setItem( 'auctionWebSessionUserLogged', false )
        updateLoggedState()
    }

    getUsersInfo( userId ) {
        const { users } = this.props
        const currentUser = users.map( ( user ) => {
            if( userId === user.id  ) {
                return user
            }
        })
        return currentUser['0']
    }
        return (
            <Fragment>
                <Header userLoggedIn = { isLoggedIn }/>
                <div className="aweb-login-signup-wrapper">
                 
               </div>
            </Fragment>
        );
    }
}*/