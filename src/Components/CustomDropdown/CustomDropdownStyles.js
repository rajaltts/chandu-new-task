import { makeStyles } from '@material-ui/core/styles'

const customDropdownStyles = makeStyles((theme) => ({
    tagTemplateName: {
        display: 'block',
        overflowWrap: 'break-word',
        maxWidth: '220px',
    },
    fullWidth: {
        width: '100% !important',
    },
}))

export default customDropdownStyles
