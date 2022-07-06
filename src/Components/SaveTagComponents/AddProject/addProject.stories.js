import React, { useState } from 'react'
import AddProject from './addProject'
import ConfirmModal from '../../ConfirmModal/ConfirmModal'
import translation from '../../Translation'
import saveTagStyles from '../saveTagStyles'

export default {
    title: 'Component/Add Project',
    component: AddProject,
}

const AddProjectTemplate = ({ ...args }) => {
    const [projectName, setProjectName] = useState('')
    const [isOpen, setIsOpen] = useState(true)
    const classes = saveTagStyles()

    const createActionsButton = () => {
        return [
            {
                id: 'Yes_Cancelag',
                name: 'Cancel',
                onClick: cancelHandler,
            },
            {
                id: 'Yes_Confirmtag',
                name: 'Save',
                onClick: saveTagDataHandler,
                disabled: false,
            },
        ]
    }
    const cancelHandler = () => {
        return setIsOpen(false)
    }
    const saveTagDataHandler = () => {
        return alert(projectName)
    }
    const customerList = []
    const tagvalue = () => {}
    const updateProject = (updateProjectInfo) => {
        if (updateProjectInfo.projectInfo.ProjectName.value) {
            setProjectName(updateProjectInfo.projectInfo.ProjectName.value)
        }
    }

    const saveSelectionInfo = () => {
        return
    }

    const contactinfo = () => {
        return {
            error: '',
            id: 'ContactName',
            value: '',
            isDisabled: true,
        }
    }

    const contactEmailInfo = () => {
        return {
            error: '',
            id: 'ContactEmail',
            value: '',
            isDisabled: true,
        }
    }

    const contactNumberInfo = () => {
        return {
            error: '',
            id: 'ContactNumber',
            value: '',
            isDisabled: true,
        }
    }

    return (
        <ConfirmModal
            isModalOpen={isOpen}
            title={translation('New Project')}
            hideCancel={true}
            fullWidth
            disableCloseIcon
            errorMsg={''}
            actionButtonList={createActionsButton()}
            contentClassName={classes.saveTagContent}>
            <AddProject
                {...args}
                customerNameList={customerList}
                tagName={tagvalue()}
                updateProjectInfo={updateProject}
                saveSelection={saveSelectionInfo}
                contactName={contactinfo()}
                contactEmail={contactEmailInfo()}
                contactNumber={contactNumberInfo()}
            />
        </ConfirmModal>
    )
}

export const AddProjectModal = AddProjectTemplate.bind({})
AddProjectModal.args = {
    updateProjectInfo: null,
    projectName: '',
    contactName: '',
    contactEmail: '',
    contactNumber: '',
    saveSelection: null,
    tagName: null,
}
