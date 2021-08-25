import React from "react"
import { Link } from 'react-router-dom'

export const ProductCard = (product) => {
    const { id, title, initial_bid, images_path } = product
    let featureImage
    if(!images_path[0].includes('http://localhost/auction-web/')) {
        featureImage = `http://localhost/auction-web/${images_path[0].split('../').pop()}`
    } else {
        featureImage = images_path[0]
    }
    
    return(
        <>
            <div className="product-card">
                <img src={`${featureImage}`} alt={title}/>
                <hr/>
                <div className="product-box">
                    <h3 title={title} className="font-semibold">
                        <a href={ `/product/${id}` }>{title}</a>
                    </h3>
                    <div className="bid-amount">
                        {`${initial_bid}USD`}
                    </div>
                    <Link to={ `/product/${id}` }>
                       <div className="text-yellow-600 font-semibold hover:text-yellow-500"> Bid Now </div>
                    </Link>
                </div>
            </div>
        </>
    );
}