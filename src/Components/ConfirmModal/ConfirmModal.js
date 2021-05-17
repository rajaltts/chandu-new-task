import React from 'react';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import CloseIcon from '@material-ui/icons/Close';
import Button from '../Button';
import translation from '../Translation';
import { IconButton } from '@material-ui/core';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import './ConfirmModal.css';

const useStyles = makeStyles((theme) => ({
	paper: {
		maxHeight: '90vh !important',
	},
}));

const ConfirmModal = (props) => {
    const { contentClassName, title, isModalOpen, onClose, children, cancelDisabled, hideCancel, hideActions, disableCloseIcon,
        modalWidth, overrideFooterCancelButton, id = "", actionButtonList = [], errorMsg = "", fullWidth = false, fullScreen = false,
        footerComponent = null, hideHeader = false } = props;
	const classes = useStyles()
    const cancelText = translation("Cancel");

    const onCancelButtonClick = () => {
        if (overrideFooterCancelButton) {
            overrideFooterCancelButton();
        } else if (onClose) {
            !cancelDisabled && onClose(false);
        }
    }

    const actionButtonClickHandler = (button) => {
        !button.disabled && button.onClick();
    }

    return (
        <Dialog
            id={id}
            aria-label={title}
            open={isModalOpen}
            onClose={onClose}
            maxWidth={modalWidth}
            scroll="paper"
			classes={{ paper: classes.paper }}
            disableBackdropClick
            fullWidth={fullWidth}
            fullScreen={fullScreen}
        >
            {!hideHeader && <div className="customModalHeader">
                <span className="customModalTitle">{title}</span>
                {!disableCloseIcon && (
                    <IconButton className="customModalClose" onClick={onCancelButtonClick}>
                        <CloseIcon className="customModalCloseIcon" titleAccess='close' />
                    </IconButton>
                )}
            </div>}
            <DialogContent className={contentClassName}>
                {children}
            </DialogContent>
            {!hideActions &&
                <div className="customModalDialogFooter">
                    {errorMsg && <div className="customModalDialogError"> {errorMsg} </div>}
                    <DialogActions className="customModalActions">
                    {!footerComponent ?
                        <>
                            {!hideCancel &&
                                <Button
                                    id="customModalCancel"
                                    name={cancelText}
                                    icon={faTimes}
                                    styles="eButton"
                                    onClick={onCancelButtonClick}
                                    disabled={cancelDisabled}>
                                    {cancelText}
                                </Button>
                            }
                            {(actionButtonList.length > 0) &&
                                actionButtonList.map(actionButton => {
                                    return <Button
                                        key={actionButton.id}
                                        id={actionButton.id}
                                        name={actionButton.name}
                                        icon={actionButton.icon}
                                        styles={(actionButton.disabled) ? "eButton eButtondisable" : "eButton eButtonPrimary customModalEmptyRightMargin"}
                                        onClick={() => actionButtonClickHandler(actionButton)}
                                        disabled={actionButton.disabled}
                                    >
                                        {actionButton.name}
                                    </Button>
                                })
                            }
                        </>
                        :
                        footerComponent
                    }
                    </DialogActions>
                </div>
            }
        </Dialog>
    );
}

export default ConfirmModal;
