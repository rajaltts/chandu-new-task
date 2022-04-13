import React, { useState, Fragment } from 'react'
import { GetProp } from '@carrier/workflowui-globalfunctions'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'

const SimpleHorizontalTabs = (props) => {
    const { RulesJSON, TabsJson } = props
    const [value, setValue] = useState(0)

    const handleChange = (event, newValue) => {
        setValue(newValue)
    }

    const VisibleTab = (PropName) => {
        const VisibleProp = GetProp(PropName, RulesJSON)
        return VisibleProp && VisibleProp.Value === 'TRUE'
    }

    const RenderTabBody = (item) => {
        const TabConent = item.Component
        return <TabConent {...item.Props} />
    }

    return (
        <Fragment>
            <Tabs
                value={value}
                onChange={handleChange}
                indicatorColor='primary'
                aria-label='simple tabs example'
                className='horizantal-tabs'
            >
                {TabsJson.map(
                    (item, idx) =>
                        VisibleTab(item.propName) && (
                            <Tab
                                id={`ctrl${item.propName}`}
                                label={item.Name}
                                value={idx}
                                key={idx}
                                aria-labelledby={item.Name}
                            />
                        )
                )}
            </Tabs>
            {TabsJson.map(
                (item, idx) =>
                    VisibleTab(item.propName) && (
                        <TabPanel value={value} index={idx} key={idx}>
                            {RenderTabBody(item)}
                        </TabPanel>
                    )
            )}
        </Fragment>
    )
}

const TabPanel = (props) => {
    const { children, value, index } = props
    return (
        <div
            role='tabpanel'
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...props}
        >
            {value === index && <div p={3}>{children}</div>}
        </div>
    )
}

export default SimpleHorizontalTabs
