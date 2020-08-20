import React from 'react'
import './loading.scss'

export const LoadingCycle = ()=>{


    return(
        <div className="loading-cycle">
        </div>
    )
}

export const LoadingThreeDot = () => {

    return (
        <div className="loading-threedot">
            <span className="dot"></span>
            <span className="dot"></span>
            <span className="dot"></span>
        </div>
    )
}

export default LoadingCycle;