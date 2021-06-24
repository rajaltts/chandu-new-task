import React, { memo } from 'react';
import { injectIntlTranslation } from '@carrier/workflowui-globalfunctions';
import ConfirmModal from '../../ConfirmModal/ConfirmModal';
import { injectIntl } from "react-intl";
import { faSave } from '@fortawesome/free-solid-svg-icons';
import Typography from '@material-ui/core/Typography';
import ReplayIcon from '@material-ui/icons/Replay';
import columnPickerStyles from './ColumnPickerStyles';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from "@material-ui/core/Checkbox";
import List from '@material-ui/core/List';
import Search from "../../Search/Search";

const ColumnPickerDialog = (props) => {
    const { openDialog = false, intl, toggleColumnPicker, isSaveDisabled, saveColumnHandler,
        columnOptions, errorMsg = "", resetToDefault, onSelectionChange, onSearchQueryChange, searchValue = "" } = props;
    const { columnApiError, columnReset, resetIcon, checkboxRoot, checkboxSection, labelRoot,
        label, columnDesc, dialogContent } = columnPickerStyles();

    const createSaveButton = () => {
        return [
            {
                id: "ColumnSave",
                name: injectIntlTranslation(intl, "Save", "Save"),
                icon: faSave,
                onClick: saveColumnHandler,
                disabled: false
            }
        ];
    }

    const searchColumns = (columns) => columns.filter((columnOption) => columnOption.displayName.toLowerCase().search(searchValue.toLowerCase()) !== -1);

    const createColumnOptions = () => {
        return (
            <List className={checkboxSection} >
                {searchColumns(columnOptions).map((headCell, index) => {
                    const { name, displayName, isSelected } = headCell;
                    return (
                        <FormControlLabel
                            id={name}
                            value={displayName}
                            classes={{
                                root: labelRoot,
                                label: label
                            }}
                            control={<Checkbox
                                color="primary"
                                disableRipple
                                size={"small"}
                                classes={{
                                    root: checkboxRoot
                                }}
                                checked={isSelected}
                            />}
                            label={displayName}
                            labelPlacement="end"
                            onChange={() => onSelectionChange(name, isSelected)}
                        />
                    )
                })}
            </List>
        )
    }

    return (
        <ConfirmModal
            isModalOpen={openDialog}
            title={injectIntlTranslation(intl, "COLUMN_PICKER", "Column picker")}
            onClose={toggleColumnPicker}
            actionButtonList={createSaveButton(isSaveDisabled)}
            contentClassName={dialogContent}
        >
            <Typography variant='body2' className={columnDesc}>
                {injectIntlTranslation(intl, "COLUMN_PICKER_DESC", "Show these items in the table")}
            </Typography>
            <Search
                searchValue={searchValue}
                onSearchQueryChange={onSearchQueryChange}
            />
            <span className={columnApiError}>{errorMsg}</span>
            {createColumnOptions()}
            <div className={columnReset}>
                <ReplayIcon className={resetIcon} onClick={resetToDefault} />
                <Typography variant='body2' onClick={resetToDefault}>
                    {injectIntlTranslation(intl, "COLUMN_PICKER_RESET", "Reset default")}
                </Typography>
            </div>
        </ConfirmModal>
    )
}

export default injectIntl(memo(ColumnPickerDialog));