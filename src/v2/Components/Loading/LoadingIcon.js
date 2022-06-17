import React from 'react'
import { ReactComponent as LoadingSvg } from './loading.svg'
import useStyles from './LoadingIcon.styles'

const LoadingIcon = ({ width }) => {
    const classes = useStyles()
    return (
        <div style={{ width: width ? width : '30px' }}>
            <LoadingSvg className={classes.animatedItem} />
        </div>
    )
}

export default LoadingIcon
