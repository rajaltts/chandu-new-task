import { makeStyles } from '@material-ui/core/styles'

const saveTemplateStyles = makeStyles((theme) => ({
    paragraph: {
        color: '#BAC0D0',
        fontWeight: 'normal',
        margin: '18px 0px 23px 0px',
    },
    field: {
        minHeight: '39px',
        paddingTop: '0px',
        paddingBottom: '0px',
    },
    menuItem: {
        background: 'transparent !important',
        borderBottom: '1px solid #E5E7ED',
        '&:hover': {
            backgroundColor: 'transparent !important',
        },
    },
    menuItemSelected: {
        color: '#1891F6',
    },
    menuPopper: {
        zIndex: 99999999,
    },
    menuListUl: {
        padding: '0px !important',
    },
    menuContainer: {
        '& div': {
            margin: '0px !important',
        },
    },
}))

export default saveTemplateStyles
