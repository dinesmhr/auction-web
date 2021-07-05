import React, { useState, useEffect } from 'react'

const axios = require('axios')

export const TopCategoryCard = (prop) => {
    const [ category, setCategory ] = useState({})
    const { term_id, value_occurrence } = prop

    useEffect(() => {
        axios.get( `/product-categories.php?id=${term_id}` )
        .then((res) => {
            if( res.data.status ) {
                setCategory(res.data.data)
            }
        })
    }, [])

    return ( 
        <div className="top-category-item">
            { Array.isArray(category) &&
                category.map((cat) => {
                    let featureImage = cat.image_path[0]
                    if( !cat.image_path[0].includes('http://localhost/auction-web/') ) {
                        featureImage = `http://localhost/auction-web/${cat.image_path[0].split('../').pop()}`
                    }
                    return (
                        <div className="category-card">
                            <img src={`${featureImage}`} alt={cat.title}/>
                            <div className="category-box">
                                <h3 title={cat.title}>
                                    <a href={ `category/${cat.id}` }>{cat.title}</a>
                                </h3>
                                { value_occurrence &&
                                    <div>{ `${value_occurrence} products` }</div>
                                }
                            </div>
                        </div>
                    )
                })
            }
        </div>
    )
}