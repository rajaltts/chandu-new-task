import { makeStyles } from '@material-ui/core/styles'

const customDropdownStyles = makeStyles(() => ({
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
