//React
import React from 'react'
import { injectIntl } from 'react-intl'

//Material UI
import { Grid, Typography } from '@material-ui/core'

//Utility methods
import { injectIntlTranslation } from '@carrier/workflowui-globalfunctions'

//Styles
import cartStyles from './Cart.styles'

const CartSectionTotal = ({ headingVariant = 'body2', intl, key = '', labelId = '', price = '0' }) => {
    const { totalRecap, totalRecapTitle } = cartStyles()

    return (
        <Grid container key={key} className={totalRecap}>
            {/* Section label */}
            <Grid item xs={2}>
                <Typography variant={headingVariant} className={totalRecapTitle}>
                    {injectIntlTranslation(intl, labelId, '')}
                </Typography>
            </Grid>

            {/* Total Price, right aligned. */}
            <Grid item xs={10} container>
                <Grid item sm={9} xs={9}></Grid>
                <Grid item sm={3} xs={3} style={{ textAlign: 'center' }}>
                    <Typography align='right' variant='body2' color='secondary'>
                        {price}
                    </Typography>
                </Grid>
            </Grid>
        </Grid>
    )
}

export default injectIntl(CartSectionTotal)
