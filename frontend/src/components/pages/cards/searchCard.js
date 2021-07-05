import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { AiOutlineSearch } from "react-icons/ai";


export const SearchCard = () => {
    const [ searchKey, setSearchKey ] = useState('')

    return (
        <div className="bg-gray-900 mb-2" >
            <form action={`/search/${searchKey}`}>
             <div className="ml-52 mb-2 pb-2 pt-2 h-12 flex flex-row">
                <input className="rounded w-72" type="search" placeholder="Search products" onChange={ (e) => setSearchKey(e.target.value) } value={searchKey} />
		              <div className="h-8 w-8 bg-indigo-800" >
		                <AiOutlineSearch className="text-gray-50 ml-1 h-7 w-6"/>
		                  {/* <input type="submit" value="Search"/> */}
		               </div>  		  
             </div>   
            </form>
        </div>
    )
}