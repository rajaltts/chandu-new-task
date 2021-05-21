import React, {memo} from 'react';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import tabsStyles from "./tabsStyles";

const TabsBuilder = (props) => {
    const { tabs, selectedTab, handleTabChange } = props;
    const {tabsContainer, tabsRoot, tabsSelected, tabsNotSelected} = tabsStyles();

    const tabChangeHandler = (event, value) => {
        handleTabChange && handleTabChange(event, value);
    }

    return (
        <div className={tabsContainer}>
            <Tabs
                value={selectedTab}
                onChange={tabChangeHandler}
                indicatorColor="default"
                disableRipple
                classes={{
                    root: tabsRoot
                }}
                variant="scrollable">
                    { tabs.map((tab, index) => 
                        <Tab
                            key={tab.tabName}
                            className={selectedTab === index ? tabsSelected : tabsNotSelected}
                            disableRipple
                            label={tab.tabName}
                        />)
                    }
            </Tabs>
        </div>
    )
};

export default memo(TabsBuilder);