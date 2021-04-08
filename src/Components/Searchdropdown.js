import React, { useEffect, useState, useRef } from 'react';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { injectIntl } from "react-intl";

const SearchDropdown = (props) => {
    const node = useRef();
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(props.value || "");

    const listItemClicked = (value) => {
        props.onListItemClicked(value);
        setOpen(false);
    }

    useEffect(() => {
        document.addEventListener("mousedown", handleClick);

        return () => {
            setValue("")
            document.removeEventListener("mousedown", handleClick);
        };
    }, []);

    const handleBtnClick = () => {
        (props.filters.length > 1) && setOpen(!open)
    }

    const textChangeHandler = (event) => {
        setValue(event.target.value);
        props.onTextChange && props.onTextChange(event);
    }

    const handleClick = e => {
        if (node.current.contains(e.target)) {
            return;
        }
        setOpen(false);
    };

    function injectIntlTranslation(id) {
        const intl = props.intl;
        return intl.formatMessage({
            id: id
        })
    }

    return (
        <div id="SearchComponentContainer" className="searchdropdown" >
            <div id="SearchDropdownContainer" ref={node} className="searchDropdownButton">
                <button className="eButtonsimple" onClick={handleBtnClick}>
                    {injectIntlTranslation(props.filterName)}
                    {(props.filters.length > 1) && <span className="caret" />}
                </button>
                {open && (<ul id="ProjectSearchCriteriaListContainer" className="dropdown-menu">
                    {props.filters.map((value, idx) => {
                        return <li id={idx} key={idx} onClick={() => listItemClicked(value)}>{value}</li>
                    })}
                </ul>)
                }
            </div>
            <div className="searchContainerProject">
                <input
                    id="ProjectSearchTextBox"
                    className="searchBox"
                    type="search"
                    name="search"
                    placeholder={props.placeholder}
                    onChange={textChangeHandler}
                    onKeyPress={props.handleKeyPress}
                    value={value}
                />
                <span onClick={props.onSearchClick}>
                    <FontAwesomeIcon id="ProjectSearchIcon" icon={faSearch} className="searchIconProject" title={props.title} /></span>
            </div>
        </div>
    )
}

export default injectIntl(SearchDropdown);