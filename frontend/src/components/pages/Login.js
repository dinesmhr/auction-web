import React, { Component } from 'react';

class Login extends Component {
    constructor(props) {
        super( props )
        this.state = { 
            username: '',
            password: '',
            emptyField: false,
            emptyMessage: ''
        }
    }
    
    setInputValueChange( key, val ) {
        this.setState({
            [key] : val
        })
    }

    onSubmit(e) {
        e.preventDefault()
        const { username, password } = this.state
        const { users } = this.props
        if( '' === username && '' === password ) {
            this.setState({
                emptyField: true,
                emptyMessage: 'Fields are empty!'
            })
        } else if ( '' === username ) {
            this.setState({
                emptyField: true,
                emptyMessage: 'username field is empty!'
            })
        } else if ( '' === password ) {
            this.setState({
                emptyField: true,
                emptyMessage: 'password field is empty!'
            })
        } else {
            this.setState({
                emptyField: false,
                emptyMessage: ''
            })
        }
    }

    render() { 
        const { username, password, emptyField, emptyMessage } = this.state
        return ( 
            <div id="auction-web-login" className="page--login main-wrapper">
                <form id="aweb-login-form">
                    { emptyField &&
                        <div className="aweb-red-note">
                            { emptyMessage }
                        </div>
                    }
                    <div className="aweb-username">
                        <label>Username</label>
                        <input type="text" name="username" required onChange={ (e) => this.setInputValueChange( 'username', e.target.value) } defaultValue={ username }/>  
                    </div>
                    <div className="aweb-password">
                        <label>Password</label>
                        <input type="password" name="password" required onChange={ (e) => this.setInputValueChange( 'password', e.target.value) } defaultValue={ password }/>
                    </div>
                    <div className="aweb-submit">
                        <input type="submit" name="submit" onClick= { (e) => this.onSubmit(e) } value="Submit"/>
                    </div>
                </form>
            </div>
        );
    }
}

export default Login;