//React
import React from 'react'
import { injectIntl } from 'react-intl'

//Material UI
import { Box, Grid, Typography } from '@material-ui/core'

//Components
import CartSectionColumns from './CartSectionColumns'
import ConfigDrivenNumberField from '../../../Components/formBuilder/fieldComponents/ConfigDrivenNumberField'

//Styles
import cartStyles from './Cart.styles'

const CartSectionBaseunit = ({ cartSectionConfig = {}, getPriceString = () => {} }) => {
    const { totalRecap } = cartStyles()

    return (
        <Box key={cartSectionConfig.key} className={`options-wrapper`}>
            <CartSectionColumns columnList={cartSectionConfig.columns} headerId={cartSectionConfig.headerTitle} />

            {/* Dynamically rendered data cells */}
            <Grid container className={totalRecap}>
                <Grid item xs={2}></Grid>
                <Grid item xs={10} container>
                    {cartSectionConfig.columns.map((col) => {
                        const { columnWidth, key, priceUnit, dataSource, isEditable, onClick } = col
                        const fieldValue = getPriceString(priceUnit, dataSource)
                        return (
                            <Grid
                                item
                                sm={columnWidth}
                                xs={columnWidth}
                                key={key}
                                style={priceUnit ? { textAlign: 'right' } : { textAlign: 'center' }}>
                                {isEditable ? (
                                    <ConfigDrivenNumberField
                                        config={{ isEditable, onClick }}
                                        rowData={col}
                                        value={fieldValue}
                                    />
                                ) : (
                                    <Typography variant='subtitle1' color='secondary'>
                                        {fieldValue}
                                    </Typography>
                                )}
                            </Grid>
                        )
                    })}
                </Grid>
            </Grid>
        </Box>
    )
}

export default injectIntl(CartSectionBaseunit)
