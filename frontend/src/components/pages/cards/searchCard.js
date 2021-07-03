import React, { useState } from 'react'
import { Link } from 'react-router-dom'

export const SearchCard = () => {
    const [ searchKey, setSearchKey ] = useState()

    return (
        <div>
            <form action={`/search/${searchKey}`}>
                <input type="search" placeholder="Search products" onChange={ (e) => setSearchKey(e.target.value) } value={searchKey} />
                <input type="submit" value="Search" />
            </form>
        </div>
    )
}