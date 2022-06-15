import React from 'react'
import { ReactComponent as LoadingSvg } from './assets/loading.svg'
import { makeStyles } from '@material-ui/core'

const useStyles = makeStyles(() => ({
    '@keyframes rotate': {
        '0%': {
            transform: 'rotate(0deg)',
        },
        '100%': {
            transform: 'rotate(359deg)',
        },
    },
    animatedItem: {
        animation: `$rotate 5s infinite linear`,
    },
}))

const LoadingIcon = ({ width }) => {
    const classes = useStyles()
    return (
        <div style={{ width: width ? width : '30px' }}>
            <LoadingSvg className={classes.animatedItem} />
        </div>
    )
}

export default LoadingIcon
