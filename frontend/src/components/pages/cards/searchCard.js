import React, { useState } from 'react'
import { AiOutlineSearch } from "react-icons/ai";


export const SearchCard = () => {
    const [ searchKey, setSearchKey ] = useState('')

    return (
        <div className="search-card bg-gray-900 mb-2" >
            <form action={`/search/${searchKey}`}>
             <div className=" search-box ml-52 mb-2 pb-2 pt-2 h-12 flex flex-row">
                <input className="rounded w-72" type="search" placeholder="Search products" onChange={ (e) => setSearchKey(e.target.value) } value={searchKey} />
                <button type="submit" className="h-8 w-8 bg-indigo-800">
                    <AiOutlineSearch className="text-gray-50 ml-1 h-7 w-6"/>
                    {/* <input type="submit" value="Search"/> */}
                </button>
             </div>   
            </form>
        </div>
    )
}