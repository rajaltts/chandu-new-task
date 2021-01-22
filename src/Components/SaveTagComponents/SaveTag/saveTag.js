import React, { memo, useState, useEffect } from 'react';
import ConfirmModal from '../../ConfirmModal/ConfirmModal';
import translation from '../../Translation';
import ProjectTagSelection from "../ProjectTagSelection/projectTagSelection";
import { faSave } from '@fortawesome/free-solid-svg-icons';
import TabsBuilder from '../../Tabs/tabs';
import AddProject from "../AddProject/addProject";

const SaveTag = (props) => {
    const { isModalOpen = false, hideComponent = () => { }, customerNameList = [], projectDataList = [],
        projectName = {}, customerName = {}, tagName = {}, contactName = {}, contactEmail = {},
        contactNumber = {}, saveTagData, existingProjectValidation } = props;
    const [selectedTab, setSelectedTab] = useState(0);
    const [menuList, setMenuList] = useState(customerNameList);
    const [exisitingProjectData, setExisitingProjectData] = useState({});
    const [newProjectData, setNewProjectData] = useState({});
    const [disableSave, setDisableSave] = useState(true);
    const tabs = [
        { tabName: translation("ExistingProject", "Existing Project") },
        { tabName: translation("NEW_PROJECT", "New Project") }
    ];

    useEffect(() => {
        setMenuList(customerNameList);
    }, [customerNameList]);

    const createActionsButton = (disableSave) => {
        return [
            {
                id: "Save",
                name: translation("Save", "Save"),
                icon: faSave,
                onClick: saveTagDataHandler,
                disabled: disableSave
            }
        ];
    }

    const hideComponentHandler = () => {
        if (hideComponent) {
            setSelectedTab(0);
            reseTabContent(reseTabContent);
            hideComponent();
        }
    }

    const reseTabContent = () => {
        setExisitingProjectData({});
        setNewProjectData({});
        setDisableSave(true);
    }
    
    const updateExistingTagInfo = (existingTagInfo) => {
        const { disableSave } = existingTagInfo;
        setDisableSave(disableSave);
        setExisitingProjectData(existingTagInfo);
    }

    const updateProjectInfo = (selectedNewProjectInfo) => {
        const { disableSave } = selectedNewProjectInfo;
        setDisableSave(disableSave);
        setNewProjectData(selectedNewProjectInfo)
    }

    const saveTagDataHandler = () => {
        if (saveTagData) {
            saveTagData({
                exisitingProjectData,
                newProjectData,
                selectedTab
            })
        }
    }

    const handleTabChange = (event, value) => {
        setSelectedTab(value);
        reseTabContent();
    }

    const loadComponent = () => {
        if (selectedTab) {
            return (
                <AddProject
                    customerNameList={menuList}
                    updateProjectInfo={updateProjectInfo}
                    projectName={projectName}
                    customerName={customerName}
                    tagName={tagName}
                    contactName={contactName}
                    contactEmail={contactEmail}
                    contactNumber={contactNumber}
                />
            )
        }
        else {
            return (
                <ProjectTagSelection
                    onClose={hideComponentHandler}
                    projectDataList={projectDataList}
                    onSaveTagData={updateExistingTagInfo}
                    tagName={tagName}
                    onValidation={existingProjectValidation}
                />
            )
        }
    }

    return (
        <ConfirmModal
            isModalOpen={isModalOpen}
            title={translation("SaveTo")}
            onClose={hideComponentHandler}
            hideCancel={false}
            actionButtonList={createActionsButton(disableSave)}
            fullWidth
        >
            <TabsBuilder
                tabs={tabs}
                selectedTab={selectedTab}
                handleTabChange={handleTabChange} />
            {loadComponent()}
        </ConfirmModal>
    )
}

export default memo(SaveTag);