import React, { useState } from "react";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import Checkbox from "@material-ui/core/Checkbox";
import Radio from '@material-ui/core/Radio';
import { sortingOrder } from '@carrier/workflowui-globalfunctions';
import FormBuilderField from "../formBuilder/FormBuilderField";
import isPlainObject from 'lodash/isPlainObject';
import classNames from 'classnames'
import './CustomGrid.css';

function CustomGridBody(props) {
    const { rows, order, orderBy, page, rowsPerPage, config, headCells, showCheckbox, selectionType=false, isSelected,
      handleClick, handleSelectOnClick, rowOnclickHandler, doNotTranslate, stateLessGrid, uniqueKey, clickOnRowHighlight,
      rowHighlightClassName, rowClassName, highlightedRowByDefault } = props;
      let timer;

    const [clickedRow, setClickedRow] = useState(highlightedRowByDefault);

    const descendingComparator = (a, b, orderBy) => {
      const orderByKey = (config[orderBy] && config[orderBy].lookUpKey) || orderBy;
      const aValue = getValueForDynamicKey(a, orderByKey);
      const bValue = getValueForDynamicKey(b, orderByKey);
      const firstArg = (typeof aValue === 'string') ? aValue.toLowerCase() : aValue;
      const secondArg = (typeof bValue === 'string') ? bValue.toLowerCase() : bValue;
      if (secondArg < firstArg) {
        return -1;
      }
      if (secondArg > firstArg) {
        return 1;
      }
      return 0;
    }
      
    const getComparator = (order, orderBy) => {
      if (order === sortingOrder.descending) {
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
        onClick: (event) => handleSelectOnClick(event),
        inputProps: { 'aria-label': 'select this row' }
      };
      return (
        <TableCell padding="checkbox">
          {(type) ? <Radio {...selectionProps} /> : <Checkbox {...selectionProps} />}
        </TableCell>
      );
    }

    /****
     ** This Function is using to get the value from an object for a dynamic key
     ** Key can be used for nested object as well
     ** key/lookup hierarchy can be created as '-' operator
     ** Conditional key also can be used with the help of ':' operator
     ** RowData example const obj = {one: "One", two: {three : "Three"}, four: "Four"}
     ** if you pass lookUpKey as 'one' you will get output as "One"
     ** if you pass lookUpKey as 'two-three' you will get output as "Three"
     ** if you pass lookUpKey as 'two-three:four' you will get still get output as "Three"
     ** if you pass lookUpKey as 'two-five:four' you will get still get output as "Four"
     ****/
    const getValueForDynamicKey = (rowData = {}, lookUpKey) => {
      const value = ''
      if (!lookUpKey) return value;
      
      const lookUpKeyList = lookUpKey.split(':');
      for(let i=0; i < lookUpKeyList.length; i++) {
        const keysList = lookUpKeyList[i].split('-');
        let val = rowData;
        for(let j=0; j < keysList.length; j++) {
          const element = keysList[j]
          if (val.hasOwnProperty(element)) {
            val = val[element];
            if (!isPlainObject(val)) {
              return val;
            }
          } else {
            break;
          }
        }
      }
      return value;
    }

    const handleOnClick = (row, index, event) => {
      clickOnRowHighlight && setClickedRow(row);
      clearTimeout(timer);
      if (event.detail === 1 && rowOnclickHandler) {
        timer = setTimeout(() => rowOnclickHandler(row, index, event), 300);
      }
    }

    const sliceRecords = (records) => {
      if (!stateLessGrid) {
        return records.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)  
      }
      return records;
    }

    return (
      <TableBody>
        {sliceRecords(stableSort(rows, getComparator(order, orderBy)))
          .map((row, index) => {
            const isItemSelected = isSelected(row);
            const rowHighlight = (clickOnRowHighlight && uniqueKey && row[uniqueKey] === clickedRow[uniqueKey]);
            return (
              <TableRow
                role="checkbox"
                aria-checked={isItemSelected}
                tabIndex={-1}
                key={index}
                className={classNames(rowHighlight ? rowHighlightClassName || "rowHighlight" : '', rowClassName)}
                onClick={(event) => handleOnClick(row, index, event)}
              >
                {(showCheckbox) && showSelectionCell(isItemSelected, row, index, selectionType)}
                {headCells.map((head) => {
                      const configItem = config[head.name] || {};
                      const lookUpKey = configItem.lookUpKey || head.name;
                      return (
                        <TableCell align={row.textAlign || "left"} className={row.className || ""}>
                          <FormBuilderField
                            doNotTranslate={doNotTranslate}
                            rowData={row}
                            rowIndex={index}
                            config={configItem}
                            value={getValueForDynamicKey(row, lookUpKey)}/>
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