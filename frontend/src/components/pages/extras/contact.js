import React, { useState } from 'react'
import Header from '../../header/Header'
import Footer from '../../footer/Footer'

const axios = require('axios')

const Contact = () => {
    const [ email, setEmail ] = useState({ value: ''});
    const [ name, setName ] = useState({ value: ''});
    const [ message, setmessage ] = useState({value:''});
    const [ messageText, setmessageText ] = useState('Send Message');
 
    const validateEmail = () => {
        let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if( email.value === '' ) {
            email.error = true;
            email.errorMessage = "Email must not be empty";
        } else if( !re.test( email.value ) ) { 
            email.error = true;
            email.errorMessage = "Email is not valid";
        }  else {
            return true
        }
        setEmail( JSON.parse(JSON.stringify( email )) )
        return false
    }

    // validate name field
    const validateName = () => {
        if( name.value === '' ) {
            name.error = true;
            name.errorMessage = "Name must not be empty";
            setName( JSON.parse(JSON.stringify( name )) )
        } else {
            return true
        }
        return false
    }

    // validate message field
    const validatemessage = () => {
        if( message.value === '' ) {
            message.error = true;
            message.errorMessage = "message must not be empty";
            setmessage( JSON.parse(JSON.stringify( message )) )
        } else {
            return true
        }
        return false
    }

    const onSubmit = (e) => {
        e.preventDefault()
        if( validateEmail() && validateName() && validatemessage() ) {
            setmessageText( "Submitting message" )
            axios.post('/edit-table/edit-message.php', {
                name: name.value,
                email: email.value,
                message: message.value
            })
            .then(function (response) {
                if( response.data.status ) {
                    setEmail({value:''})
                    setName({value:''})
                    setmessage({value:''})
                    setmessageText( 'Send message' )
                }
            })
            .catch(function (error) {
                setmessageText( 'Send message' )
            });
        }
    }
    
    return (
        <div id="auction-web">
            <Header/>
                <div className="h-full ml-16 mt-20 w-3/4 font-serif text-gray-800 mb-20">
                        <div className="text-3xl uppercase text-gray-700 mb-8 bold">Contact Us</div>
                            <div className="">
                                <p className="leading-7">Please Contact us if you have any queries or want delivery services.</p>
                            </div>

                            <div className="mt-20">
                                <form className="w-full max-w-xl">
                                    <div className="md:flex md:items-center mb-6">
                                        <div className="md:w-1/3">
                                            <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" for="Email">
                                                Email
                                            </label>
                                             { email.error &&
                                                <div className="aweb-red-note">
                                                    { email.errorMessage }
                                                </div>
                                            }
                                        </div>
                                        <div className="md:w-full">
                                            <input className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" id="inline-message" type="text" onChange={ (e) => setEmail({ value: e.target.value }) } placeholder="Your Email address" value={email.value}/>
                                        </div>
                                    </div>
                                    <div className="md:flex md:items-center mb-6">
                                        <div className="md:w-1/3">
                                            <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" for="Email">
                                                Name
                                            </label>
                                             { name.error &&
                                                <div className="aweb-red-note">
                                                    { name.errorMessage }
                                                </div>
                                            }
                                        </div>
                                        <div className="md:w-full">
                                            <input className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" id="inline-message" type="text" onChange={ (e) => setName({ value: e.target.value }) } placeholder="Your name" value={name.value}/>
                                        </div>
                                    </div>
                                    <div className="md:flex">
                                        <div className="md:w-1/3">
                                            <label className=" mb-6 mt-2 block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" for="inline-message">
                                                Message
                                            </label>
                                            { message.error &&
                                                <div className="aweb-red-note">
                                                    { message.errorMessage }
                                                </div>
                                            }
                                        </div>
                                        <div className="md:w-full mt-2">
                                            <textarea className="h-64 bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" id="inline-message" type="text" onChange={ (e) => setmessage({ value: e.target.value }) } placeholder="Your Message" value={message.value}/>
                                        </div>
                                    </div>
                                    
                                    <div className="md:flex md:items-center">
                                        <div className="md:w-full mt-4">
                                            <button className=" ml-16 shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded" type="button" onClick = { (e) => onSubmit(e) }>
                                                { messageText }
                                            </button>
                                        </div>
                                    </div>
                                </form>
                            
                            </div>
                </div>
            <Footer/>
        </div>
    )
}
export default Contact