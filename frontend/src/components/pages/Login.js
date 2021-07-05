import React, { useState, useContext } from 'react';
import { Redirect } from 'react-router-dom';
import Header from '../header/Header';
import Footer from '../footer/Footer';
import {appContext} from '../../App'

const axios = require('axios');

const Login = () => {
    const [ username, setUsername ] = useState({value: ''})
    const [ password, setPassword ] = useState({value: ''})
    const [ error, setError ] = useState(false)
    const [ errorMessage, setErrorMessage ] = useState()
    const [ isDisabled ] = useState(false);

    const { isLoggedIn, updateLoggedInStatus } = useContext(appContext)
    
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
        <div id="auction-web">
            <Header/>
                <div className="flex justify-center mt-16 h-screen">
                    <div className="w-full max-w-xs">
                        <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                            <div className="aweb-login-note">Login</div>
                            { error &&
                                <p className="text-red-500 text-xs italic">{ errorMessage }</p>
                            }
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2">
                                    Username
                                </label>
                                <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" name="username" onChange={ (e) => setUsername({ value: e.target.value }) } value={ username.value }/>
                            </div>
                            <div className="mb-6">
                                <label className="block text-gray-700 text-sm font-bold mb-2">
                                    Password
                                </label>
                                <input className="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" type="password" name="password" onChange={ (e) => setPassword({ value: e.target.value }) } value={ password.value } placeholder="******************"/>
                            </div>

                            <div className="flex items-center justify-between">
                                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit" name="submit" onClick= { (e) => onSubmit(e) } disabled={ isDisabled }>
                                    Log In
                                </button>
                                <a className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800" href="#">
                                    Forgot Password?
                                </a>
                            </div>
                        </form>
                    </div>
                </div>
            <Footer/>
        </div>
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