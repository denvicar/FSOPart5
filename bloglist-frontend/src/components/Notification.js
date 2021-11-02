import React from 'react'

const Notification = ({errorMessage, okMessage}) => {

    const uiToRender = () => {
        if (errorMessage!=='') {
            return (
                <div className="error">{errorMessage}</div>
            )
        } else if (okMessage!== '') {
            return <div className="notification">{okMessage}</div>
        } else return null
    }
    
    return (
        <>
        {uiToRender()}
        </>
    )
    
}

export default Notification