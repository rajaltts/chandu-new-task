import React, { useState, useEffect } from "react";
import Tab from "@material-ui/core/Tab";
import Tabs from "@material-ui/core/Tabs";
import Badge from '@material-ui/core/Badge';
import TabStyles from "./TabsStyle";
import classnames from 'classnames';

const TabsContainer = (props) => {
    const { tabs, defaultActiveTab, onTabChange, inactiveClassname = null, divisonLineClassname = null } = props;
    const classes = TabStyles();
    const [activeTab, setActiveTab] = useState(defaultActiveTab || 0);

    const handleTabChange = (event, activeTab) => {
        setActiveTab(activeTab);
        onTabChange(activeTab);
    };

    useEffect(() => {
        if (defaultActiveTab !== activeTab) setActiveTab(activeTab);
    }, [defaultActiveTab]);

    const getLabel = (tab, index) => {
        return (
            <span
                className={`${classes.tabLabels} ${
                    activeTab === index
                        ? classes.activeLabel
                        : classnames(inactiveClassname, classes.inActiveLabel)
                }`}
            >
                {tab.name}
            </span>
        )
    }

    return (
        <>
            <Tabs
                onChange={handleTabChange}
                value={activeTab}
                classes={{
                    indicator: classes.activeTabIndicator,
                    fixed: classes.greyBotoomBorder,
                }}
            >
                {tabs.map((tab, index) => {
                    return (
                        <Tab
                            id="simple-tab"
                            aria-controls="simple-tabpanel"
                            classes={{
                                root: classnames(classes.tabRoot, tab.badgeContent && classes.badgePadding),
                            }}
                            disabled={tab.disabled || false}
                            label={
                                (tab.badgeContent) ?
                                    <Badge classes={{colorPrimary: classes.badgeContent}} badgeContent={tab.badgeContent} color="primary">
                                        {getLabel(tab, index)}
                                    </Badge>
                                    :
                                    getLabel(tab, index)
                            }
                        />
                    );
                })}
            </Tabs>
            <div
                className={classnames(divisonLineClassname, classes.divisionLine, classes.negativeMargin)}
            />
        </>
    );
};

export default TabsContainer;