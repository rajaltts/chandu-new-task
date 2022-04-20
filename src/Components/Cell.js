import React from 'react'

function Cell(props) {
    if (props.Visible.Value === 'TRUE') {
        return (
            <div style={{ backgroundColor: props.BackgroundColor, padding: '5px', overflow: 'hidden', width: '240px' }}>
                {props.children}
            </div>
        )
    } else return null
}

export default Cell
