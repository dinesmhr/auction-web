import React, { useState, useContext } from 'react';
import {appContext} from '../../../App'

const axios = require('axios')

export const LoginCard = () => {
    const [ username, setUsername ] = useState({value: ''})
    const [ password, setPassword ] = useState({value: ''})
    const [ error, setError ] = useState(false)
    const [ errorMessage, setErrorMessage ] = useState()
    const [ isDisabled ] = useState(false);

    const { updateLoggedInStatus } = useContext(appContext)
    
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
    
    return (
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
    )
}