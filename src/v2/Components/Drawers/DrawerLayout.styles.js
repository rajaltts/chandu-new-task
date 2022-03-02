import { makeStyles } from "@material-ui/core"
import { UI_SIZES } from '../utils/constants'

export const useStyles = makeStyles((theme) => ({
    drawer: {
        zIndex: '999!important',
        [theme.breakpoints.up('sm')]: {
            zIndex: '1!important',
        },
        '& .MuiDrawer-paper': {
            [theme.breakpoints.only('xs')]: {
                width: '80%',
            },
        },
    },
    drawerContent: {
        display: 'flex',
        flex: 1,
        padding: `calc(${UI_SIZES.HEADER_HEIGHT}px + 10px) 0 0`,
        [theme.breakpoints.up('sm')]: {
            width: '474px',
            padding: `calc(${UI_SIZES.HEADER_HEIGHT}px + ${UI_SIZES.STEPPER_HEIGHT}px + 10px) 0 calc(${UI_SIZES.FOOTER_HEIGHT}px + ${UI_SIZES.BOTTOM_ACTIONS_HEIGHT}px)`,
        },
        '&:focus': {
            outline: 'none',
        },
    },
}))