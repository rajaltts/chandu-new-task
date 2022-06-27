// React
import React from 'react'
import { injectIntl } from 'react-intl'

// Material UI
import { Box, Grid, IconButton, Typography } from '@material-ui/core'
import RightArrowIcon from '@material-ui/icons/ArrowForwardIos'

//Constants
import { CART_SECTIONTYPE } from '@carrier/workflowui-globalfunctions'

// Utility Methods
import { injectIntlTranslation } from '@carrier/workflowui-globalfunctions'

// Styles
import cartStyles from './Cart.styles'

// Components
import CartSectionBaseunit from './CartSectionBaseunit'
import CartSectionColumns from './CartSectionColumns'
import CartSectionTotal from './CartSectionTotal'

const CartSection = ({
    intl,
    renderOptions = () => {},
    closeCart = () => {},
    getPriceString = () => {},
    isOverSelectedOptions = false,
    cartConfig = [],
    dndReference = null,
    showBottomSpacer = true,
}) => {
    const { dropZone, optionDrawerContainer, optionDrawerMainContent, drawerCloseBtn, drawerIcon } = cartStyles()

    const getPriceStringHandler = (priceUnit, pricePropName) => {
        if (getPriceString) {
            return getPriceString(priceUnit, pricePropName)
        }
        return ''
    }

    return (
        <div className={optionDrawerContainer}>
            <div className={optionDrawerMainContent}>
                {/* Shopping Cart close button and header */}
                <Grid container alignItems='center'>
                    <Grid item xs={1}>
                        <IconButton className={drawerCloseBtn} onClick={() => closeCart()}>
                            <RightArrowIcon className={drawerIcon} />
                        </IconButton>
                    </Grid>
                    <Grid item xs={10}>
                        <Typography variant='h2' color='primary' align='center' style={{ padding: '0px' }}>
                            {injectIntlTranslation(intl, 'SHOPPING_CART')}
                        </Typography>
                    </Grid>
                    <Grid item xs={1}></Grid>
                </Grid>

                {/* Iterate through sections in the Cart Configuration */}
                {cartConfig.map((config) => {
                    const { sectionType, tagName, headerTitle, priceUnit, columns, total } = config
                    const cartPrice = getPriceStringHandler(priceUnit, total)

                    switch (sectionType) {
                        //Base Unit section
                        case CART_SECTIONTYPE.BASEUNIT:
                            return (
                                <CartSectionBaseunit
                                    cartSectionConfig={config}
                                    getPriceString={getPriceStringHandler}
                                />
                            )

                        //Options section (options, accessories, warranties, quote controls, startup, etc.)
                        case CART_SECTIONTYPE.OPTION:
                            if (tagName) {
                                return (
                                    <Box key={tagName} ref={dndReference} className={`options-wrapper`}>
                                        <CartSectionColumns columnList={columns} headerId={headerTitle} />
                                        {renderOptions(config)}
                                        <CartSectionTotal labelId='SUB_TOTAL' price={cartPrice} />
                                        <div className={`${dropZone} ${isOverSelectedOptions ? 'is-visible' : ''}`} />
                                    </Box>
                                )
                            }
                            return null

                        //Total Price section
                        case CART_SECTIONTYPE.TOTAL:
                            return (
                                <CartSectionTotal
                                    key={sectionType}
                                    labelId='TOTAL'
                                    headingVariant='h2'
                                    price={cartPrice}
                                />
                            )

                        default:
                            return null
                    }
                })}
            </div>

            {/* Bottom spacer */}
            {showBottomSpacer && (
                <Box position='fixed' bottom='0' height='80px' width='100%' style={{ backgroundColor: 'white' }} />
            )}
        </div>
    )
}

export default injectIntl(CartSection)
