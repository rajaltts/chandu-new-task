import React from "react";
import translation from "../Translation";
import Pagination from '@material-ui/lab/Pagination';
import classnames from 'classnames';

const CustomGridPagination = (props) => {
  const { rowsLength, labelRowsPerPage, rowsPerPage, handleChangeRowsPerPage, searchText, initialRowData,
          rowsPerPageOptions = [5, 10, 25, 50, 100, 'All'], handleChangePage, page, doNotTranslate,
          isAllPaginationSelected, paginationClass } = props;
  const chipCountValue = Math.ceil(rowsLength / rowsPerPage);
  const chipsCount = isNaN(chipCountValue) ? 0 : chipCountValue;
  
  const createhandleChangeRowsPerPage = event => {
    handleChangeRowsPerPage(event);
  };

  const handleBackButtonClick = () => {
    handleChangePage(page - 1);
  };

  const handleNextButtonClick = () => {
    handleChangePage(page + 1);
  };

  const handleFirstButtonClick = () => {
    handleChangePage(0);
  };

  const handleLastNextButtonClick = () => {
    handleChangePage((chipsCount-1));
  };

  const showRowsSelectionOptions = () => {
    let isSelected = false;
    return rowsPerPageOptions.map((rowsCount, index) => {
      if (rowsCount === rowsPerPage && !isAllPaginationSelected) {
        isSelected = true;
        return <option key={index} selected>{rowsCount}</option>;
      }
      else if (!isSelected && typeof rowsCount === 'string' && rowsCount.toLowerCase() === 'all') {
        isSelected = true;
        return <option key={index} selected>{rowsCount}</option>;
      }
      return <option key={index}>{rowsCount}</option>;
    });
  }

  const handleChange = (event, value) => {
    handleChangePage(value - 1)
  };

  return (
    <div className={classnames(paginationClass, "footerContainer")}>
      <div className="footerPagerContainer">
        <div className="footerItemContainer">
          <Pagination count={chipsCount} page={page + 1} onChange={handleChange}/>
        </div>
        <div className="footerLastItemContainer">
          {doNotTranslate ? "rows per page :" : translation("Rowsperpage")}
          <select className="footerSelect" onChange={createhandleChangeRowsPerPage}>
            {showRowsSelectionOptions()}
          </select>
        </div>
      </div>
    </div>
  );
}

export default CustomGridPagination;