import React from 'react'

function TableColumn(props) {
    if (
        typeof props.Visible === 'undefined' ||
        (typeof props.Visible !== 'undefined' && props.Visible.Value === 'TRUE')
    ) {
        return (
            <div>
                <div
                    style={{
                        backgroundColor: props.BackgroundColor,
                        height: '40px',
                        lineHeight: '40px',
                        textAlign: 'center',
                        width: '250px',
                    }}>
                    {props.Header}
                </div>
                {props.children}
            </div>
        )
    }
    return null
}

export default TableColumn
