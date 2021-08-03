import React, { useState, useEffect, useContext, Fragment, useRef } from 'react';
import { Dialog, Transition } from '@headlessui/react'
import {appContext} from '../../../App'

const axios = require('axios')

export const LoginCard = () => {
    const [ username, setUsername ] = useState({value: ''})
    const [ email, setEmail ] = useState({value: ''})
    const [ password, setPassword ] = useState({value: ''})
    const [ error, setError ] = useState(false)
    const [ errorMessage, setErrorMessage ] = useState()
    const [ isDisabled ] = useState(false);
    const [ resetLinkBox, setResetLinkBox ] = useState(false)
    const [ passwordType, setPasswordType ] = useState('password')

    const { updateLoggedInStatus } = useContext(appContext)

    const cancelButtonRef = useRef(null)

    const onSubmit = (e) => {
        e.preventDefault()
        axios.get( `/check-user.php?username=${username.value}&password=${password.value}` )
        .then( function (response) {
            if( !response.data.status ) { //if no response with given username
                setError(true)
                setErrorMessage("Username not exists")
            } else {
                if( !response.data.data[0].password_status ) { //if Username matched
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

    const onForgetPass = (e) => {
        e.preventDefault()
        axios.get( `/check-user.php?username=${username.value}&password=${password.value}` )
        .then( function (response) {
            if( !response.data.status ) { //if no response with given username
                setError(true)
                setErrorMessage("Username not exists")
            } else {
                setEmail( response.data.data[0].email )
                axios.post( `/mail/sent-reset-pw-mail.php`, { 
                        email: response.data.data[0].email,
                        username: username.value,
                        sender_email: `dinesh.mhr2054@gmail.com`
                })
                .then((res) => {
                    setResetLinkBox(true);
                })
            }
        });
    }
    
    const resetLinkModal = () => {
        return (
            <Transition.Root show={resetLinkBox} as={Fragment}>
                <Dialog
                    as="div"
                    static
                    className="fixed z-10 inset-0 overflow-y-auto"
                    initialFocus={cancelButtonRef}
                    open={resetLinkBox}
                    onClose={setResetLinkBox}
                >
                    <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                    </Transition.Child>

                    {/* This element is to trick the browser into centering the modal contents. */}
                    <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
                        &#8203;
                    </span>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        enterTo="opacity-100 translate-y-0 sm:scale-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                        leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                    >
                        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                                <div className="sm:flex sm:items-start">
                                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                                        <Dialog.Title as="h3" className="text-lg leading-6 font-medium text-gray-900">
                                        Confirmation Box
                                        </Dialog.Title>
                                        <div className="mt-2">
                                            <p className="text-sm text-gray-500">
                                                { `Password Reset Link has been sent in your email address ${email}?` }
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                                <button
                                type="button"
                                className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
                                onClick={() => setResetLinkBox(false)}
                                >
                                Okay
                                </button>
                            </div>
                        </div>
                    </Transition.Child>
                    </div>
                </Dialog>
            </Transition.Root>
        )
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
                <input className="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" type={passwordType} name="password" onChange={ (e) => setPassword({ value: e.target.value }) } value={ password.value } placeholder="******************"/>
                <input type="checkbox" onChange = {(e)=>( passwordType === 'password' ? setPasswordType('text') : setPasswordType('password') )}/> Show password
            </div>

            <div className="flex items-center justify-between">
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit" name="submit" onClick= { (e) => onSubmit(e) } disabled={ isDisabled }>
                    Log In
                </button>
                <a className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800" onClick = { (e) => onForgetPass(e) }>
                    Forgot Password?
                </a>
            </div>

            { resetLinkBox &&
                resetLinkModal()
            }
        </form>
    )
}