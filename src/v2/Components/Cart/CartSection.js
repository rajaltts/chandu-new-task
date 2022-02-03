// React
import React from 'react'
import { injectIntl } from 'react-intl'

// Material
import { Box, IconButton } from '@material-ui/core'
import Typography from '@material-ui/core/Typography'
import RightArrowIcon from '@material-ui/icons/ArrowForwardIos'

// Carrier
import { injectIntlTranslation } from '@carrier/workflowui-globalfunctions'

// Styles
import cartStyles from './Cart.styles'

// CartConfig
import BasePriceColumn from './BasePriceColumn'
import SectionTotal from "./SectionTotal"
import CartSectionColumns from "./CartSectionColumns"

const CartSection = ({
    intl,
    renderOptions = () => { },
    closeCart = () => { },
    getPriceAndLabel = () => { },
    getPriceString = () => { },
    isOverSelectedOptions = false,
    priceDescriptionList = [],
    cartConfig = [],
    dndReference = null
}) => {
    const {
        dropZone, optionDrawerContainer, optionDrawerMainContent, drawerCloseBtn, drawerIcon
    } = cartStyles()

    const getPriceAndLabelHandler = (label, priceUnit, baseTagName) => {
        if (getPriceAndLabel) {
            return getPriceAndLabel(label, priceUnit, baseTagName)
        }
        return {}
    }
    
    const getPriceStringHandler = (priceUnit, total) => {
        if (getPriceString) {
            return getPriceString(priceUnit, total)
        }
        return ''
    }

    return (
        <div className={optionDrawerContainer}>
            <div className={optionDrawerMainContent}>
                <IconButton className={drawerCloseBtn} onClick={() => closeCart()}>
                    <RightArrowIcon className={drawerIcon} />
                </IconButton>
                <Box>
                    <Typography variant='h2' color='primary' style={{ paddingBottom: '24px' }}>
                        {injectIntlTranslation(intl, 'OPTIONS_INCLUDED_UNIT_PRICE')}
                    </Typography>
                </Box>
                <BasePriceColumn
                    getPriceAndLabel={getPriceAndLabelHandler}
                    priceDescriptionList={priceDescriptionList}
                />
                {cartConfig.map(config => {
                    const { tagName, headerTitle, priceUnit, total } = config
                    const cartPrice = getPriceStringHandler(priceUnit, total)
                    return (
                        tagName ? (
                            <Box key={tagName} ref={dndReference} className={`options-wrapper`}>
                                <CartSectionColumns
                                    priceDescriptionList={priceDescriptionList}
                                    headerId={headerTitle}
                                />
                                {renderOptions(config)}
                                <SectionTotal
                                    labelId='SUB_TOTAL'
                                    price={cartPrice}
                                />
                                <div className={`${dropZone} ${isOverSelectedOptions ? 'is-visible' : ''}`} />
                            </Box>
                        ) : (
                            <SectionTotal
                                key={tagName}
                                labelId='TOTAL'
                                headingVariant='h2'
                                price={cartPrice}
                            />
                        )
                    )
                })}
            </div>
            <Box position="fixed" bottom="0" height="80px" width="100%" style={{ backgroundColor: 'white' }} />
        </div>
    )
}

export default injectIntl(CartSection)