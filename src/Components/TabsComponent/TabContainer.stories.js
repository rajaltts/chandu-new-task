import React from 'react'
import TabsContainer from './TabsContainer'

export default {
    title: 'Tabs Container',
    component: TabsContainer,
}
const TabsContainerTemplate = ({ ...args }) => {

    const createtabs= () => {
        return [
            {
                index: 0,
                name: "Tab One"
              },
              {
                index: 1,
                name: "Tab Two"
              }
            ];
      };

      const ValueOnTabChange=(activeValue)=>
      {
        alert(activeValue)
      }

    return <TabsContainer  {...args} tabs={createtabs()} onTabChange={ValueOnTabChange} />
}

export const ActiveTab = TabsContainerTemplate.bind({})
ActiveTab.args ={
    defaultActiveTab:0,
    inactiveClassname:'',
    divisonLineClassname:''

}