import React, { useState, useEffect } from "react"
import Header from "../header/Header"

const axios = require('axios')

const Card=(category)=>{
    const [  productCount, setProductCount ] = useState()
    const { id, title, image_path } = category
    let featureImage
    if( !image_path[0].includes('http://localhost/auction-web/') ) {
        featureImage = `http://localhost/auction-web/${image_path[0].split('../').pop()}`
    } else {
        featureImage = image_path[0]
    }

    useEffect(() => {
        axios.get( `/product-meta.php?term_id=${id}&count=count` )
        .then(function(res) {
            setProductCount(res.data.data[0])
        })
    }, [])
    
    return(
        <>
            <div className="category-card">
                <img src={`${featureImage}`} alt={title}/>
                <div className="category-box">
                    <h3 title={title}>
                        <a href={ `category/${id}` }>{title}</a>
                    </h3>
                    { productCount &&
                        <div>{ `${productCount} products` }</div>
                    }
                </div>
            </div>
        </>
    );
}

const Categories = () => {
    const [ data, setData ] = useState()

    useEffect(() => {
        axios.get( `/product-categories.php` )
        .then(function(res) {
            setData(res.data.data)
        })
    }, [])

    return (
        <>
            <Header/>
            <div id="auction-web-categoriesPage">
                { !data &&
                    <div>{`Loading categories`}</div>
                }
                { Array.isArray(data) &&
                    data.map((dat, key) => {
                        return <Card key={key} {...dat}/>
                    })   
                }
            </div>
        </>
    )
}
export default Categories