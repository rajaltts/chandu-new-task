import React, { useState, useRef } from "react";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import Checkbox from "@material-ui/core/Checkbox";
import Radio from '@material-ui/core/Radio';
import FormBuilderField from "../formBuilder/FormBuilderField";
import classNames from 'classnames'
import { getValueForDynamicKey } from './CustomGridUtils';
import './CustomGrid.css';

function CustomGridBody(props) {
  const { rows, config, headCells, showCheckbox, selectionType = false, isSelected, editMode, handleEditModeSelectionHandler,
    handleClick, handleSelectOnClick, rowOnclickHandler, doNotTranslate, uniqueKey, clickOnRowHighlight, showDivider,
    rowHighlightClassName, rowClassName, highlightedRowByDefault, columnPicker, columnPickerFilterError } = props;
  let timer;
  const { enable: editModeEnabled = false, editModeRowHighlight = false } = editMode
  const [clickedRow, setClickedRow] = useState(highlightedRowByDefault);
  const [enableRowClick, setEnableRowClick] = useState(true);
  const defaultEventData = {
    keyCode: null,
    ctrlKey: null,
    button: null,
  }
  const eventData = useRef(defaultEventData);

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

  const handleOnClick = (row, index, event) => {
    clickOnRowHighlight && setClickedRow(row);
    clearTimeout(timer);
    if (event.detail === 1) {
      if (editModeEnabled) {
        eventData.current.ctrlKey = event.ctrlKey
        eventData.current.button = event.button
      }
      timer = setTimeout(() => {
        enableRowClick && rowOnclickHandler && rowOnclickHandler(row, index, event)
        if (editModeEnabled) {
          const { ctrlKey, button, keyCode } = eventData.current 
          if (ctrlKey && button === 0 && keyCode === 17) {
            handleEditModeSelectionHandler(row, index)
          }
          else {
            handleEditModeSelectionHandler([], 0, true)
          }
        }
      }, 300);
    }
  }

  const keyCodeHandler = (event) => {
    editModeEnabled && (eventData.current.keyCode = event.keyCode)
  }

  return (
    <TableBody>
      {rows.map((row, index) => {
        const isItemSelected = isSelected(row);
        const rowHighlight = (clickOnRowHighlight && uniqueKey && row[uniqueKey] === clickedRow[uniqueKey]);
        return (
          <>
            <TableRow
              role="checkbox"
              aria-checked={isItemSelected}
              tabIndex={-1}
              key={index}
              className={classNames((editModeEnabled && editModeRowHighlight && isItemSelected) ? "editModeRowHighlight" : "", rowHighlight ? rowHighlightClassName || "rowHighlight" : '', rowClassName)}
              onClick={(event) => handleOnClick(row, index, event)}
              onKeyDown={keyCodeHandler}
            >
              {(showCheckbox && !columnPickerFilterError) && showSelectionCell(isItemSelected, row, index, selectionType)}
              {headCells.map((head) => {
                const configItem = config[head.name] || {};
                const lookUpKey = configItem.lookUpKey || head.name;
                const isHeaderSelectedForDisplay = (columnPicker) ? ((head.isSelected && !columnPickerFilterError) || false) : true;
                return (
                  isHeaderSelectedForDisplay ?
                    <TableCell key={head.name} align={row.textAlign || 'left'} className={row.className || configItem.cellClassName || ''}>
                      <FormBuilderField
                        doNotTranslate={doNotTranslate}
                        rowData={row}
                        rowIndex={index}
                        config={configItem}
                        value={getValueForDynamicKey(row, lookUpKey)}
                        setEnableRowClick={setEnableRowClick}
                      />
                    </TableCell>
                    :
                    null
                )
              })}
            </TableRow>
            {showDivider ? <div className="customGridTdDivider"/> : null}
          </>
        );
      })}
    </TableBody>
  );
}

export default CustomGridBody;