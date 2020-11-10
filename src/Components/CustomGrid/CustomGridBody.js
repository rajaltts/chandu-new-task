import React from "react";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import Checkbox from "@material-ui/core/Checkbox";
import Radio from '@material-ui/core/Radio';
import FormBuilderField from "../formBuilder/FormBuilderField";

function CustomGridBody(props) {
    const { rows, order, orderBy, page, rowsPerPage, config, headCells, showCheckbox, selectionType=false, isSelected, handleClick } = props;

    const descendingComparator = (a, b, orderBy) => {
      const orderByKey = (config[orderBy] && config[orderBy].lookUpKey) || orderBy;
      const firstArg = (typeof a[orderByKey] === 'string') ? a[orderByKey].toLowerCase() : a[orderByKey];
      const secondArg = (typeof b[orderByKey] === 'string') ? b[orderByKey].toLowerCase() : b[orderByKey];
      if (secondArg < firstArg) {
        return -1;
      }
      if (secondArg > firstArg) {
        return 1;
      }
      return 0;
    }
      
    const getComparator = (order, orderBy) => {
      if (order === "desc") {
        return (a, b) => descendingComparator(a, b, orderBy)
      }
      else {
        return (a, b) => -descendingComparator(a, b, orderBy);
      }
    }
    
    const stableSort = (array, comparator) => {
      const stabilizedThis = array.map((el, index) => [el, index]);
      stabilizedThis.sort((a, b) => {
          const order = comparator(a[0], b[0]);
          if (order !== 0) return order;
          return a[1] - b[1];
      });
      return stabilizedThis.map(el => el[0]);
    }

    const showSelectionCell = (isItemSelected, row, index, type) => {
      const selectionProps = {
        id: `customGridRow${index}_checkbox`,
        color: 'primary',
        checked: isItemSelected,
        onChange: (event) => handleClick(event, row, index, type),
        inputProps: { 'aria-label': 'select this row' }
      };
      return (
        <TableCell padding="checkbox">
          {(type) ? <Radio {...selectionProps} /> : <Checkbox {...selectionProps} />}
        </TableCell>
      );
    }

    return (
      <TableBody>
        {stableSort(rows, getComparator(order, orderBy))
          .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
          .map((row, index) => {
            const isItemSelected = isSelected(row);
            return (
              <TableRow
                role="checkbox"
                aria-checked={isItemSelected}
                tabIndex={-1}
                key={index}
                selected={isItemSelected}
              >
                {(showCheckbox) && showSelectionCell(isItemSelected, row, index, selectionType)}
                {headCells.map((head) => {
                      const configItem = config[head.name] || {};
                      const lookUpKey = configItem.lookUpKey || head.name;
                      return (
                        <TableCell align="left" className={row.className || ""}>
                          <FormBuilderField rowData={row} rowIndex={index} config={configItem} value={row[lookUpKey]}/>
                        </TableCell>
                      );
                })}
              </TableRow>
            );
        })}
      </TableBody>
    );
  }

export default CustomGridBody;