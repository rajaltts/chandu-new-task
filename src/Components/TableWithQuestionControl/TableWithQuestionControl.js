import React from 'react';
import {
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableRow, 
  Paper, 
  withStyles, 
  makeStyles 
} from '@material-ui/core';
import { SimpleRadioButtonGroup } from '@carrier/ngecat-reactcomponents';
import {GetProp} from '@carrier/workflowui-globalfunctions';

const StyledTableCell = withStyles(theme => ({
  head: {
    backgroundColor: "#091d64",
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles(theme => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.background.default,
    },
  },
}))(TableRow);

const useStyles = makeStyles({
  root: {
    width: '100%',
    overflowX: 'auto',
  },
  table: {
    minWidth: 700,
  },
  tableWrapper: {
    maxHeight: 440,
    overflow: 'auto',
  },
});

function TableWithQuestionControl(props) {
  const classes = useStyles();

  function GetProperty(PropName){
    return GetProp(PropName, props.RulesJSON)
  }
  
  function RenderTableBody() {
    return props.PropNames.map((PropName, idx) => {
      let VisibleProp = GetProperty(PropName+".VISIBLE");
      let prop = GetProperty(PropName);
      let Visible = null;
      if (VisibleProp) 
          Visible = VisibleProp.Value
      
      if(Visible === "TRUE") { 
        return <StyledTableRow key={idx} data-propname={PropName}>
          <StyledTableCell align="left">
            <div className="customVerticalRadio">
              <SimpleRadioButtonGroup
                PropName={PropName}
                RulesJSON={props.RulesJSON}
                onValueChanged={props.onNewAssignment}
                vertical={false}
              />
            </div>
          </StyledTableCell>
          <StyledTableCell align="left">
            {RenderTableCell(prop, "Question", null)}
          </StyledTableCell>
          <StyledTableCell align="left">
            {RenderTableCell(prop, null, "Reference")}
          </StyledTableCell>
        </StyledTableRow>
      } else
        return null
    })
  }

  function RenderTableCell(prop, Question, Reference) {
    return (<>
        {prop ? prop.Values.map((value, index) => {
            return <span key={index}>{value.Attributes[Question ? Question : Reference]}</span>
        }) : null}
        </>
    )
  }

  return (<Paper className="root" style={{ margin: "10px" }} id="ctrlQuestionaireTable">
    <div className={classes.tableWrapper}>
      <Table className="table" aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell component="th" align="left">Yes/No</StyledTableCell>
            <StyledTableCell component="th" align="left">Questions</StyledTableCell>
            <StyledTableCell component="th" align="left">Reference#</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {RenderTableBody()}
        </TableBody>
      </Table>
    </div>
  </Paper>)
}



export default TableWithQuestionControl;