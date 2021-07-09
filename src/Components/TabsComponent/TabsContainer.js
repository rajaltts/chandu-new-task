import React, { useState, useEffect } from "react";
import Tab from "@material-ui/core/Tab";
import Tabs from "@material-ui/core/Tabs";
import TabStyles from "./TabsStyle";

const TabsContainer = (props) => {
    const { tabs, defaultActiveTab, onTabChange } = props;
    const classes = TabStyles();
    const [activeTab, setActiveTab] = useState(defaultActiveTab || 0);

    const handleTabChange = (event, activeTab) => {
        setActiveTab(activeTab);
        onTabChange(activeTab);
    };

    useEffect(() => {
        if (defaultActiveTab !== activeTab) setActiveTab(activeTab);
    }, [defaultActiveTab]);

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
                                root: classes.tabRoot,
                            }}
                            label={
                                <span
                                    className={`${classes.tabLabels} ${
                                        activeTab === index
                                            ? classes.activeLabel
                                            : classes.inActiveLabel
                                    }`}
                                >
                                    {tab.name}
                                </span>
                            }
                        />
                    );
                })}
            </Tabs>
            <div
                className={`${classes.divisionLine} ${classes.negativeMargin}`}
            />
        </>
    );
};

export default TabsContainer;