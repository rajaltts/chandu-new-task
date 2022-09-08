import React from 'react'
import { injectIntl } from 'react-intl'
import { IconButton, Typography, makeStyles } from '@material-ui/core'
import RightArrowIcon from '@material-ui/icons/ArrowForwardIos'
import { injectIntlTranslation } from '@carrier/workflowui-globalfunctions'

const useStyles = makeStyles((theme) => ({
    drawerContainer: {
        display: 'flex',
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-between',
        [theme.breakpoints.only('xs')]: {
            width: '100%',
            overflow: 'hidden',
        },
        '& .options-wrapper': {
            margin: theme.spacing(0, 0, 3),
            [theme.breakpoints.up('sm')]: {
                margin: theme.spacing(0, 0, 5),
            },
        },
    },
    drawerMainContent: {
        margin: theme.spacing(0, 1),
        [theme.breakpoints.up('sm')]: {
            margin: theme.spacing(0, 2),
        },
        '& .MuiTypography-h2': {
            [theme.breakpoints.only('xs')]: {
                fontSize: 16,
                paddingBottom: theme.spacing(1),
            },
        },
    },
    drawerCloseBtn: {
        marginLeft: '-12px',
        [theme.breakpoints.only('xs')]: {
            padding: '4px 12px 12px',
        },
    },
    drawerIcon: {
        color: theme.palette.grey.main,
        fontSize: 16,
    },
}))

const ReportsList = ({ closeReportDrawer, intl }) => {
    const { drawerContainer, drawerMainContent, drawerCloseBtn, drawerIcon } = useStyles()

    return (
        <div className={drawerContainer}>
            <div className={drawerMainContent}>
                <IconButton className={drawerCloseBtn} onClick={() => closeReportDrawer()}>
                    <RightArrowIcon className={drawerIcon} />
                </IconButton>
                <Typography variant='h2' color='primary'>
                    {injectIntlTranslation(intl, 'GENERATE_REPORTS')}
                </Typography>
            </div>
        </div>
    )
}

export default injectIntl(ReportsList)
