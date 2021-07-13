import React, { useContext } from 'react';
import { Redirect } from 'react-router-dom';
import Header from '../header/Header';
import Footer from '../footer/Footer';
import {LoginCard} from './cards/loginCard'
import {appContext} from '../../App'

const Login = () => {
    const { isLoggedIn } = useContext(appContext)

    if( isLoggedIn ) {
        return <Redirect to="/myaccount"/>
    }
    
    return (
        <div id="auction-web">
            <Header/>
                <div className="flex justify-center mt-16 h-screen">
                    <div className="w-full max-w-xs">
                        <LoginCard/>
                    </div>
                </div>
            <Footer/>
        </div>
    )
}

export default Login;