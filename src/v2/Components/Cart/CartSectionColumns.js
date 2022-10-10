//React
import React from 'react'
import { injectIntl } from 'react-intl'

//Material UI
import { Grid, Typography } from '@material-ui/core'

//Utility methods
import { injectIntlTranslation } from '@carrier/workflowui-globalfunctions'

//Styles
import cartStyles from './Cart.styles'

const CartSectionColumns = ({ intl, columnList = [], headerId = '' }) => {
    const { priceItem, legend } = cartStyles()
    return (
        <>
            {/* Header for the section */}
            <Typography variant='h2' color='primary' style={{ padding: '0px' }}>
                {injectIntlTranslation(intl, headerId)}
            </Typography>

            {/* Column headings for the section */}
            <Grid container style={{ marginBottom: '4px', padding: '0px 16px' }}>
                <Grid item xs={2}></Grid>
                <Grid item xs={10} container>
                    {columnList.map((col) => {
                        const { label = '', columnWidth } = col
                        return (
                            <Grid
                                key={label}
                                item
                                sm={columnWidth}
                                xs={columnWidth}
                                className={priceItem}
                                style={col.priceUnit ? { textAlign: 'right' } : { textAlign: 'center' }}
                            >
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
