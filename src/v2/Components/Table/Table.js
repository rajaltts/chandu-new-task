import React from 'react'
import PropTypes from 'prop-types'
import Hidden from '@material-ui/core/Hidden'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
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
