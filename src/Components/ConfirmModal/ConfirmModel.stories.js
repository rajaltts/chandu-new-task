import React, { useState } from 'react'
import ConfirmModal from './ConfirmModal'
import './ConfirmModal.css'
import CheckCircleRoundedIcon from '@material-ui/icons/CheckCircleOutlineRounded'

export default {
    title: 'Modal/Confirm Modal',
    component: ConfirmModal,
    modalWidth: {
        control: {
            type: 'select',
        },
    },
}

const ConfirmModalTemplate = ({ ...args }) => {
    const [isClose, setIsclose] = useState(true)
    const closeConfrimModel = () => {
        setIsclose(!isClose)
    }

    const createActionsButton = () => {
        return [
            {
                id: 'Yes_Confirmtag',
                name: 'Confirm',
                onClick: onConfirm,
            },
        ]
    }

    const onConfirm = () => {
        alert('Message confirmed.')
    }

    return (
        <ConfirmModal
            {...args}
            isModalOpen={isClose}
            onClose={closeConfrimModel}
            actionButtonList={createActionsButton()}
            headerIcon={CheckCircleRoundedIcon}
        />
    )
}

const ConfirmModalTemplateForOverrideCancelButton = ({ ...args }) => {
    const [isClose, setIsclose] = useState(true)
    const closeConfrimModel = () => {
        setIsclose(!isClose)
    }
    const overrideFooterCancelButton = () => {
        alert('Cancel Overridden.')
    }

    const createActionsButton = () => {
        return [
            {
                id: 'Yes_Confirmtag',
                name: 'Confirm',
                onClick: onConfirm,
            },
        ]
    }

    const onConfirm = () => {
        alert('Message confirmed.')
    }

    return (
        <ConfirmModal
            {...args}
            isModalOpen={isClose}
            onClose={closeConfrimModel}
            overrideFooterCancelButton={overrideFooterCancelButton}
            actionButtonList={createActionsButton()}
            headerIcon={CheckCircleRoundedIcon}
        />
    )
}

export const ModalTemplate = ConfirmModalTemplate.bind({})
ModalTemplate.args = {
    dialogClassName: '',
    contentClassName: '',
    footerClassName: '',
    title: 'Confirm Modal',
    children: 'Please confirm your selection.',
    cancelDisabled: false,
    hideCancel: false,
    hideActions: false,
    disableCloseIcon: false,
    id: '',
    fullWidth: false,
    fullScreen: false,
    errorMsg: '',
    hideHeader: false,
    footerComponent: null,
}

export const ModalForOverrideCancelButton = ConfirmModalTemplateForOverrideCancelButton.bind({})
ModalForOverrideCancelButton.args = {
    dialogClassName: '',
    contentClassName: '',
    footerClassName: '',
    title: 'Confirm Modal',
    children: 'Please confirm your selection.',
    cancelDisabled: false,
    hideCancel: false,
    hideActions: false,
    disableCloseIcon: false,
    id: '',
    fullWidth: false,
    fullScreen: false,
    errorMsg: '',
    hideHeader: false,
    footerComponent: null,
}
