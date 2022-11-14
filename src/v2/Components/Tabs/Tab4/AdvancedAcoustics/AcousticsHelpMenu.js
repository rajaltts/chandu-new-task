import React from 'react'
import PropTypes from 'prop-types'

//Material UI
import {
    Box,
    Paper,
    Grid,
    ExpansionPanel,
    ExpansionPanelSummary,
    ExpansionPanelDetails,
    Typography,
} from '@material-ui/core'
import LiveHelpIcon from '@material-ui/icons/LiveHelp'

//Constants
import { helpMenuContent } from './AdvanceAcousticsConstants'

const AcousticsHelpMenu = ({ classes }) => {
    const CustomExpandIcon = () => {
        return (
            <Paper>
                <Box className={classes.liveHelpIconStylesRoot}>
                    <LiveHelpIcon color='secondary' style={{ fontSize: 40 }} />
                </Box>
            </Paper>
        )
    }
    return (
        <>
            <Box className={classes.accordionStylesRoot}>
                <ExpansionPanel>
                    <ExpansionPanelSummary
                        className={classes.accordionStylesAccordion}
                        expandIcon={<CustomExpandIcon />}
                        aria-controls='panel1a-content'
                        id='panel1a-header'
                        IconButtonProps={{ className: classes.accordionStylesCustomExpandIcon }}>
                        <Typography className={classes.accordionStylesHeading}>Help: Advanced Acoustics</Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>
                        <Grid container>
                            {helpMenuContent.map(({ content }, index) => {
                                return (
                                    <Grid key={index} item xs={12} className={classes.typography}>
                                        <Typography variant='subtitle2' color='primary'>
                                            {index + 1 + '. ' + content}
                                        </Typography>
                                    </Grid>
                                )
                            })}
                        </Grid>
                    </ExpansionPanelDetails>
                </ExpansionPanel>
            </Box>
        </>
    )
}

AcousticsHelpMenu.propTypes = {
    blobStorage: PropTypes.object,
}

export default AcousticsHelpMenu
