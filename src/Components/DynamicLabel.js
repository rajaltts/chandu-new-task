import React from 'react'

function DynamicLabel(props) {
    if (!props.Visible || props.Visible.Value === 'TRUE') {
        return <span className={props.className}>{props.Text}</span>
    }
    return null
}

export default DynamicLabel
