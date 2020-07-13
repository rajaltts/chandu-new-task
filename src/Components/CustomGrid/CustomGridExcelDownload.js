import React from "react";
import ReactExport from "react-export-excel-fixed-xlsx";
import Button from '@material-ui/core/Button';

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;

const CustomGridExcelDownload = (props) => {
    const { rows, headCells, filename = 'Report.xlsx', excelSheetName, buttonElement = null, config } = props;
    return (
        <ExcelFile filename={filename} element={buttonElement || <Button variant="contained">Default</Button>}>
            <ExcelSheet data={rows} name={excelSheetName || filename}>
                {headCells.map((head) => {
                    const configItem = config[head.name] || {};
                    const lookUpKey = configItem.lookUpKey || head.name;                    
                    return <ExcelColumn label={head.name} value={lookUpKey}/>
                })}
            </ExcelSheet>
        </ExcelFile>
    );
}

export default CustomGridExcelDownload;

