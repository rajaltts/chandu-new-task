import makeStyles from '@material-ui/core/styles/makeStyles'

export const inputStyles = makeStyles({
    InputRoot: {
        fontSize: '14px',
        paddingLeft: '5px',
        paddingRight: '0px',
        width: (props) => props.width || '100%',
    },
})
