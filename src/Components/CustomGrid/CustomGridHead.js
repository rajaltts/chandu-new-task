import React from "react";
import TableHead from "@material-ui/core/TableHead";
import TableSortLabel from "@material-ui/core/TableSortLabel";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import Checkbox from '@material-ui/core/Checkbox';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import { sortingOrder } from '@carrier/workflowui-globalfunctions';
import './CustomGrid.css';

const CustomGridHead = (props) => {
    const { ascending, descending } = sortingOrder;
    const { order, orderBy, onRequestSort, headCells, sortable, onSelectAllClick, showCheckbox, singleSelectGrid, rowCount, numSelected } = props;

    const createSortHandler = property => event => {
      onRequestSort(event, property);
    };

    const showHeader = (cell) => {
      const { displayName, name, subHeader, showCheckbox} = cell
      return (
        <div className="headerColumn">
            <span>
              {displayName || name}
              {showCheckbox &&
                <Checkbox
                  id={`${name}_checkbox`}
                  color='primary'
                  onChange={(event) => {cell.onChange && cell.onChange(event.target.checked, cell)}}
                  inputProps={{ 'aria-label': 'select this column' }}
                />
              }
            </span>
            {subHeader && <span className="headerColumnSubTitle" >{subHeader}</span>}
        </div>
      );
    }

    const showCheckboxCell = (singleSelectGrid) => {
      return (
        <TableCell padding="checkbox">
          { (!singleSelectGrid) && 
            <Checkbox
              id="selectAllRowsCustomGrid"
              color='primary'
              checked={rowCount > 0 && numSelected === rowCount}
              onChange={onSelectAllClick}
              inputProps={{ 'aria-label': 'select all rows' }}
            />
          }
        </TableCell>
      );
    }
  
    const headCellsData = headCells.length ? headCells : [{name: ''}];
    return (
      <TableHead className="tableHead">
        <TableRow>
          {showCheckbox && showCheckboxCell(singleSelectGrid)}
          {headCellsData.map((cell) => {
            const { name, disableSorting, className, textAlign } = cell
            return (
              <TableCell
                key={name}
                align={textAlign || "left"}
                padding={"default"}
                sortDirection={orderBy === name ? order : false}
                IconComponent={false}
                className={className}
              >
                  {(sortable && !disableSorting) ?
                    <TableSortLabel
                        active={orderBy === name}
                        direction={orderBy === name ? order : ascending}
                        onClick={createSortHandler(name)}
                        IconComponent={ArrowDropDownIcon}
                    >
                      {showHeader(cell)}
                      
                      {(orderBy === name) ?
                        <span className='visuallyHidden'>
                            {order === descending ? "sorted descending" : "sorted ascending"}
                        </span>
                        :
                        null
                      }
                    </TableSortLabel>
                    :
                    <TableSortLabel
                        active={false}
                        direction={orderBy === name ? order : ascending}
                        onClick={null}
                        hideSortIcon
                        className="defaultCursor"
                    >
                      {showHeader(cell)}
                    </TableSortLabel>
                  }
              </TableCell>
            )}
          )}
        </TableRow>
      </TableHead>
    );
  }

export default CustomGridHead;