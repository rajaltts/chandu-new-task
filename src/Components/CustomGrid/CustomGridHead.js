import React from "react";
import TableHead from "@material-ui/core/TableHead";
import TableSortLabel from "@material-ui/core/TableSortLabel";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import Checkbox from '@material-ui/core/Checkbox';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import './CustomGrid.css';

const CustomGridHead = (props) => {
    const { order, orderBy, onRequestSort, headCells, sortable, onSelectAllClick, showCheckbox, singleSelectGrid, rowCount, numSelected } = props;

    const createSortHandler = property => event => {
      onRequestSort(event, property);
    };

    const showHeader = (cell) => {
      return (
        <div className="headerColumn">
            <span>
              {cell.displayName || cell.name}
              {cell.showCheckbox &&
                <Checkbox
                  id={`${cell.name}_checkbox`}
                  color='primary'
                  onChange={(event) => {cell.onChange && cell.onChange(event.target.checked, cell)}}
                  inputProps={{ 'aria-label': 'select this column' }}
                />
              }
            </span>
            <span className="headerColumnSubTitle" >{cell.subHeader}</span>
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
          {headCellsData.map((cell) => (
            <TableCell
              key={cell.name}
              align={"left"}
              padding={"default"}
              sortDirection={orderBy === cell.name ? order : false}
              IconComponent={false}
              className={cell.className}
            >
                {(sortable && !cell.disableSorting) ?
                  <TableSortLabel
                      active={orderBy === cell.name}
                      direction={orderBy === cell.name ? order : "asc"}
                      onClick={createSortHandler(cell.name)}
                      IconComponent={ArrowDropDownIcon}
                  >
                    {showHeader(cell)}
                    
                    {(orderBy === cell.name) ?
                      <span className='visuallyHidden'>
                          {order === "desc" ? "sorted descending" : "sorted ascending"}
                      </span>
                      :
                      null
                    }
                  </TableSortLabel>
                  :
                  <TableSortLabel
                      active={false}
                      direction={orderBy === cell.name ? order : "asc"}
                      onClick={null}
                      hideSortIcon
                  >
                    {showHeader(cell)}
                  </TableSortLabel>
                }              
            </TableCell>
          ))}
        </TableRow>
      </TableHead>
    );
  }

export default CustomGridHead;