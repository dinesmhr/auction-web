import React, { Component, Fragment } from 'react';
import Header from '../header/Header'

const axios = require('axios');

class Login extends Component {
    constructor(props) {
        super( props )
        this.state = { 
            loginDetail : {
                            username: '',
                            password: '',
                            errorField: false,
                            errorMessage: ''
                        },
            signupDetail : {
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
                        }
        }
    }

    setInputValueChange( parentKey, key, val ) {
        this.setState({
            [parentKey]: { [key] : val }
        })
    }

    getCurrentUser() {
        let _this = this
        const { username, password } = _this.state.loginDetail
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
                        loginDetail: { errorField: false }
                    })
                    if( password !== response.data.data[0].password ) {
                        _this.setState({
                            loginDetail: {
                                            errorField: true,
                                            errorMessage: 'Username or password incorrect!'
                                        }
                        })
                    } else {
                        _this.setState({
                            loginDetail: {
                                            errorField: false,
                                            errorMessage: 'User authenticated'
                                        }
                        })
                        sessionStorage.clear()
                        sessionStorage.setItem( 'auctionWebSessionUserLogged', true )
                        sessionStorage.setItem( 'auctionWebSessionUserId', response.data.data[0].id )
                        updateLoggedState()
                    }
                } else {
                    _this.setState({
                        loginDetail: {
                                        errorField: true,
                                        errorMessage: 'Username not exists!'
                                    }
                    })
                }
            }
        })
        .catch(function (error) {
            _this.setState({
                loginDetail : { 
                                errorField: true,
                                errorMessage: error
                            }
            })
        })
        .then(function () {
            console.log( "Request Completed" )
        });
    }

    onSubmit(e) {
        e.preventDefault()
        const { username, password } = this.state.loginDetail
        if( '' === username && '' === password ) {
            this.setState({
                loginDetail: {
                                errorField: true,
                                errorMessage: 'Fields are empty!'
                            }
            })
        } else if ( '' === username ) {
            this.setState({
                loginDetail : {
                                errorField: true,
                                errorMessage: 'username field is empty!'
                            }
            })
        } else if ( '' === password ) {
            this.setState({
                loginDetail : {
                                errorField: true,
                                errorMessage: 'password field is empty!'
                            }
            })
        } else {
            this.setState({
                loginDetail : {
                                errorField: false,
                                errorMessage: ''
                            }
            })
            this.getCurrentUser()
        }
    }

    onSignup(e) {
        e.preventDefault();
        const { su_fullname, su_username, su_email, su_password } = this.state.signupDetail
        if( '' === su_fullname && '' === su_username && '' === su_email && '' === su_password ) {
            this.setState({
                signupDetail: {
                                su_fullname_errorField: true,
                                su_fullname_errorMessage: 'Field is required!',
                                su_username_errorField: true,
                                su_username_errorMessage: 'Field is required!',
                                su_email_errorField: true,
                                su_email_errorMessage: 'Field is required!',
                                su_password_errorField: true,
                                su_password_errorMessage: 'Field is required!'
                            }
            })
        } else if ( '' === su_username && '' === su_email && '' === su_password ) {
            this.setState({
                signupDetail: {
                                su_username_errorField: true,
                                su_username_errorMessage: 'Field is required!',
                                su_email_errorField: true,
                                su_email_errorMessage: 'Field is required!',
                                su_password_errorField: true,
                                su_password_errorMessage: 'Field is required!'
                            }
            })
        } else if ( '' === su_fullname ) {
            this.setState({
                signupDetail : {
                                    su_fullname_errorField: true,
                                    su_fullname_errorMessage: 'Field is required!'
                                }
            })
        } else if ( '' === su_username ) {
            this.setState({
                signupDetail : {
                                    su_username_errorField: true,
                                    su_username_errorMessage: 'Field is required!'
                                }
            })
        } else if ( '' === su_email ) {
            this.setState({
                signupDetail : {
                                su_email_errorField: true,
                                su_email_errorMessage: 'Field is required!'
                            }
            })
        } else if ( '' === su_password ) {
            this.setState({
                signupDetail : {
                                su_password_errorField: true,
                                su_password_errorMessage: 'Field is required!'
                            }
            })
        } else {
            this.setState({
                signupDetail : {
                                su_fullname_errorField: false,
                                su_fullname_errorMessage: '',
                                su_username_errorField: false,
                                su_username_errorMessage: '',
                                su_email_errorField: false,
                                su_email_errorMessage: '',
                                su_password_errorField: false,
                                su_password_errorMessage: ''
                            }
            })
        }
    }

    userLoggedOutAction() {
        const { updateLoggedState } = this.props
        sessionStorage.clear()
        sessionStorage.setItem( 'auctionWebSessionUserLogged', false )
        updateLoggedState()
    }

    render() { 
        const { username, password, errorField, errorMessage } = this.state.loginDetail
        const { su_fullname, su_username, su_email, su_password } = this.state.signupDetail
        const { su_fullname_errorField, su_fullname_errorMessage, su_username_errorField, su_username_errorMessage, su_email_errorField,  su_email_errorMessage, su_password_errorField, su_password_errorMessage } = this.state.signupDetail
        const { isLoggedIn } = this.props
        if( isLoggedIn === true ) {
            return ( 
                <Fragment>
                    <Header userLoggedIn = { isLoggedIn }/>
                    <div id="auction-web-login" className="page--login main-wrapper">
                        <div className="aweb-logout-note">Logged out of auction web?</div>
                        <button onClick={ this.userLoggedOutAction.bind(this) }>
                            Logout now
                        </button>
                    </div>
                </Fragment>
            )
        }
        return (
            <Fragment>
                <Header userLoggedIn = { isLoggedIn }/>
                <div id="auction-web-login" className="page--login main-wrapper aweb-clearfix">
                    <form id="aweb-login-form">
                        <div className="aweb-login-form-wrapper">
                            { errorField &&
                                <div className="aweb-red-note">
                                    { errorMessage }
                                </div>
                            }
                            <div className="input-wrapper">
                                <div className="aweb-username">
                                    <label>Username</label>
                                    <input type="text" name="username" required onChange={ (e) => this.setInputValueChange( 'loginDetail', 'username', e.target.value) } defaultValue={ username }/>
                                </div>
                                <div className="aweb-password">
                                    <label>Password</label>
                                    <input type="password" name="password" required onChange={ (e) => this.setInputValueChange( 'loginDetail', 'password', e.target.value) } defaultValue={ password }/>
                                </div>
                            </div>
                            <div className="aweb-submit">
                                <input type="submit" name="submit" onClick= { (e) => this.onSubmit(e) } value="Submit"/>
                            </div>
                        </div>
                    </form>
                    <form id="aweb-signup-form">
                        <div className="aweb-signup-form-wrapper">
                            <div className="input-wrapper">
                                <div className="form-heading">
                                    <h2>Do Not Have Account? Please Sign Up!</h2>
                                </div>
                                <div className="aweb-fullname">
                                    <label>Fullname</label>
                                    { su_fullname_errorField &&
                                        <div className="aweb-red-note">
                                            { su_fullname_errorMessage }
                                        </div>
                                    }
                                    <input type="text" name="fullname" required onChange={ (e) => this.setInputValueChange( 'signupDetail', 'su_fullname', e.target.value) } defaultValue={ su_fullname }/>
                                </div>
                                <div className="aweb-username">
                                    <label>Username</label>
                                    { su_username_errorField &&
                                        <div className="aweb-red-note">
                                            { su_username_errorMessage }
                                        </div>
                                    }
                                    <input type="text" name="username" required onChange={ (e) => this.setInputValueChange( 'signupDetail', 'su_username', e.target.value) } defaultValue={ su_username }/>
                                </div>
                                <div className="aweb-email">
                                    <label>Email Address</label>
                                    { su_email_errorField &&
                                        <div className="aweb-red-note">
                                            { su_email_errorMessage }
                                            { su_email_errorField }
                                        </div>
                                    }
                                    <input type="text" name="email" required onChange={ (e) => this.setInputValueChange( 'signupDetail', 'su_email', e.target.value) } defaultValue={ su_email }/>
                                </div>
                                <div className="aweb-password">
                                    <label>Password</label>
                                    { su_password_errorField &&
                                        <div className="aweb-red-note">
                                            { su_password_errorMessage }
                                        </div>
                                    }
                                    <input type="password" name="password" required onChange={ (e) => this.setInputValueChange( 'signupDetail', 'su_password', e.target.value) } defaultValue={ su_password }/>
                                </div>
                            </div>
                            <div className="aweb-submit">
                                <input type="submit" name="submit" onClick= { (e) => this.onSignup(e) } value="Sign Up"/>
                            </div>
                        </div>
                    </form>
                </div>
            </Fragment>
        );
    }
}

export default Login;