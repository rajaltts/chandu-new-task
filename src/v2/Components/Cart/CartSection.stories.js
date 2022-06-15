import React from 'react'
import CartSection from './CartSection'

export default {
    title: 'Layout/CartSection',
    component: CartSection,
    argTypes: {},
}

const CartSectionTemplate = ({ ...args }) => {
    return <CartSection {...args} />
}

export const Basic = CartSectionTemplate.bind({})
