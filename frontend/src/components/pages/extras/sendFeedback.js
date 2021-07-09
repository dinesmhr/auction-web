import React from 'react'
import Header from '../../header/Header'
import Footer from '../../footer/Footer'

const SendFeedback = () => {
    return (
    <div id="auction-web">
        <Header/>
			<div className="h-full ml-16 mt-20 w-3/4 font-serif text-gray-800 mb-20">
		        	<div className="text-3xl uppercase text-gray-700 mb-8 bold">Send Feedback</div>
		        		<div className="">
		        			<p className="leading-7">Please feel free to send us your feedback, either positive or constructive
		        			criticism are highly appretiated.</p>
		        		</div>

		        		<div className="mt-20 ">
		        			<form class="w-full max-w-xl	">
								  <div class="md:flex md:items-center mb-6">
								    <div class="md:w-1/3">
								      <label class="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" for="Email">
								        Email
								      </label>
								    </div>
								    <div class="md:w-full">
								      <input class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" id="inline-feedback" type="text" placeholder=""/>
								    </div>
								   </div>
								  <div class="md:flex">
								    <div class="md:w-1/3">
								      <label class=" mb-6 mt-2 block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" for="inline-feedback">
								        Feedback
								      </label>
								    </div>
								    <div class="md:w-full mt-2">
								      <textarea class="h-64 bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" id="inline-feedback" type="text" placeholder=""/>
								    </div>
								  </div>
								  
								  <div class="md:flex md:items-center">
								    <div class="md:w-1/3"></div>
								    <div class="md:w-full mt-4">
								      <button class="shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded" type="button">
								        Send Feedback
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
export default SendFeedback