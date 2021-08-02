import React from 'react'

const axios = require('axios')

export const FeedbackCard = (prop) => {
    const { email, name, feedback, date } = prop

    return ( 
        <div className="feedback-item">
            { `${name} writes "${feedback}" on ${date}` }
        </div>
    )
}