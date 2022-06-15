import React from 'react'
import FabWithBadge from './FabWithBadge'
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket'

export default {
    title: 'ActionComponent/FabWithBadge',
    component: FabWithBadge,
}

const FabWithBadgeTemplate = ({ ...args }) => {
    return <FabWithBadge {...args} />
}

export const Basic = FabWithBadgeTemplate.bind({})
Basic.args = {
    icon: <ShoppingBasketIcon />,
}
