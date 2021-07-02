import React, { useState, useEffect } from "react"
import { Link, useParams } from 'react-router-dom'
import Header from '../../header/Header'

const axios = require('axios')

const SingleCategory = () => {
    const [ data, setData ]  = useState()
    const { id } = useParams()

    useEffect(() => {
        axios.get( `/product-categories.php?id=${id}` )
        .then(function(res){
            if( !res.data.data[0].image_path[0].includes('http://localhost/auction-web/') ) {
                res.data.data[0].image_path[0] = `http://localhost/auction-web/${res.data.data[0].image_path[0].split('../').pop()}`
            }
            setData(res.data.data[0])
        })
    }, [])

    
    return (
        <>
        <Header/>
        <div>
            { data &&
                <>
                    <h2>{data.title}</h2>
                    <div>
                        {data.description}
                    </div>
                    <div>
                    {
                        <img src={data.image_path[0]} alt={data.title}/>
                        
                    }
                    </div>
                </>
            }
        </div>
        </>
    )
}
export default SingleCategory