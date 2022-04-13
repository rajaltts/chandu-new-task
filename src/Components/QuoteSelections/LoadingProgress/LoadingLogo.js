import React from 'react'
import { SelectionToQuoteLoadingIcon } from '../../SvgImages'
import { makeStyles } from '@material-ui/core/styles'

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
            <SelectionToQuoteLoadingIcon className={classes.animatedItem} />
        </div>
    )
}

export default LoadingIcon
