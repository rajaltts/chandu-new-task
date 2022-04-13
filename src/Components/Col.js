import React from 'react'

function Col(props) {
    return (
        <div
            style={{ flexBasis: 0, flexGrow: 1, width: '100%', padding: '0 15px', position: 'relative' }}
            className={props.className}
        >
            {props.children}
        </div>
    )
}
export default Col
