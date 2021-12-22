import React, { useEffect, useState } from 'react'
import tabsListStyles from "./TabsList.styles"

// Material
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import { useTheme } from '@material-ui/styles'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'

const TabsList = ({ tabsList = [], customTheme = null, activeTab = 0, handleChangeTab = null }) => {
    const theme = customTheme || useTheme()
    const [mobileTabsDropdownVisible, setMobileTabsDropdownVisible] = useState(false)
    const isMobile = theme ? useMediaQuery(theme.breakpoints.down('xs')) : false
    const { tabs, tabBtn, mobileTabsToggler } = tabsListStyles();

    useEffect(() => {
        setMobileTabsDropdownVisible(false)
    }, [activeTab])

    const handleMobileTabsToggle = () => {
        setMobileTabsDropdownVisible(!mobileTabsDropdownVisible)
    }

    const handleChangeTabHandler = (event, tab) => {
        handleMobileTabsToggle()
        if (handleChangeTab) {
            handleChangeTab(tab)
        }
    }

    const createTabs = () => {
        return (
            <Tabs className={tabs} value={activeTab} onChange={handleChangeTabHandler}>
                {tabsList.map((tab) => (
                    <Tab key={tab.id} className={tabBtn} label={tab.label} id={tab.id} />
                ))}
            </Tabs>
        )
    }

    return (
        <>
            <button
                className={`${mobileTabsToggler} js-mobile-tabs-toggler`}
                onClick={handleMobileTabsToggle}>
                <ArrowDropDownIcon />
            </button>
            {isMobile && mobileTabsDropdownVisible && createTabs()}
            {!isMobile && createTabs()}
        </>
    )
}

export default TabsList;