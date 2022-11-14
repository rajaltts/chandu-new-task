//React
import React from 'react'

//Material UI
import { Table, TableBody, TableContainer, TableHead, TableRow, Box, Paper, LinearProgress } from '@material-ui/core'

import ShowAcousticsCalculationData from './ShowAcousticsCalculationData'

import { isEmptyObject } from '@carrier/workflowui-globalfunctions'

const CalculatedOutput = ({
    isCalculatedAdvancedAcousticsAreaVisible,
    classes,
    StyledTableCell,
    StyledTableRow,
    calcData,
    allMappedData,
    calc,
}) => {
    return (
        <>
            <Box className={classes.tableBoxContainer}>
                <TableContainer component={Paper}>
                    {isCalculatedAdvancedAcousticsAreaVisible ? (
                        isEmptyObject(calcData) ? (
                            <LinearProgress />
                        ) : null
                    ) : null}
                    <Table className={classes.table} size='small' aria-label='Advanced Acoustics Table'>
                        <TableHead>
                            <TableRow>
                                <StyledTableCell>Octave Band Center Frequency, Hz</StyledTableCell>
                                <StyledTableCell align='right'>63</StyledTableCell>
                                <StyledTableCell align='right'>125</StyledTableCell>
                                <StyledTableCell align='right'>250</StyledTableCell>
                                <StyledTableCell align='right'>500</StyledTableCell>
                                <StyledTableCell align='right'>1000</StyledTableCell>
                                <StyledTableCell align='right'>2000</StyledTableCell>
                                <StyledTableCell align='right'>4000</StyledTableCell>
                                <StyledTableCell align='right'>8000</StyledTableCell>
                                <StyledTableCell align='right'>Overall</StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {isCalculatedAdvancedAcousticsAreaVisible ? (
                                <ShowAcousticsCalculationData
                                    StyledTableCell={StyledTableCell}
                                    StyledTableRow={StyledTableRow}
                                    calcData={calcData}
                                    allMappedData={allMappedData}
                                    calc={calc}
                                />
                            ) : null}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>
        </>
    )
}

export default CalculatedOutput
