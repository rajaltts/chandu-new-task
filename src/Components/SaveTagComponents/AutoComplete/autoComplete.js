import React, { useEffect } from 'react';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import TextField from '@material-ui/core/TextField';
import saveTagStyles from "../saveTagStyles";
import { intlShape, injectIntl } from "react-intl";
import { injectIntlTranslation } from '@carrier/workflowui-globalfunctions';
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';

const AutoComplete = (props) => {
    const { menuList = [], isError = false, validateField, field, intl } = props;
    const { value = "", id, isDisabled, placeHolder, validation, defaultLabel } = field;
    const { searchInput, searchInputRoot, popper, errorBorder, nonErrorBorder, paper, noDataAvailable } = saveTagStyles();
    const [open, setOpen] = React.useState(false);
    const [textValue, setTextValue] = React.useState(value);
    const [autoCompleteList, setAutoCompleteList] = React.useState(menuList);
    const anchorRef = React.useRef(null);
    const prevOpen = React.useRef(open);
    const errorClass = isError ? errorBorder : nonErrorBorder;

    useEffect(() => {
        setAutoCompleteList(menuList);
    }, [menuList]);

    useEffect(() => {
        if (prevOpen.current === true && open === false) {
            anchorRef.current.focus();
        }
        prevOpen.current = open;
    }, [open]);

    const handleClose = (event) => {
        if (anchorRef.current && anchorRef.current.contains(event.target)) {
            return;
        }
        setOpen(false);
    };

    const handleListKeyDown = (event) => {
        if (event.key === 'Tab') {
            event.preventDefault();
            setOpen(false);
        }
    }

    const menuItemSelection = ({ event, menuItem, id }) => {
        setTextValue(menuItem.CustomerName);
        setOpen(false);
        validateField && validateField({ event, id, validation, menuItem })
    }

    const validationAutoComplete = ({ event, id, validation }) => {
        const { target: { value } } = event;
        setTextValue(value);
        value && setOpen(true)
        validateField && validateField({ event, id, validation })
    }

    const renderMenuList = (menuList) => {
        if (menuList && menuList.length > 0) {
            return menuList.map(menuItem => <MenuItem onClick={(event) => menuItemSelection({ event, menuItem, id, validation })}>{menuItem.CustomerName}</MenuItem>)
        }
        return (
            <MenuItem className={noDataAvailable}>
                <ErrorOutlineIcon fontSize='large' />
                {injectIntlTranslation(intl, "GridNoData")}
            </MenuItem>
        )
    }

    return (
        <>
            <TextField
                inputRef={anchorRef}
                autoComplete='off'
                className={searchInput}
                value={textValue || value}
                variant="outlined"
                InputProps={{
                    classes: {
                        input: searchInputRoot,
                        notchedOutline: errorClass
                    }
                }}
                disabled={isDisabled}
                placeholder={injectIntlTranslation(intl, placeHolder, defaultLabel)}
                name={id}
                margin={'dense'}
                size={'small'}
                type="search"
                onChange={event => validationAutoComplete({ event, id, validation })}
            />
            <Popper
                open={open && textValue}
                anchorEl={anchorRef.current}
                role={undefined}
                transition
                disablePortal
                className={popper}
            >
                {({ TransitionProps, placement }) => (
                    <Grow
                        {...TransitionProps}
                        style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
                    >
                        <Paper className={paper}>
                            <ClickAwayListener onClickAway={handleClose}>
                                <MenuList
                                    id="menu-list-grow"
                                    onKeyDown={handleListKeyDown}
                                >
                                    {
                                        renderMenuList(autoCompleteList.filter(menuList => (menuList.CustomerName.toLowerCase().search(value.toLowerCase()) >= 0)))
                                    }
                                </MenuList>
                            </ClickAwayListener>
                        </Paper>
                    </Grow>
                )}
            </Popper>
        </>
    );
}

AutoComplete.propTypes = {
    intl: intlShape.isRequired
};

export default injectIntl((AutoComplete));
