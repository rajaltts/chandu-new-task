import React, { useState, useEffect } from "react";
import Table from "@material-ui/core/Table";
import Paper from "@material-ui/core/Paper";
import CircularProgress from '@material-ui/core/CircularProgress';
import LinearProgress from '@material-ui/core/LinearProgress';
import { sortingOrder } from '@carrier/workflowui-globalfunctions';
import CustomGridHead from './CustomGridHead';
import CustomGridPagination from './CustomGridPagination';
import CustomGridBody from './CustomGridBody';
import CustomGridSearch from './CustomGridSearch';
import './CustomGrid.css';
import translation from "../Translation";
import ColumnPicker from "./columnPicker/ColumnPicker";
import { getValueForDynamicKey } from './CustomGridUtils';

function CustomGrid(props) {
  const { ascending, descending } = sortingOrder;
  const { selectedRows = [], rows = [], headCells, rowsPerPageOptions, labelRowsPerPage, config = {}, showCheckbox, rowsToShowPerPage,
    sortable, orderByfield, uniqueKey, rowCheckboxHandler, rowOnclickHandler, hidePagination, hideSearch, onSearch, isLoading,
    gridClassName, singleSelectGrid = false, doNotTranslate = true, id = 'customGrid', sorting = ascending, gridStateHandler,
    pageNumber, stateLessGrid = false, totalPageCount = rows.length, showLinearProgress = false, clickOnRowHighlight = false,
    rowHighlightClassName = null, rowClassName = null, highlightedRowByDefault = {}, columnPicker = false, saveColumnHandler,
    maxColumnLimit, paginationClass
  } = props;

  const [order, setOrder] = useState(sorting);
  const [columnPickerFilterError, setColumnPickerFilterError] = useState("");
  const [orderBy, setOrderBy] = useState(orderByfield);
  const [selected, setSelected] = useState(selectedRows);
  const [page, setPage] = useState(pageNumber || 0);
  const [rowsPerPage, setRowsPerPage] = useState(rowsToShowPerPage);
  const [initialRowData, setInitialRowData] = useState(rows);
  const [searchText, setSearchText] = useState('');
  const [isAllPaginationSelected, setIsAllPaginationSelected] = useState(false);

  useEffect(()=> {
    if (!rowsPerPage || isAllPaginationSelected) {
      setRowsPerPage(rows.length);
    }
    if (!initialRowData.length && rows.length) {
      setInitialRowData(rows)
    }
  }, [rows, rowsPerPage, initialRowData]);

  useEffect(()=>{
    setSelected(selected.filter(item => rows.includes(item)))
  },[rows])
  
  useEffect(() => {
    if (stateLessGrid) {
      setRowsPerPage(rowsToShowPerPage);
      setOrderBy(orderByfield);
      setPage(pageNumber);
      setOrder(sorting);
    }
  }, [rowsToShowPerPage, pageNumber, orderByfield, sorting])

  useEffect(()=>{
    gridStateHandler && gridStateHandler({order, orderBy, rowsPerPage, page})
  },[order, orderBy, rowsPerPage, page])

  useEffect(() => {
    (pageNumber >= 0) && handleChangePage(pageNumber);
  },[pageNumber])

  useEffect(() => {
    if (order !== sorting) {
      setOrder(sorting);
    }
  },[sorting])

  const getCurrentPageRecord = (records) => {
    return records.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
  }

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === ascending;
    setOrder(isAsc ? descending : ascending);
    setOrderBy(property);
  };

  const handleSelectAllClick = ({ target: { checked }}) => {
    if (checked) {
      setSelected(sortedRows);
      rowCheckboxHandler && rowCheckboxHandler(sortedRows);
    }
    else {
      setSelected([]);
      rowCheckboxHandler && rowCheckboxHandler([]);
    }
  };

  const handleClick = ({ target: { checked }}, row, index, type) => {
    if (type) {
      handleSingleSelectClick(row);
    }
    else {
      handleMultiSelectClick(checked, row, index);
    }
  };

  const handleSingleSelectClick = (row) => {
    setSelected([row]);
    if (rowCheckboxHandler) {
      rowCheckboxHandler([row]);
    }
  };

  const handleSelectOnClick = (event) => {
    if(rowOnclickHandler){
      event.stopPropagation();
    }
  }

  const handleMultiSelectClick = (checked, row, index) => {
    let newSelected = [...selected];
    if (checked) {
      newSelected.push(row);
      setSelected(newSelected);
    }
    else {
      let selectedIndex = -1;
      newSelected.some((item, index) => {
        if (item[uniqueKey] === row[uniqueKey]) {
          selectedIndex = index;
          return true;
        }
        return false;
      });
      newSelected.splice(selectedIndex, 1)
      setSelected([...newSelected]);
    }

    if (rowCheckboxHandler) {
      rowCheckboxHandler(newSelected);
    }
  };

  const handleChangePage = (newPage) => {
    setPage(newPage);
    handleSelectAllClick({target: {checked: false}})
  };

  const handleChangeRowsPerPage = ({ target: { value }}) => {
    if (typeof value === 'string' && value.toLowerCase() === 'all') {
      value = rows.length;
      !isAllPaginationSelected && setIsAllPaginationSelected(true)
    }
    else {
      isAllPaginationSelected && setIsAllPaginationSelected(false)
    }
    setRowsPerPage(parseInt(value, 10));
    setPage(0);
    handleSelectAllClick({target: {checked: false}})
  };

  const onSearchHandler = (event) => {
    const value = event.target.value;
    onSearch && onSearch(event);
    setSearchText(value);
  }

  const isSelected = (row) => {
    return selected.some((item) => item[uniqueKey] === row[uniqueKey]);
  }

  const getRowLength = () => {
    return stateLessGrid ? totalPageCount : rows.length
  }

  const saveColumnPickerFilterError = (errorMessage) => setColumnPickerFilterError(errorMessage);

  const sliceRecords = (records) => {
    if (!stateLessGrid) {
      return getCurrentPageRecord(records)
    }
    return records;
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

  const getComparator = (order, orderBy) => {
    if (order === sortingOrder.descending) {
      return (a, b) => descendingComparator(a, b, orderBy)
    }
    else {
      return (a, b) => -descendingComparator(a, b, orderBy);
    }
  }

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

  const sortedRows = sliceRecords(stableSort(rows, getComparator(order, orderBy)));

  return (
    <div id={id} className="customGrid">
      {!hideSearch && <CustomGridSearch onSearch={onSearchHandler}/>}
      <div id={`${id}_root`} className={`root ${gridClassName || ''}`}>
        <Paper className='paper'>
          {columnPicker &&
            <ColumnPicker
              headCells={headCells}
              saveColumnHandler={saveColumnHandler}
              maxColumnLimit={maxColumnLimit || headCells.length}
              saveColumnPickerFilterError={saveColumnPickerFilterError}
              columnPickerFilterError={columnPickerFilterError}
            />
          }
          {showLinearProgress && <LinearProgress />}
          <div id={`${id}_table`}className={'tableWrapper'}>
            <Table stickyHeader className='table' size={"medium"} >
              <CustomGridHead
                headCells={headCells}
                columnPicker={columnPicker}
                order={order}
                orderBy={orderBy}
                sortable={sortable}
                numSelected={selected.length}
                rowCount={sortedRows.length}
                showCheckbox={showCheckbox}
                singleSelectGrid={singleSelectGrid}
                onSelectAllClick={handleSelectAllClick}
                onRequestSort={handleRequestSort}
                doNotTranslate={doNotTranslate}
                columnPickerFilterError={columnPickerFilterError}
              />
              {!!(getRowLength()) &&
                <CustomGridBody
                  isLoading={isLoading}
                  gridClassName={gridClassName}
                  headCells={headCells}
                  columnPicker={columnPicker}
                  showCheckbox={showCheckbox}
                  rows={sortedRows}
                  rowOnclickHandler={rowOnclickHandler}
                  isSelected={isSelected}
                  handleClick={handleClick}
                  handleSelectOnClick={handleSelectOnClick}
                  selectionType={singleSelectGrid}
                  config={config}
                  doNotTranslate={doNotTranslate}
                  uniqueKey={uniqueKey}
                  clickOnRowHighlight={clickOnRowHighlight}
                  rowHighlightClassName={rowHighlightClassName}
                  rowClassName={rowClassName}
                  highlightedRowByDefault={highlightedRowByDefault}
                  columnPickerFilterError={columnPickerFilterError}
                />
              }
            </Table>
            {!(getRowLength()) &&
            <div className={`messageContainer${!gridClassName ? ' messageContainerDefaultHeight' : ''}`}>
              {(isLoading) ?
                <CircularProgress />
                :
                <div id={`${id}NoRecodsFound`}>
                  {doNotTranslate ? "No records found" : translation("NoRecordsAvailable")}
                </div>
              }
            </div>
          }
          </div>
         
          {!hidePagination &&
            <CustomGridPagination
              labelRowsPerPage={labelRowsPerPage}
              rowsPerPageOptions={rowsPerPageOptions}
              isAllPaginationSelected={isAllPaginationSelected}
              component="div"
              rowsLength={getRowLength()}
              rowsPerPage={rowsPerPage}
              page={page}
              searchText={searchText}
              initialRowData={initialRowData}
              handleChangePage={handleChangePage}
              handleChangeRowsPerPage={handleChangeRowsPerPage}
              doNotTranslate={doNotTranslate}
              paginationClass={paginationClass}
            />
          }
        </Paper>
      </div>
    </div>
  );
}

export default CustomGrid;