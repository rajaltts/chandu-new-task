import { Grid, Typography } from '@material-ui/core'
import React from 'react'
import cartStyles from './Cart.styles'
import { injectIntlTranslation } from '@carrier/workflowui-globalfunctions'
import { injectIntl } from 'react-intl'

const SectionTotal = ({ headingVariant = "body2", intl, key = '', labelId = '', price = '0' }) => {
    const { totalRecap, totalRecapTitle, priceContainer } = cartStyles()
    return (
        <Grid container key={key} className={totalRecap}>
            <Grid item xs={2} sm={5}>
                <Typography variant={headingVariant} className={totalRecapTitle}>
                    {injectIntlTranslation(intl, labelId, "")}
                </Typography>
            </Grid>
            <Grid item xs={10} sm={7} container className={priceContainer}>
                <Grid item sm={6}></Grid>
                <Grid item sm={3}></Grid>
                <Grid item sm={3} style={{ textAlign: 'center' }}>
                    <Typography align="center" variant='body2' color='secondary'>
                        {price}
                    </Typography>
                </Grid>
            </Grid>
        </Grid>
    )
}

export default injectIntl(SectionTotal)