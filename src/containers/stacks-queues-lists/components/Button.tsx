import React from 'react'
import './Button.css'

const CustomButton = (props: any) => {

    return (
        <div 
            className='custom-button' 
            style={{...props.styles}}
            onClick={props.handleButtonClick}    
        >
            <div className='button-name'>
                {props.children}
            </div>
        </div>
    )
}

export default CustomButton