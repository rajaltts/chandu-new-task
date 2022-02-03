import { Grid, Typography } from '@material-ui/core'
import React from 'react'
import cartStyles from './Cart.styles'
import { injectIntlTranslation } from '@carrier/workflowui-globalfunctions'
import { injectIntl } from 'react-intl'

const CartSectionColumns = ({ intl, priceDescriptionList = [], headerId = '' }) => {
    const { priceItem, legend } = cartStyles()
    return (
        <>
            <Typography variant='h2' color='primary'>
                {injectIntlTranslation(intl, headerId)}
            </Typography>
            <Grid container style={{ marginBottom: '4px', padding: '0px 16px' }}>
                <Grid item xs={2} sm={5}></Grid>
                <Grid item xs={10} sm={7} container>
                    {priceDescriptionList.map(item => {
                        const { label = '', columnWidth } = item
                        return (
                            <Grid key={label} item sm={columnWidth} className={priceItem}>
                                <Typography variant='caption' className={legend}>
                                    {injectIntlTranslation(intl, label)}
                                </Typography>
                            </Grid>
                        )
                    })}
                </Grid>
            </Grid>
        </>
    )
}

export default injectIntl(CartSectionColumns)