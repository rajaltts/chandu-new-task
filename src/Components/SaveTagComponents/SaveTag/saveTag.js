import React, { memo, useState, useEffect, Fragment } from 'react'
import ConfirmModal from '../../ConfirmModal/ConfirmModal'
import translation from '../../Translation'
import ProjectTagSelection from '../ProjectTagSelection/projectTagSelection'
import SaveIcon from '@material-ui/icons/Save'
import faSave from '@fortawesome/free-solid-svg-icons/faSave'
import AddProject from '../AddProject/addProject'
import saveTagStyles from '../saveTagStyles'
import { injectIntlTranslation } from '@carrier/workflowui-globalfunctions'
import TabPanel from '../../TabsComponent/TabPanel'
import TabsContainer from '../../TabsComponent/TabsContainer'
import TagName from '../TagName/TagName'

const SaveTag = (props) => {
    const {
        isModalOpen = false,
        hideComponent = () => {},
        customerNameList = [],
        projectDataList = [],
        projectName = {},
        customerName = {},
        tagName = {},
        contactName = {},
        contactEmail = {},
        contactNumber = {},
        saveTagData,
        defaultSelectedProject,
        existingProjectValidation,
        errorMsg = '',
        intl,
        onValidation,
        onSearchTextChange = null,
        isLoading = false,
        setError,
    } = props
    const classes = saveTagStyles()
    const [menuList, setMenuList] = useState(customerNameList)
    const [exisitingProjectData, setExisitingProjectData] = useState({})
    const [newProjectData, setNewProjectData] = useState(null)
    const [disableSave, setDisableSave] = useState(true)
    const [selectedProject, setSelectedProject] = useState(defaultSelectedProject)
    const tabs = [
        { name: translation('ExistingProject', 'Existing Project') },
        { name: translation('NewProject', 'New Project') },
    ]
    const [errorMessage, setErrorMessage] = useState(errorMsg)
    const [saveTagActiveTab, setSaveTagActiveTab] = useState(0)
    const [projectError, setProjectError] = useState('')
    const [tagError, setTagError] = useState('')
    const [tagNameForSaveSelection, setTagNameForSaveSelection] = useState('')
    const isDisabled = tagName?.isDisabled || false

    useEffect(() => {
        if (selectedProject) {
            setProjectError('')
        } else if (!selectedProject && tagNameForSaveSelection) {
            setProjectError(injectIntlTranslation(intl, 'validationAtLeastOneProject', 'Please select a Project.'))
        }
        let disableSave = false
        const tagNameValue = tagNameForSaveSelection.trim()
        const tagNameStatus = (!isDisabled && !tagNameValue.trim()) || !!tagError
        switch (saveTagActiveTab) {
            case 0:
                if (tagNameStatus || !selectedProject) disableSave = true
                break
            case 1:
                if (tagNameStatus) {
                    disableSave = true
                }
                if (newProjectData?.projectInfo) {
                    const { projectInfo } = newProjectData
                    Object.keys(projectInfo).forEach((key) => {
                        if (projectInfo[key].error) {
                            disableSave = true
                        }
                    })
                }
                break
        }
        updateExistingTagInfo({
            tagName: tagNameValue,
            projectData: selectedProject,
            disableSave,
        })
    }, [tagNameForSaveSelection, selectedProject, newProjectData])

    useEffect(() => {
        setMenuList(customerNameList)
    }, [customerNameList])

    useEffect(() => {
        if (errorMsg && disableSave) {
            setDisableSave(true)
        }
        setErrorMessage(errorMsg)
    }, [errorMsg])

    const createActionsButton = (disableSave) => {
        return [
            {
                id: 'Save',
                name: translation('Save', 'Save'),
                icon: faSave,
                onClick: saveTagDataHandler,
                disabled: disableSave,
            },
        ]
    }

    const hideComponentHandler = () => {
        if (hideComponent) {
            setSaveTagActiveTab(0)
            reseTabContent(reseTabContent)
            hideComponent()
        }
    }

    const updateExistingTagInfo = (existingTagInfo) => {
        const { disableSave, projectData } = existingTagInfo
        if (!projectData) {
            setError('')
        }
        setDisableSave(disableSave)
        setExisitingProjectData(existingTagInfo)
    }

    const updateProjectInfo = (selectedNewProjectInfo) => {
        const { disableSave } = selectedNewProjectInfo
        setDisableSave(disableSave)
        setNewProjectData(selectedNewProjectInfo)
    }

    const saveTagDataHandler = () => {
        if (saveTagData) {
            setDisableSave(true)
            if (!exisitingProjectData?.projectData && newProjectData.projectInfo) {
                newProjectData.projectInfo['TagName'] = {
                    value: exisitingProjectData.tagName,
                }
            }
            saveTagData({
                exisitingProjectData,
                newProjectData,
                saveTagActiveTab,
            })
        }
    }

    const handleSaveTagTabChange = (activeTab) => {
        setSaveTagActiveTab(activeTab)
        reseTabContent()
    }

    const reseTabContent = () => {
        setSelectedProject(null)
        setExisitingProjectData({})
        setNewProjectData(null)
        setDisableSave(true)
        setProjectError('')
        setError('')
    }

    const onProjectSelect = (project) => {
        setSelectedProject(project)
    }

    const getTagNameProps = () => {
        return {
            tagName,
            intl: intl,
            setTagNameForSaveSelection,
            onValidation,
            saveTagActiveTab,
            onValidation: existingProjectValidation,
            setProjectError,
            selectedProject,
            saveTagActiveTab,
            setTagError,
        }
    }

    return (
        <ConfirmModal
            isModalOpen={isModalOpen}
            title={translation('SaveSelection')}
            onClose={hideComponentHandler}
            hideCancel={false}
            actionButtonList={createActionsButton(disableSave)}
            fullWidth
            disableCloseIcon
            headerIcon={SaveIcon}
            errorMsg={errorMessage}
            contentClassName={classes.saveTagContent}
        >
            <TagName tagNameProps={getTagNameProps()} saveSelection />

            <div className={classes.helperText}>
                {injectIntlTranslation(
                    intl,
                    'SaveTagHelperMessage',
                    'Associate the selection to an existing or a new project.'
                )}
            </div>

            <TabsContainer onTabChange={handleSaveTagTabChange} defaultActiveTab={0} tabs={tabs} />

            <TabPanel value={saveTagActiveTab} index={0}>
                <ProjectTagSelection
                    projectDataList={projectDataList}
                    onProjectSelect={onProjectSelect}
                    projectError={projectError}
                    onSaveTagData={updateExistingTagInfo}
                    tagName={tagName}
                    onValidation={existingProjectValidation}
                    saveSelection
                    defaultSelectedProject={defaultSelectedProject}
                    onSearchTextChange={onSearchTextChange}
                    isLoading={isLoading}
                    setProjectError={setProjectError}
                />
            </TabPanel>
            <TabPanel value={saveTagActiveTab} index={1}>
                <AddProject
                    customerNameList={menuList}
                    updateProjectInfo={updateProjectInfo}
                    projectName={projectName}
                    customerName={customerName}
                    contactName={contactName}
                    contactEmail={contactEmail}
                    contactNumber={contactNumber}
                    setErrorMessage={setErrorMessage}
                    tagName={tagNameForSaveSelection}
                    saveSelection
                />
            </TabPanel>
        </ConfirmModal>
    )
}

export default memo(SaveTag)
