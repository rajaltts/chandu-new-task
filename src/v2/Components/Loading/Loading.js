import React from 'react'
import LoadingIcon from './LoadingIcon'
import useStyles from './Loading.styles'

const Loading = ({ version }) => {
    const classes = useStyles()
    return (
        <div className={classes.container}>
            <LoadingIcon width={160} />
            {version && <div className={classes.version}>{version}</div>}
        </div>
    )
}

export default Loading
