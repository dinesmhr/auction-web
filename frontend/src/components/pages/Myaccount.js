import React, { Fragment, useRef, useState, useContext, useEffect } from "react";
import { Redirect } from 'react-router-dom'
import Header from '../header/Header'
import Footer from '../footer/Footer'
import { Dialog, Transition } from '@headlessui/react'
import {appContext} from '../../App'

import { FaUserAlt, FaProductHunt } from "react-icons/fa";
import { BiDollar } from "react-icons/bi"

const axios = require('axios');

const Myaccount = () => {
    const [ openLogoutConfirmModal, setOpenLogoutConfirmModal] = useState(false)
    const [ userID, setUserID] = useState()
    const [ userData, setUserData] = useState() // user full details
    const [ userProductData, setUserProductData] = useState() // user products
    const [ userBidData, setUserBidData] = useState() // user bids
    const [openTab, setOpenTab] = React.useState(1);

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
        <div id="auction-web">
            <div className="h-full ">
                <Header/>
                <div className="w-4/5   ">
                    <h2 class="text-3xl font-medium underline pl-36 pt-8"> 
                        { `Account page` }
                   </h2>
                    <ul className="flex mb-0 list-none flex-wrap pt-3 pb-4 flex-row"role="tablist ">
                        <li className="-mb-px mr-2 last:mr-0 flex-auto text-center ml-16">
                            <a className={"text-xs font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal " +
                                (openTab === 1
                                    ? "text-white bg-" + 'red' + "-600"
                                    : "text-" + 'red' + "-600 bg-gray-100")
                                }
                                onClick={e => {
                                e.preventDefault();
                                setOpenTab(1);
                                }}
                                data-toggle="tab"
                                href="#link1"
                                role="tablist"
                            >
                             <div className="flex justify-center"><FaUserAlt/></div>User Information
                            </a>
                        </li>
                        <li className="-mb-px mr-2 last:mr-0 flex-auto text-center">
                            <a className={"text-xs font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal " +
                                (openTab === 2
                                    ? "text-white bg-" + 'red' + "-600"
                                    : "text-" + 'red' + "-600 bg-gray-100")
                                }
                                onClick={e => {
                                e.preventDefault();
                                setOpenTab(2);
                                }}
                                data-toggle="tab"
                                href="#link2"
                                role="tablist"
                            >
                                <div className="flex justify-center"><FaProductHunt/></div>  My Products
                            </a>
                        </li>
                        <li className="-mb-px mr-2 last:mr-0 flex-auto text-center">
                            <a className={"text-xs font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal " +
                                (openTab === 3
                                    ? "text-white bg-" + 'red' + "-600"
                                    : "text-" + 'red' + "-600 bg-gray-100")
                                }
                                onClick={e => {
                                e.preventDefault();
                                setOpenTab(3);
                                }}
                                data-toggle="tab"
                                href="#link3"
                                role="tablist"
                            >
                                <div className="flex justify-center"><BiDollar/></div>My bids
                            </a>
                        </li>
                    </ul>
                    <div>
                        <div className={openTab === 1 ? "block" : "hidden"} id="link1">
                            { userData && 
                                userData.map( (userDat, index) => {
                                    return(
                                        <div key={ index } className=" text-base w-4/5 ">
                                        <table className="table-auto w-full ">
                                            <tbody>
                                                <tr className="flex flex-row mb-4">   
                                                    <th className="w-1/4 ">Full Name : </th>   
                                                    <td className="w-3/4">{userDat.fullname }</td>
                                                </tr>
                                                <tr className="flex flex-row mb-4" >   
                                                    <th className="w-1/4 ">Username : </th>   
                                                    <td className="w-3/4">{userDat.username}</td>
                                                </tr>
                                                <tr className="flex flex-row mb-4">   
                                                    <th className="w-1/4 ">Email : </th>   
                                                    <td className="w-3/4">{userDat.email }</td>
                                                </tr>
                                                <tr className="flex flex-row mb-4">   
                                                    <th className="w-1/4 ">Profession : </th>   
                                                    <td className="w-3/4">{userDat.profession }</td>
                                                </tr>
                                                <tr className="flex flex-row mb-4">   
                                                    <th className="w-1/4">role : </th>   
                                                    <td className="w-3/4">{userDat.role }</td>
                                                </tr>
                                                <tr className="flex flex-row mb-4">   
                                                    <th className="w-1/4">Status : </th>   
                                                    <td className="w-3/4">{userDat.status }</td>
                                                </tr>
                                                <tr className="flex flex-row mb-4">   
                                                    <th className="w-1/4">User ID : </th>   
                                                    <td className="w-3/4">{userDat.user_id}</td>
                                                </tr>

                                                <tr className="flex flex-row mb-4">   
                                                    <th className="w-1/4">DOB : </th> 
                                                { userDat.birthdate && 
                                                        <td>
                                                        <span className="mr-4">Day : {userDat.birthdate.day}</span>
                                                        <span className="mr-4">Month :{userDat.birthdate.month}</span>
                                                        <span className="mr-4">Year : {userDat.birthdate.year}</span>
                                                        </td>                                            
                                                }
                                                </tr>
                                                <tr className="flex flex-row mb-4">   
                                                    <th className="w-1/4">Contact Number : </th> 
                                                { userDat.contact_num && 
                                                        <td>
                                                        <span className="mr-4"> {userDat.contact_num.areaCode}</span>
                                                        <span className="mr-4">{userDat.contact_num.number}</span>
                                                        </td>                                            
                                                }
                                                </tr>
                                                <tr className="flex flex-row mb-4">   
                                                    <th className="w-1/4">Current Address : </th> 
                                                { userDat.current_ad && 
                                                        <td className="flex flex-col">
                                                        <span className="mr-4 mb-1">City : {userDat.current_ad.city}</span>
                                                        <span className="mr-4 mb-1">Country :{userDat.current_ad.country}</span>
                                                        <span className="mr-4 mb-1">Postal Code : {userDat.current_ad.postalCode}</span>
                                                        <span className="mr-4 mb-1">State Province :{userDat.current_ad.stateProvince}</span>
                                                        <span className="mr-4 mb-1">Street Address : {userDat.current_ad.streetAddress}</span>                                                    
                                                        </td>                                            
                                                }
                                                </tr>
                                                <tr className="flex flex-row mb-4">   
                                                    <th className="w-1/4">Permanent Address : </th> 
                                                { userDat.permanent_ad && 
                                                        <td className="flex flex-col">
                                                        <span className="mr-4 mb-1">City : {userDat.permanent_ad.city}</span>
                                                        <span className="mr-4 mb-1">Country :{userDat.permanent_ad.country}</span>
                                                        <span className="mr-4 mb-1">Postal Code : {userDat.permanent_ad.postalCode}</span>
                                                        <span className="mr-4 mb-1">State Province :{userDat.permanent_ad.stateProvince}</span>
                                                        <span className="mr-4 mb-1">Street Address : {userDat.permanent_ad.streetAddress}</span>                                                    
                                                        </td>                                            
                                                }
                                                </tr>

                                            </tbody>
                                            </table>
                                        </div>

                                        )
                                })
                            }
                        </div>
                        <div className={openTab === 2 ? "block" : "hidden"} id="link1">
                            { userProductData && 
                                userProductData.map(( userProductDat, index ) => {
                                    return(
                                        <table className="table-auto w-full ">
                                            <tbody>
                                            <div key={ index } className=" text-base mb-8 w-3/4 ">
                                                <tr className="flex flex-row mb-4">   
                                                    <th className="w-1/4">Images : </th>                                         
                                                { userProductDat.images_path && 
                                                        <td className="flex flex-col">
                                                        <span className="mr-4 mb-1"> {userProductDat.images_path.[0]}</span>                                                 
                                                        </td>                                            
                                                }
                                                </tr>

                                            <tr className="flex flex-row  mb-4">   
                                                    <th className="w-1/4">Product ID : </th>   
                                                    <td className="w-3/4w-3/4">{userProductDat.id }</td>
                                            </tr>
                                            <tr className="flex flex-row  mb-4">   
                                                    <th className="w-1/4">Title: </th>   
                                                    <td className="w-3/4w-3/4">{userProductDat.title }</td>
                                            </tr>
                                            <tr className="flex flex-row  mb-4">   
                                                    <th className="w-1/4">Deadline Date : </th>   
                                                    <td className="w-3/4w-3/4">{userProductDat.deadline_date }</td>
                                            </tr>
                                            <tr className="flex flex-row  mb-4">   
                                                    <th className="w-1/4">Description : </th>   
                                                    <td className="w-3/4">{userProductDat.description }</td>
                                            </tr>
                                            <tr className="flex flex-row  mb-4">   
                                                    <th className="w-1/4">Details : </th>   
                                                    <td className="w-3/4">{userProductDat.details }</td>
                                            </tr>
                                            <tr className="flex flex-row  mb-4">   
                                                    <th className="w-1/4">Initial Bid : </th>   
                                                    <td className="w-3/4">{userProductDat.initial_bid }</td>
                                            </tr>
                                            <tr className="flex flex-row  mb-4">   
                                                    <th className="w-1/4">Max bid : </th>   
                                                    <td className="w-3/4">{userProductDat.max_bid }</td>
                                            </tr> 
                                            <tr className="flex flex-row  mb-4">   
                                                    <th className="w-1/4">Status : </th>   
                                                    <td className="w-3/4">{userProductDat.status }</td>
                                            </tr>
                                            <tr className="flex flex-row  mb-4">   
                                                    <th className="w-1/4">Submission Date : </th>   
                                                    <td className="w-3/4">{userProductDat.submission_date }</td>
                                            </tr>
                                            <hr/>                                             
                                        </div>
                                    </tbody>
                                    </table>

                                    )
                                })
                            }




                        </div>
                        <div className={openTab === 3 ? "block" : "hidden"} id="link1">
                            { userBidData && 
                                userBidData.map(( userBidDat, index ) => {
                                    return(
                                        <table className="table-auto w-full ">
                                            <tbody>                                     
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
                                        </tbody>
                                        </table>
                                        )
                                })
                            }
                        </div>
                    </div>

                    <div className="ml-16">{`Log me out`}
                        <button className=" ml-10 mb-16 logout-button bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded" onClick = { (e) => setOpenLogoutConfirmModal(true) }>Log out</button>
                    </div>
                    { 
                        LogoutModal()
                 
                   }
                   </div> 
                <Footer/>
            </div>
        </div>
    )
}

export default Myaccount;