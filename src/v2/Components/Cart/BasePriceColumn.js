import { Grid, Typography } from '@material-ui/core'
import React from 'react'
import cartStyles from './Cart.styles'

const BasePriceColumn = ({ priceDescriptionList = [], getPriceAndLabel = () => {} }) => {
    const { priceItem, legend } = cartStyles()
    return (
        <Grid container style={{ padding: '8px 16px' }}>
            <Grid item xs={2} sm={5}></Grid>
            <Grid item xs={10} sm={7} container>
                {priceDescriptionList.map(item => {
                    const { label, columnWidth, priceUnit, baseTagName } = item
                    const { priceLabel = "", price = "" } = getPriceAndLabel ? getPriceAndLabel(label, priceUnit, baseTagName) : {}
                    return (
                        <Grid key={label} sm={columnWidth} className={priceItem}>
                            <Typography className={legend} variant='caption' color="textSecondary" >
                                {priceLabel}
                            </Typography>
                            <Typography variant='body1' align='center' color="secondary">
                                {price}
                            </Typography>
                        </Grid>
                    )
                })}
            </Grid>
        </Grid>
    )
}

export default BasePriceColumn