import React, { memo } from 'react';
import { injectIntlTranslation } from '@carrier/workflowui-globalfunctions';
import { injectIntl } from "react-intl";
import searchStyles from './SearchStyles';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import SearchIcon from '@material-ui/icons/Search';

const Search = (props) => {
    const { intl, onSearchQueryChange, searchValue = "" } = props;
    const { searchInput, searchInputRoot, nonErrorBorder, searchRoot } = searchStyles();

    const onSearchQueryChangeHandler = (event) => {
        onSearchQueryChange && onSearchQueryChange(event);
    }

    return (
        <TextField
            className={searchInput}
            variant="outlined"
            InputProps={{
                classes: {
                    root: searchRoot,
                    input: searchInputRoot,
                    notchedOutline: nonErrorBorder
                },
                startAdornment: (
                    <InputAdornment position="start">
                        <SearchIcon />
                    </InputAdornment>
                ),
            }}
            placeholder={injectIntlTranslation(intl, "SearchPlaceholderText", "Search")}
            autoFocus
            margin={'dense'}
            size={'small'}
            value={searchValue}
            onChange={onSearchQueryChangeHandler}
        />
    )
}

export default injectIntl(memo(Search));