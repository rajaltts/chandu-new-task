import React from 'react';
import { injectIntl } from "react-intl";

const CustomGridSearch = (props) => {
    const { intl, onSearch } = props;
    
    const injectIntlTranslation = (id) =>{	
        return intl.formatMessage({	
            id: id	
        })	
    }

    return (
        <div className="searchdropdown" >
            <div className="searchContainerProject gridSearch">
                <input 
                    className="searchBox" 
                    type="search" 
                    name="search" 
                    placeholder={injectIntlTranslation("SearchPlaceholderText")} 
                    onChange={onSearch} 
                />
            </div>
        </div>
    )
}

export default injectIntl(CustomGridSearch);