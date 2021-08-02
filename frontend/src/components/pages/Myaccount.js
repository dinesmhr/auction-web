import React, { Fragment, useRef, useState, useContext, useEffect } from "react";
import { Redirect } from 'react-router-dom'
import Header from '../header/Header'
import Footer from '../footer/Footer'
import { Dialog, Transition } from '@headlessui/react'
import {appContext} from '../../App'

const axios = require('axios');

const Myaccount = () => {
    const [ openLogoutConfirmModal, setOpenLogoutConfirmModal] = useState(false)
    const [ userID, setUserID] = useState()
    const [ userData, setUserData] = useState() // user full details
    const [ userProductData, setUserProductData] = useState() // user products
    const [ userBidData, setUserBidData] = useState() // user bids

    const { isLoggedIn, updateLoggedInStatus } = useContext(appContext)
    const cancelButtonRef = useRef(null)

    const triggerLogoutEvent = () => {
        setOpenLogoutConfirmModal(false)
        axios.post( `/edit-table/edit-session.php`, {
            login: 'false',
        })
        .then(function(res) {
            updateLoggedInStatus();
        })
    }

    useEffect(() => {
        axios.get( '/sessions.php' )
        .then(function(res) {
            setUserID(res.data.userId)
        })
    }, [])

    // get user info data
    useEffect(() => {
        axios.get( `/user-details.php?id=${userID}` )
        .then(function(res) {
            if( res.data.status ) {
                setUserData(res.data.data)
            }
        })
    }, [userID])

    // get user product data
    useEffect(() => {
        axios.get( `/products.php?user_id=${userID}` )
        .then(function(res) {
            if( res.data.status ) {
                setUserProductData(res.data.data)
            }
        })
    }, [userID])

    // get user bid data
    useEffect(() => {
        axios.get( `/bids.php?user_id=${userID}` )
        .then(function(res) {
            if( res.data.status ) {
                setUserBidData(res.data.data)
            }
        })
    }, [userID])

    const LogoutModal = () => {
        return (
            <Transition.Root show={openLogoutConfirmModal} as={Fragment}>
                <Dialog
                    as="div"
                    static
                    className="fixed z-10 inset-0 overflow-y-auto"
                    initialFocus={cancelButtonRef}
                    open={openLogoutConfirmModal}
                    onClose={setOpenLogoutConfirmModal}
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
                                    LogOut of Account
                                    </Dialog.Title>
                                    <div className="mt-2">
                                    <p className="text-sm text-gray-500">
                                        Are you sure you want to logout your account?
                                    </p>
                                    </div>
                                </div>
                                </div>
                            </div>
                            <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                                <button
                                type="button"
                                className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
                                onClick={() => triggerLogoutEvent()}
                                >
                                LogOut
                                </button>
                                <button
                                type="button"
                                className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                                onClick={() => setOpenLogoutConfirmModal(false)}
                                ref={cancelButtonRef}
                                >
                                Cancel
                                </button>
                            </div>
                        </div>
                    </Transition.Child>
                    </div>
                </Dialog>
            </Transition.Root>
        )
    }
    
    if( !isLoggedIn ) {
        return <Redirect to="/login"/>
    }

    return (
        <div id="auction-web" className="">
        <div className="h-full">
            <Header/>
                <div className="ml-16">
                    <h2 class="text-3xl font-medium underline pl-36 pt-8"> 
                        { `Account page` }
                   </h2>
                    <div>
                        <h2 className="text-center mt-4 mb-6 text-xl font-semibold text-pink-700">{ `User Information` }</h2>
                        { userData && 
                            userData.map( (userDat, index) => {
                                return(
                                     <div key={ index } className=" text-base w-4/5 ">
                                            <tr className="flex flex-row">   
                                                <th className="w-1/4 ">Full Name : </th>   
                                                <td className="w-3/4">{userDat.fullname }</td>
                                             </tr>
                                            <tr className="flex flex-row" >   
                                                <th className="w-1/4 ">Username : </th>   
                                                <td className="w-3/4">{userDat.username}</td>
                                            </tr>
                                            <tr className="flex flex-row">   
                                                <th className="w-1/4 ">Email : </th>   
                                                <td className="w-3/4">{userDat.email }</td>
                                            </tr>
                                            <tr className="flex flex-row">   
                                                <th className="w-1/4 ">Profession : </th>   
                                                <td className="w-3/4">{userDat.profession }</td>
                                            </tr>
                                            <tr className="flex flex-row">   
                                                <th className="w-1/4">role : </th>   
                                                <td className="w-3/4">{userDat.role }</td>
                                            </tr>
                                             <tr className="flex flex-row">   
                                                <th className="w-1/4">Status : </th>   
                                                <td className="w-3/4">{userDat.status }</td>
                                            </tr>
                                             <tr className="flex flex-row">   
                                                <th className="w-1/4">User ID : </th>   
                                                <td className="w-3/4">{userDat.user_id}</td>
                                            </tr>
                                     </div>

                                    )
                            })
                        }
                    </div>
                    <div>
                        <h2 className="text-center mt-4 mb-6 text-xl font-semibold text-pink-700">{ `My products` }</h2>
                        { userProductData && 
                            userProductData.map(( userProductDat, index ) => {
                                return(
                                    <div key={ index } className=" text-base mb-8 w-3/4 ">

                                        <tr className="flex flex-row">   
                                                <th className="w-1/4">Product ID : </th>   
                                                <td className="w-3/4w-3/4">{userProductDat.id }</td>
                                        </tr>
                                        <tr className="flex flex-row">   
                                                <th className="w-1/4">Title: </th>   
                                                <td className="w-3/4w-3/4">{userProductDat.title }</td>
                                        </tr>
                                        <tr className="flex flex-row">   
                                                <th className="w-1/4">Deadline Date : </th>   
                                                <td className="w-3/4w-3/4">{userProductDat.deadline_date }</td>
                                        </tr>
                                        <tr className="flex flex-row">   
                                                <th className="w-1/4">Description : </th>   
                                                <td className="w-3/4">{userProductDat.description }</td>
                                        </tr>
                                        <tr className="flex flex-row">   
                                                <th className="w-1/4">Details : </th>   
                                                <td className="w-3/4">{userProductDat.details }</td>
                                        </tr>
                                        <tr className="flex flex-row">   
                                                <th className="w-1/4">Initial Bid : </th>   
                                                <td className="w-3/4">{userProductDat.initial_bid }</td>
                                        </tr>
                                        <tr className="flex flex-row">   
                                                <th className="w-1/4">Max bid : </th>   
                                                <td className="w-3/4">{userProductDat.max_bid }</td>
                                        </tr> 
                                        <tr className="flex flex-row">   
                                                <th className="w-1/4">Status : </th>   
                                                <td className="w-3/4">{userProductDat.status }</td>
                                        </tr>
                                        <tr className="flex flex-row">   
                                                <th className="w-1/4">Submission Date : </th>   
                                                <td className="w-3/4">{userProductDat.submission_date }</td>
                                        </tr>
                                        <hr/>                                             
                                    </div>
                                )
                            })
                        }

                    </div>
                    <div>
                        <h2 className=" text-center mt-4 mb-6 text-xl font-semibold text-pink-700">{ `My Bids Record` }</h2>
                        { userBidData && 
                            userBidData.map(( userBidDat, index ) => {
                                 return(
                                    <div key={ index } className=" text-base mb-8 w-3/4 "> 
                                        <tr className="flex flex-row">   
                                                <th className="w-1/4">Bid ID : </th>   
                                                <td className="w-3/4">{userBidDat.bid_id }</td>
                                        </tr>               
                                        <tr className="flex flex-row">   
                                                <th className="w-1/4">Bid Amount : </th>   
                                                <td className="w-3/4">{userBidDat.bid_amount }</td>
                                        </tr>
                                        <tr className="flex flex-row">   
                                                <th className="w-1/4">Bid Date : </th>   
                                                <td className="w-3/4">{userBidDat.bid_date }</td>
                                        </tr>
                                         <tr className="flex flex-row">   
                                                <th className="w-1/4">Bid Difference : </th>   
                                                <td className="w-3/4">{userBidDat.bid_difference }</td>
                                        </tr>

                                          <tr className="flex flex-row">   
                                                <th className="w-1/4">Product ID : </th>   
                                                <td className="w-3/4">{userBidDat.product_id }</td>
                                        </tr>
                                        <tr className="flex flex-row">   
                                                <th className="w-1/4">User ID : </th>   
                                                <td className="w-3/4">{userBidDat.user_id }</td>
                                        </tr>
                                           <tr className="flex flex-row">   
                                                <th className="w-1/4">Status : </th>   
                                                <td className="w-3/4">{userBidDat.bid_status }</td>
                                        </tr>                                        


                                    </div>
                                    )
                            })
                        }
                    </div>
                    <div>{`Log me out`}
                        <button className="logout-button bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded" onClick = { (e) => setOpenLogoutConfirmModal(true) }>Log out</button>
                    </div>
                    { 
                        LogoutModal()
                    }
                </div>
            </div>
            <Footer/>
        </div>
    )
}

export default Myaccount;