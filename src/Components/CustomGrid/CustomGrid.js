import React, { useState, useEffect } from "react";
import Table from "@material-ui/core/Table";
import Paper from "@material-ui/core/Paper";
import CircularProgress from '@material-ui/core/CircularProgress';
import { sortingOrder } from '@carrier/workflowui-globalfunctions';
import CustomGridHead from './CustomGridHead';
import CustomGridPagination from './CustomGridPagination';
import CustomGridBody from './CustomGridBody';
import CustomGridSearch from './CustomGridSearch';
import './CustomGrid.css';
import translation from "../Translation";

function CustomGrid(props) {
  const { ascending, descending } = sortingOrder;
  const { selectedRows=[], rows=[], headCells, rowsPerPageOptions, labelRowsPerPage, config = {}, showCheckbox, rowsToShowPerPage,
          sortable, orderByfield, uniqueKey, rowCheckboxHandler, rowOnclickHandler, hidePagination, hideSearch, onSearch, isLoading,
          gridClassName, singleSelectGrid=false, doNotTranslate=true, id='customGrid', sorting=ascending } = props;

  const [order, setOrder] = useState(sorting);
  const [orderBy, setOrderBy] = useState(orderByfield);
  const [selected, setSelected] = useState(selectedRows);
  const [page, setPage] = useState(0);
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
    if (order !== sorting) {
      setOrder(sorting);
    }
  },[sorting])

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === ascending;
    setOrder(isAsc ? descending : ascending);
    setOrderBy(property);
  };

  const handleSelectAllClick = ({ target: { checked }}) => {
    if (checked) {
      setSelected(rows);
      rowCheckboxHandler && rowCheckboxHandler(rows);
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
      event.preventDefault();
      event.stopPropagation();
      return false;
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
  };

  const onSearchHandler = (event) => {
    const value = event.target.value;
    onSearch && onSearch(event);
    setSearchText(value);
  }

  const isSelected = (row) => {
    return selected.some((item) => item[uniqueKey] === row[uniqueKey]);
  }

  return (
    <div id={id} className="customGrid">
      {!hideSearch && <CustomGridSearch onSearch={onSearchHandler}/>}
      <div id={`${id}_root`} className={`root ${gridClassName || ''}`}>
        <Paper className='paper'>
          <div id={`${id}_table`}className={'tableWrapper'}>
            <Table stickyHeader className='table' size={"medium"} >
              <CustomGridHead
                headCells={headCells}
                order={order}
                orderBy={orderBy}
                sortable={sortable}
                numSelected={selected.length}
                rowCount={rows.length}
                showCheckbox={showCheckbox}
                singleSelectGrid={singleSelectGrid}
                onSelectAllClick={handleSelectAllClick}
                onRequestSort={handleRequestSort}
                doNotTranslate={doNotTranslate}
              />
              {!!rows.length &&
                <CustomGridBody
                  isLoading={isLoading}
                  gridClassName={gridClassName}
                  headCells={headCells}
                  showCheckbox={showCheckbox}
                  rows={rows}
                  order={order}
                  orderBy={orderBy}
                  page={page}
                  rowsPerPage={rowsPerPage}
                  rowOnclickHandler={rowOnclickHandler}
                  isSelected={isSelected}
                  handleClick={handleClick}
                  handleSelectOnClick={handleSelectOnClick}
                  selectionType={singleSelectGrid}
                  config={config}
                  doNotTranslate={doNotTranslate}
                />
              }
            </Table>
            {!rows.length &&
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
              rowsLength={rows.length}
              rowsPerPage={rowsPerPage}
              page={page}
              searchText={searchText}
              initialRowData={initialRowData}
              handleChangePage={handleChangePage}
              handleChangeRowsPerPage={handleChangeRowsPerPage}
              doNotTranslate={doNotTranslate}
            />
          }
        </Paper>
      </div>
    </div>
  );
}

export default CustomGrid;