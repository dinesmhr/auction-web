import React, { useState, useEffect } from "react"
import Header from "../header/Header"
import Footer from "../footer/Footer"

const axios = require('axios')

const CategoryCard=(category)=>{
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
            <div className="category-card ml-14 mt-10">
            <a href={ `category/${id}` }>
                <img src={`${featureImage}`} alt={title} className="h-40 w-40"/>
                    <h3 title={title} className="relative text-center">
                        <a href={ `category/${id}`} className="">{title}</a>
                    </h3>
            </a>
                <div className="category-box">
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
                <div className="auction-web-categoriesPage h-full ">
                    <div className="categoriesPageWrap flex flex-wrap ">
                    { !data &&
                        <div>{`Loading categories`}</div>
                    }
                    { Array.isArray(data) &&
                        data.map((dat, key) => {
                            return (<CategoryCard key={key} {...dat}/>)
                        })   
                    }
                    </div>
                </div>
            <Footer/>
        </>
    )
}
export default Categories