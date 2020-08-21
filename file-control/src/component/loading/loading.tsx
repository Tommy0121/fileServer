import React from 'react'
import loadingStyle from './loading.module.scss'

export const LoadingCycle = ()=>{


    return(
        <div className={loadingStyle['loading-cycle']}>
        </div>
    )
}

export const LoadingThreeDot = () => {

    return (
        <div className={loadingStyle["loading-threedot"]}>
            <span className={loadingStyle["dot"]}></span>
            <span className={loadingStyle["dot"]}></span>
            <span className={loadingStyle["dot"]}></span>
        </div>
    )
}

export default LoadingCycle;