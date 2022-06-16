import React, { memo } from 'react'
import { connect } from 'react-redux'
import { injectIntl } from 'react-intl'
import { injectIntlTranslation } from '@carrier/workflowui-globalfunctions'
import ConfirmModal from '../ConfirmModal/ConfirmModal'
import { Grid, makeStyles } from '@material-ui/core'
import LoadingIcon from './LoadingProgress/LoadingLogo'

const useStyles = makeStyles(() => ({
    progressMessageContainer: {
        fontStyle: 'normal',
        fontWeight: 'normal',
        fontSize: '14px',
        lineHeight: '112%',
        color: '#333333',
        marginTop: '5px',
    },
    successContentContainer: {
        marginTop: '0px !important',
        paddingTop: '0px !important',
        width: '415px !important',
    },
}))

const QuoteSelectionProgressDialog = (props) => {
    const { quoteSelection, intl } = props
    const { showProgressModal } = quoteSelection
    const { progressMessageContainer, successContentContainer } = useStyles()

    return (
        <ConfirmModal
            isModalOpen={showProgressModal}
            hideHeader={true}
            contentClassName={successContentContainer}
            hideActions>
            <Grid container spacing={0} direction='column' alignItems='center' justify='center'>
                <Grid>
                    <LoadingIcon />
                </Grid>
                <Grid className={progressMessageContainer}>
                    {injectIntlTranslation(intl, 'SendingSelectionToPros')}
                </Grid>
            </Grid>
        </ConfirmModal>
    )
}

export default injectIntl(connect(null)(memo(QuoteSelectionProgressDialog)))
