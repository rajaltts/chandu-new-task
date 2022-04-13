import React, { useEffect, useState, useRef } from 'react'
import { injectIntl } from 'react-intl'
import TextField from '@material-ui/core/TextField'
import InputAdornment from '@material-ui/core/InputAdornment'
import SearchIcon from '@material-ui/icons/Search'
import Divider from '@material-ui/core/Divider'
import { makeStyles } from '@material-ui/core/styles'

const searchDropdownStyles = makeStyles((theme) => ({
    dropdownAdornedEnd: {
        paddingRight: '7px',
        borderRadius: '19px',
    },
    endAdornmentIcon: {
        height: 'inherit',
    },
    searchInputRoot: {
        minWidth: '174px',
        height: '9px',
    },
    searchIcon: {
        cursor: 'pointer',
    },
}))

const SearchDropdown = (props) => {
    const node = useRef()
    const { dropdownAdornedEnd, endAdornmentIcon, searchInputRoot, searchIcon } = searchDropdownStyles()
    const [open, setOpen] = useState(false)
    const [value, setValue] = useState(props.value || '')

    const listItemClicked = (value) => {
        props.onListItemClicked(value)
        setOpen(false)
    }

    useEffect(() => {
        document.addEventListener('mousedown', handleClick)

        return () => {
            setValue('')
            document.removeEventListener('mousedown', handleClick)
        }
    }, [])

    const handleBtnClick = () => {
        props.filters.length > 1 && setOpen(!open)
    }

    const textChangeHandler = (event) => {
        setValue(event.target.value)
        props.onTextChange && props.onTextChange(event)
    }

    const handleClick = (e) => {
        if (node.current.contains(e.target)) {
            return
        }
        setOpen(false)
    }

    function injectIntlTranslation(id) {
        const intl = props.intl
        return intl.formatMessage({
            id: id,
        })
    }

    return (
        <div id='SearchComponentContainer' className='searchdropdown'>
            <TextField
                id='ProjectSearchTextBox'
                variant='outlined'
                size='small'
                placeholder={props.placeholder}
                onChange={textChangeHandler}
                onKeyPress={props.handleKeyPress}
                value={value}
                InputProps={{
                    classes: {
                        adornedEnd: dropdownAdornedEnd,
                        input: searchInputRoot,
                    },
                    startAdornment: (
                        <InputAdornment position='start'>
                            <SearchIcon className={searchIcon} id='ProjectSearchIcon' onClick={props.onSearchClick} />
                        </InputAdornment>
                    ),
                    endAdornment: (
                        <InputAdornment className={endAdornmentIcon}>
                            <Divider orientation='vertical' flexItem />
                            <div id='SearchDropdownContainer' ref={node} className='searchDropdownButton'>
                                <button className='eButtonsimple' onClick={handleBtnClick}>
                                    {injectIntlTranslation(props.filterName)}
                                    {props.filters.length > 1 && <span className='caret' />}
                                </button>
                                {open && (
                                    <ul id='ProjectSearchCriteriaListContainer' className='dropdown-menu'>
                                        {props.filters.map((value, idx) => {
                                            return (
                                                <li id={idx} key={idx} onClick={() => listItemClicked(value)}>
                                                    {value}
                                                </li>
                                            )
                                        })}
                                    </ul>
                                )}
                            </div>
                        </InputAdornment>
                    ),
                }}
            />
        </div>
    )
}

export default injectIntl(SearchDropdown)
