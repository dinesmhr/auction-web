import React, { Component } from 'react';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        return ( 
            <div id="auction-web-login" className="page--login main-wrapper">
                <form id="aweb-login-form">
                    <div className="aweb-username">
                        <label>Username</label>
                        <input type="text" name="username"/>
                    </div>
                    <div className="aweb-password">
                        <label>Password</label>
                        <input type="password" name="password"/>
                    </div>
                    <div className="aweb-submit">
                        <input type="submit" name="submit" value="Login"/>
                    </div>
                </form>
            </div>
        );
    }
}

export default Login;