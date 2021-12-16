import React from 'react'
import PropTypes from 'prop-types'
import makeStyles from '@material-ui/core/styles/makeStyles'
import Hidden from '@material-ui/core/Hidden'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'

const useStyles = makeStyles((theme) => ({
    table: {
        borderCollapse: 'separate',
        [theme.breakpoints.up('md')]: {
            '&.mt-shift': {
                margin: '36px 0 0',
            },
        },

        '& .MuiTableRow-head': {
            '& .cooling, .heating, .dehumidification': {
                '&::before': {
                    position: 'absolute',
                    fontSize: 16,
                    color: theme.palette.text.primary,
                    margin: '-50px 0 0 -16px',
                },
            },
            '& .cooling': {
                [theme.breakpoints.up('md')]: {
                    '&::before': {
                        content: '"Cooling"',
                    },
                    '& ~ .cooling': {
                        '&::before': {
                            content: '""',
                        },
                    },
                },
            },
            '& .heating': {
                [theme.breakpoints.up('md')]: {
                    '&::before': {
                        content: '"Heating"',
                    },
                    '& ~ .heating': {
                        '&::before': {
                            content: '""',
                        },
                    },
                },
            },
            '& .dehumidification': {
                [theme.breakpoints.up('md')]: {
                    '&::before': {
                        content: '"Dehumidification"',
                    },
                    '& ~ .dehumidification': {
                        '&::before': {
                            content: '""',
                        },
                    },
                },
            },
        },
        '& .MuiTableCell-root': {
            borderBottom: 'none',
        },
        '& .MuiTableCell-head': {
            padding: '14px 12px',
            fontSize: 13,
            lineHeight: '16px',
            letterSpacing: '0.05em',
            fontWeight: 500,
            color: theme.palette.grey[550],
        },
    },
    tableBody: {
        '& .MuiTableRow-root': {
            //height: 40, // fixed height not applying?
            [theme.breakpoints.down('sm')]: {
                display: 'flex',
            },
            [theme.breakpoints.up('md')]: {
                background: 'white',
            },

            '&:last-child': {
                '& .MuiTableCell-body': {
                    borderBottomWidth: 8,
                },
            },

            '& .MuiTableCell-root:first-child': {
                [theme.breakpoints.down('sm')]: {
                    paddingRight: 0,
                },

                '&::before': {
                    content: '""',
                },
            },

            '& .MuiTableCell-root:last-child': {
                [theme.breakpoints.down('sm')]: {
                    flex: 1,
                },
            },

            '& .MuiAccordion-root': {
                [theme.breakpoints.down('sm')]: {
                    flex: 1,
                    margin: theme.spacing(0, 0, 0.5),
                    borderRadius: 4,
                    overflow: 'hidden',
                },
            },

            '& .MuiAccordionSummary-root': {
                [theme.breakpoints.down('sm')]: {
                    display: 'flex',
                    flex: 1,
                    padding: 0,
                },
            },

            '& .MuiAccordionSummary-content': {
                [theme.breakpoints.down('sm')]: {
                    margin: 0,
                    minHeight: 56,
                },
            },

            '& .MuiRadio-root': {
                [theme.breakpoints.down('sm')]: {
                    padding: 0,
                },
            },

            '& .MuiAccordionDetails-root': {
                [theme.breakpoints.down('xs')]: {
                    flexDirection: 'column',
                    '& .details-content': {
                        minHeight: 64,
                        flexWrap: 'wrap',
                        '&:not(:first-child)': {
                            borderTop: `1px solid ${theme.palette.grey[350]}`,
                            '&::after': {
                                content: '""',
                                position: 'absolute',
                                left: 0,
                                top: -1,
                                width: 30,
                                height: 1,
                                background: 'white',
                            },
                        },
                    },
                    '& .details-content-cell': {
                        width: '25%',
                    },
                },
                [theme.breakpoints.down('sm')]: {
                    padding: 0,
                    display: 'flex',
                    borderTop: `1px solid ${theme.palette.grey[350]}`,
                    '& .details-content': {
                        display: 'flex',
                        position: 'relative',
                        paddingLeft: 36,
                        '&::before': {
                            position: 'absolute',
                            top: 0,
                            bottom: 0,
                            left: 0,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            width: 30,
                            flex: '0 0 30px',
                            writingMode: 'vertical-lr',
                            transform: 'rotate(-180deg)',
                            fontSize: 12,
                            color: theme.palette.text.primary,
                            fontFamily: 'Roboto, sans-serif',
                            fontWeight: 500,
                        },
                        '&.cooling': {
                            '&::before': {
                                content: '"Cooling"',
                                background: theme.palette.blue[50],
                            },
                        },
                        '&.heating': {
                            '&::before': {
                                content: '"Heating"',
                                background: theme.palette.red[50],
                            },
                        },
                        '&.dehumidification': {
                            '&::before': {
                                content: '"Dehum."',
                                background: theme.palette.grey[150],
                            },
                        },
                    },

                    '& .details-content-cell': {
                        display: 'flex',
                        justifyContent: 'flex-start',
                        flexDirection: 'column',
                        margin: theme.spacing(1, 0),
                        padding: theme.spacing(0, 1.5),

                        '& .MuiTypography-caption': {
                            maxWidth: 85,
                        },
                    },
                },
                [theme.breakpoints.only('sm')]: {
                    flexDirection: 'row',
                    '& .details-content': {
                        flex: 'auto',
                        minHeight: 60,
                    },
                },
            },

            '& .MuiAccordionSummary-expandIcon': {
                marginRight: -4,
                '& .MuiSvgIcon-root': {
                    fill: theme.palette.grey[450],
                },
            },
        },
        '& .MuiTableCell-root': {
            [theme.breakpoints.down('sm')]: {
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
            },
        },
        '& .MuiTableCell-body': {
            padding: '0 12px',
            [theme.breakpoints.up('md')]: {
                borderBottom: `4px solid ${theme.palette.grey[50]}`,
                '&.cooling': {
                    borderColor: theme.palette.blue[50],
                },
                '&.heating': {
                    borderColor: theme.palette.red[50],
                },
                '&.dehumidification': {
                    borderColor: theme.palette.grey[150],
                },
            },
        },
        '& .MuiTypography-caption': {
            display: 'flex',
            fontSize: 10,
            lineHeight: '12px',
            letterSpacing: '0.05em',
            color: theme.palette.grey[550],
            margin: theme.spacing(0, 0, 0.5),
        },
    },
}))

const MyTable = ({ headRow, bodyRows, className }) => {
    const classes = useStyles()

    return (
        <TableContainer>
            <Table className={`${classes.table} ${className}`}>
                <Hidden smDown>
                    <TableHead>{headRow}</TableHead>
                </Hidden>
                <TableBody className={classes.tableBody}>{bodyRows}</TableBody>
            </Table>
        </TableContainer>
    )
}

MyTable.propTypes = {
    headRow: PropTypes.object,
    bodyRows: PropTypes.object,
    className: PropTypes.string,
}

export default MyTable
