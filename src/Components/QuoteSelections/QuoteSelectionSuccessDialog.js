import React, { memo, useState, useEffect } from "react";
import { connect } from "react-redux";
import { injectIntl } from "react-intl";
import {
    closeQuoteSelectionSuccess,
    injectIntlTranslation,
} from "@carrier/workflowui-globalfunctions";
import ConfirmModal from "../ConfirmModal/ConfirmModal";
import { Button, Grid, makeStyles } from "@material-ui/core";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";


const useStyles = makeStyles((theme) => ({
    successLogo: {
        color: "#61b549",
        marginBottom: "10px",
        width: "20px",
        height: "20px",
    },
    successMessageContainer: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        fontStyle: "normal",
        fontWeight: "normal",
        fontSize: "14px",
        lineHeight: "112%",
        color: "#333333",
    },
    successContentContainer: {
        marginTop: "0px !important",
        paddingTop: "0px !important",
        width: "415px !important",
    },
    footerButton: {
        fontSize: '1rem',
        lineHeight: '1.2rem',
        padding: '9px 24px',
        textTransform: 'none',
        border: '1px solid rgba(0, 0, 0, 0.23)',
    },
    buttonGradint: {
        background: "linear-gradient(99.7deg, #15205E -19.43%, #0076F4 80.93%)",
        boxShadow: "0px 11px 12px -10px rgba(4, 105, 221, 0.7)",
    },
    marginRight16px: {
        marginRight: "16px",
    }
}));

const QuoteSelectionSuccessDialog = (props) => {
    const {
        quoteSelectionSuccessDialog,
        intl,
        closeQuoteSelectionSuccess,
    } = props;
    const {
        showSuccessModal,
        quoteSelectionSuccessHandler = null,
        errorMsg = "",
    } = quoteSelectionSuccessDialog;
    const { successMessageContainer, successLogo, successContentContainer, footerButton, buttonGradint, marginRight16px } = useStyles();
    const [disableSave, setDisableSave] = useState(false);
    const [errorMessage, setErrorMessage] = useState(errorMsg);

    useEffect(() => {
        if (errorMsg && disableSave) {
            setDisableSave(true);
        }
        setErrorMessage(errorMsg);
    }, [errorMsg]);

    const handleOpenPros = () => {
        if (quoteSelectionSuccessHandler) {
            quoteSelectionSuccessHandler();
        }
    };

    const hideComponentHandler = () => {
        setErrorMessage("");
        closeQuoteSelectionSuccess();
    };

    const customFooterButtons = () => {
        return (
            <div>
                <Button
                    classes={{root: `${footerButton} ${marginRight16px}` }}
                    id="customModalCancel"
                    variant="outlined"
                    size="large"
                    name="Close"
                    onClick={hideComponentHandler}
                >
                    Close
                </Button>
                <Button
                    classes={{root: `${footerButton} ${buttonGradint}`}}
                    size="large"
                    variant="contained"
                    color="primary"
                    id={"OpenPros"}
                    name={injectIntlTranslation(intl, "OpenPros")}
                    onClick={handleOpenPros}
                    disabled={disableSave}
                >
                    {injectIntlTranslation(intl, "OpenPros")}
                </Button>
            </div>
        )
    }

    return (
        <ConfirmModal
            isModalOpen={showSuccessModal}
            onClose={hideComponentHandler}
            hideCancel={false}
            errorMsg={errorMessage}
            hideHeader={true}
            contentClassName={successContentContainer}
            footerComponent={customFooterButtons()}
        >
            <Grid
                container
                spacing={0}
                direction="column"
                alignItems="center"
                justify="center"
            >
                <Grid>
                    <CheckCircleIcon className={successLogo} />
                </Grid>
                <Grid className={successMessageContainer}>
                    {injectIntlTranslation(intl, "SelectionSuccessfulToPros")}
                </Grid>
            </Grid>
        </ConfirmModal>
    );
};

export default injectIntl(
    connect(null, { closeQuoteSelectionSuccess })(
        memo(QuoteSelectionSuccessDialog)
    )
);
