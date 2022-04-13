import React from 'react'

const TabPanel = (props) => {
    const { children, value, index } = props

    return (
        <div
            role='tabpanel'
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
        >
            {value === index && <div>{children}</div>}
        </div>
    )
}

export default TabPanel
