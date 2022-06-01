import React from 'react'
import makeStyles from '@material-ui/core/styles/makeStyles'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import Button from '@material-ui/core/Button'
import CloseIcon from '@material-ui/icons/Close'
import translation from '../Translation'
import IconButton from '@material-ui/core/IconButton'
import ErrorIcon from '@material-ui/icons/Error'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import './ConfirmModal.css'
import PropTypes from 'prop-types'

const useStyles = makeStyles((theme) => ({
    paper: {
        maxHeight: '90vh !important',
        padding: '16px 24px',
    },
    root: {
        padding: '0px 0px',
        marginTop: '16px',
    },
    iconButtonRoot: {
        justifyContent: 'center',
        padding: '4px !important',
    },
    footerButton: {
        fontSize: '1rem',
        lineHeight: '1.2rem',
        padding: '9px 24px',
        textTransform: 'none',
        border: '1px solid rgba(0, 0, 0, 0.23)',
    },
}))

const ConfirmModal = (props) => {
    const {
        dialogClassName = null,
        contentClassName,
        footerClassName,
        title,
        isModalOpen,
        onClose,
        children,
        cancelDisabled,
        hideCancel,
        hideActions,
        disableCloseIcon,
        modalWidth,
        overrideFooterCancelButton,
        id = '',
        actionButtonList = [],
        errorMsg = '',
        fullWidth = false,
        fullScreen = false,
        footerComponent = null,
        hideHeader = false,
        headerIcon,
    } = props
    const classes = useStyles()
    const cancelText = translation('Cancel')

    const onCancelButtonClick = (event) => {
        if (overrideFooterCancelButton) {
            overrideFooterCancelButton(event)
        } else if (onClose) {
            !cancelDisabled && onClose(false, event)
        }
    }

    const actionButtonClickHandler = (event, button) => {
        !button.disabled && button.onClick(event)
    }

    return (
        <Dialog
            id={id}
            aria-label={title}
            open={isModalOpen}
            onClose={onClose}
            maxWidth={modalWidth}
            scroll='paper'
            classes={{ paper: classes.paper, paperScrollPaper: dialogClassName }}
            disableBackdropClick
            fullWidth={fullWidth}
            fullScreen={fullScreen}
        >
            {!hideHeader && (
                <div className='customModalHeader'>
                    {headerIcon && React.createElement(headerIcon, { className: 'customModalHeaderIcon' })}
                    <span className='customModalTitle'>{title}</span>
                    {!disableCloseIcon && (
                        <IconButton classes={{ root: classes.iconButtonRoot }} onClick={onCancelButtonClick}>
                            <CloseIcon
                                fontSize='small'
                                className='customModalCloseIcon'
                                titleAccess={translation('close')}
                            />
                        </IconButton>
                    )}
                </div>
            )}
            <DialogContent classes={{ root: classes.root }} className={contentClassName}>
                {children}
            </DialogContent>
            {!hideActions && (
                <div className={footerClassName || 'customModalDialogFooter'}>
                    {errorMsg && (
                        <div className='customModalDialogError'>
                            <ErrorIcon fontSize='small' className='customModalCloseIcon customModalRightMargin' />
                            {errorMsg}
                        </div>
                    )}
                    <DialogActions classes={{ root: classes.iconButtonRoot }}>
                        {!footerComponent ? (
                            <>
                                {!hideCancel && (
                                    <Button
                                        classes={{ root: classes.footerButton }}
                                        id='customModalCancel'
                                        variant='outlined'
                                        size='large'
                                        name={cancelText}
                                        onClick={onCancelButtonClick}
                                        disabled={cancelDisabled}
                                    >
                                        {cancelText}
                                    </Button>
                                )}
                                {actionButtonList.length > 0 &&
                                    actionButtonList.map((actionButton) => {
                                        return (
                                            <Button
                                                classes={{ root: classes.footerButton }}
                                                size='large'
                                                variant={actionButton.variant || 'contained'}
                                                color={actionButton.color || 'primary'}
                                                key={actionButton.id}
                                                id={actionButton.id}
                                                name={actionButton.name}
                                                onClick={(event) => actionButtonClickHandler(event, actionButton)}
                                                disabled={actionButton.disabled}
                                            >
                                                {actionButton.name}
                                            </Button>
                                        )
                                    })}
                            </>
                        ) : (
                            footerComponent
                        )}
                    </DialogActions>
                </div>
            )}
        </Dialog>
    )
}

ConfirmModal.defaultProps = {
    modalWidth: undefined,
}

ConfirmModal.propTypes = {
    modalWidth: PropTypes.oneOf(['false', 'xs', 'sm','md','lg','xl']),
}

export default ConfirmModal
