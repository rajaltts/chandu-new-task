//React
import React from 'react'
import { injectIntl } from 'react-intl'

//Material UI
import { Box, Grid, Typography } from '@material-ui/core'

//Components
import CartSectionColumns from './CartSectionColumns'

//Styles
import cartStyles from './Cart.styles'

const CartSectionBaseunit = ({ intl, cartSectionConfig = {}, getPriceString = () => {} }) => {
    const { totalRecap, priceContainer } = cartStyles()

    return (
        <Box key={cartSectionConfig.key} className={`options-wrapper`}>
            <CartSectionColumns columnList={cartSectionConfig.columns} headerId={cartSectionConfig.headerTitle} />

            {/* Dynamically rendered data cells */}
            <Grid container className={totalRecap}>
                <Grid item xs={2}></Grid>
                <Grid item xs={10} container className={priceContainer}>
                    {cartSectionConfig.columns.map((col) => (
                        <Grid
                            item
                            sm={col.columnWidth}
                            key={col.key}
                            style={col.priceUnit ? { textAlign: 'right' } : { textAlign: 'center' }}>
                            <Typography variant='subtitle1' color='secondary'>
                                {getPriceString(col.priceUnit, col.dataSource)}
                            </Typography>
                        </Grid>
                    ))}
                </Grid>
            </Grid>
        </Box>
    )
}

export default injectIntl(CartSectionBaseunit)
