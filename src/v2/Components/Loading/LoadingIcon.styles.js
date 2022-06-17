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

export default useStyles
