import React from 'react'
import PropTypes from 'prop-types'
import { Hidden, Table, TableHead, TableBody, TableContainer } from '@material-ui/core'
import useStyles from './Table.styles'

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
