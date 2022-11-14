//React
import React from 'react'
import PropTypes from 'prop-types'

//Material UI
import { Box, Paper, Grid } from '@material-ui/core'

//Controls & Layout
import CardLayout from '../../../CardLayout'

const ReferenceImage = ({ blobStorage }) => {
    return (
        <>
            <Box>
                <CardLayout component={Paper}>
                    <Grid container xs={12} spacing={3}>
                        <Grid item xs={12} sm={6}>
                            <picture>
                                <source
                                    srcSet={`${blobStorage}ecatui/ecatimages/Acoustics_Reference.avif`}
                                    type='image/avif'
                                />
                                <source
                                    srcSet={`${blobStorage}ecatui/ecatimages/Acoustics_Reference.webp`}
                                    type='image/webp'
                                />
                                <img
                                    srcSet={`${blobStorage}ecatui/ecatimages/Acoustics_Reference.jpg`}
                                    alt='Acoustics Reference'
                                />
                            </picture>
                        </Grid>
                    </Grid>
                </CardLayout>
            </Box>
        </>
    )
}

ReferenceImage.propTypes = {
    blobStorage: PropTypes.string,
}

export default React.memo(ReferenceImage)
