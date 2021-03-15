import React from "react";
import IconButton from '@material-ui/core/IconButton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretRight, faCaretLeft, faStepForward, faStepBackward } from '@fortawesome/free-solid-svg-icons';
import translation from "../Translation";

const CustomGridPagination = (props) => {
  const { rowsLength, labelRowsPerPage, rowsPerPage, handleChangeRowsPerPage, searchText, initialRowData,
          rowsPerPageOptions = [5, 10, 25, 50, 100, 'All'], handleChangePage, page, doNotTranslate,
          isAllPaginationSelected } = props;
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

  const labelDisplayedRows = ({ from, to }) => {
    let displayItem = "";
    if(searchText.trim()) {
      displayItem = doNotTranslate ? `(filtered from ${initialRowData.length} total entries)` : translation("FilteredEntries", "items", {Count: initialRowData.length});
    } else {
      displayItem = doNotTranslate ? "Items" : translation("Items", "Items");
    }
    return doNotTranslate ? `Displaying  ${from}-${to === -1 ? rowsLength : to} of ${rowsLength} ${displayItem}` : translation("DisplayingItems", "Displaying", {From: from, To: to, Length: rowsLength, Display: displayItem});
  };

  const showRowsSelectionOptions = () => {
    let isSelected = false;
    return rowsPerPageOptions.map(rowsCount => {
      if (rowsCount === rowsPerPage && !isAllPaginationSelected) {
        isSelected = true;
        return <option selected>{rowsCount}</option>;
      }
      else if (!isSelected && typeof rowsCount === 'string' && rowsCount.toLowerCase() === 'all') {
        isSelected = true;
        return <option selected>{rowsCount}</option>;
      }
      return <option>{rowsCount}</option>;
    });
  }

  return (
    <div className="footerContainer">
      <div className="footerPagerContainer">
        <span>{doNotTranslate ? "Show" : translation("Show")}</span>
        <select className="footerSelect" onChange={createhandleChangeRowsPerPage}>
          {showRowsSelectionOptions()}
        </select>
        {doNotTranslate ? "rows per page" : translation("Rowsperpage")}
        <div className="footerItemsButton">
          {labelDisplayedRows({
            from: (rowsLength === 0) ? 0 : (page * rowsPerPage + 1),
            to: (rowsLength !== -1) ? (Math.min(rowsLength, (page + 1) * rowsPerPage)) : ((page + 1) * rowsPerPage)
          })}
        </div>
        <IconButton
          onClick={handleFirstButtonClick}
          disabled={page === 0}
          color="inherit"
          title='First'
        >
          <FontAwesomeIcon icon={faStepBackward} className="footerLastFirst"/>
        </IconButton>
        <IconButton
          onClick={handleBackButtonClick}
          disabled={page === 0}
          color="inherit"
          title='Previous'
        >
          <FontAwesomeIcon icon={faCaretLeft} className="footerForwardBackward"/>
        </IconButton>
        <IconButton
          onClick={handleNextButtonClick}
          disabled={(rowsLength !== -1) ? (page >= (chipsCount-1)) : false}
          color="inherit"
          title='Next'
        >
          <FontAwesomeIcon icon={faCaretRight} className="footerForwardBackward"/>
        </IconButton>
        <IconButton
          onClick={handleLastNextButtonClick}
          disabled={(rowsLength !== -1) ? (page >= (chipsCount-1)) : false}
          color="inherit"
          title='Last'
        >
          <FontAwesomeIcon icon={faStepForward} className="footerLastFirst"/>
        </IconButton>
      </div>
    </div>
  );
}

export default CustomGridPagination;