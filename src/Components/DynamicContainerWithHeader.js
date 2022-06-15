import React from 'react'

function DynamicContainerWithLabel(props) {
    if (!props.Visible || props.Visible.Value === 'TRUE') {
        return (
            <div>
                <div className='SubHeader'>
                    <h1 className='SubHeaderTitle'>{props.Title}</h1>
                </div>
                <div className='SubContainer'>{props.children}</div>
            </div>
        )
    }
    return null
}

export default DynamicContainerWithLabel
