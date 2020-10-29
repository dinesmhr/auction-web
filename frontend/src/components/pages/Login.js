import React, { Component, Fragment } from 'react';
import Header from '../header/Header'

const axios = require('axios');

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

    getCurrentUser() {
        let _this = this
        const { username, password } = _this.state
        const { updateLoggedState } = _this.props
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
                    if( password !== response.data.data[0].password ) {
                        _this.setState({
                            errorField: true,
                            errorMessage: 'Username or password incorrect!'
                        })
                    } else {
                        _this.setState({
                            errorField: false,
                            errorMessage: 'User authenticated'
                        })
                        sessionStorage.clear()
                        sessionStorage.setItem( 'auctionWebSessionUserLogged', true )
                        sessionStorage.setItem( 'auctionWebSessionUserId', response.data.data[0].id )
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

    userLoggedOutAction() {
        let _this = this
        const { updateLoggedState } = _this.props
        sessionStorage.clear()
        sessionStorage.setItem( 'auctionWebSessionUserLogged', false )
        updateLoggedState()
    }

    render() { 
        const { username, password, errorField, errorMessage } = this.state
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
                                <input type="text" name="username" required onChange={ (e) => this.setInputValueChange( 'username', e.target.value) } defaultValue={ username }/>
                            </div>
                            <div className="aweb-password">
                                <label>Password</label>
                                <input type="password" name="password" required onChange={ (e) => this.setInputValueChange( 'password', e.target.value) } defaultValue={ password }/>
                            </div>
                        </div>
                        <div className="aweb-submit">
                            <input type="submit" name="submit" onClick= { (e) => this.onSubmit(e) } value="Submit"/>
                        </div>
                        </div>
                    </form>
                </div>
            </Fragment>
        );
    }
}

export default Login;