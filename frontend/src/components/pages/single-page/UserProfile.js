import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'
import Header from '../../header/Header'
import Footer from '../../footer/Footer'

const axios = require('axios');

const UserProfile = () => {
    const [ userData, setUserData ] = useState()
    const { id } = useParams()

    // get user info data
    useEffect(() => {
        axios.get( `/user-details.php?id=${id}` )
        .then(function(res) {
            if( res.data.status ) {
                setUserData(res.data.data)
            }
        })
    }, [id])

    return ( 
        <>
        <div id="auction-web" className="">
            <Header/>
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
            <Footer/>
        </div>
        </>
    );
}
export default UserProfile;