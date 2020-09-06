import React, { Component } from 'react';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            username: '',
            password: '',
            isLoaded: false,
            error: false,
            users: []
        }
    }
    
    setInputValueChange( key, val ) {
        this.setState({
            [key] : val
        })
    }

    onSubmit(e) {
        e.preventDefault()
    }

    async componentDidMount() {
        const url = 'http://localhost/auction-web/backend/users.php';
        const response = await fetch ( url );
        const data = await response.json();
        console.log( data );
      }

    render() { 
        const { username, password } = this.state
        return ( 
            <div id="auction-web-login" className="page--login main-wrapper">
                <form id="aweb-login-form">
                    <div className="aweb-username">
                        <label>Username</label>
                        <input type="text" name="username" onChange={ (e) => this.setInputValueChange( 'username', e.target.value) } defaultValue={ username }/>  
                    </div>
                    <div className="aweb-password">
                        <label>Password</label>
                        <input type="password" name="password" onChange={ (e) => this.setInputValueChange( 'password', e.target.value) } defaultValue={ password }/>
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