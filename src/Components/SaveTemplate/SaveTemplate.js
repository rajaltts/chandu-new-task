import React, { memo, useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { CloseSaveTemplate } from '@carrier/workflowui-globalfunctions';
import ExistingTemplate from './ExistingTemplate/ExistingTemplate';
import NewTemplate from './NewTemplate/NewTemplate';
import translation from "../Translation";
import ConfirmModal from "../ConfirmModal/ConfirmModal";
import TabsContainer from "../TabsComponent/TabsContainer";
import SaveIcon from "@material-ui/icons/Save";

const SaveTemplate = (props) => {
    const { CloseSaveTemplate, saveTemplate, dispatch, intl, eCatAppService } = props;
    const {
        isTemplateModalOpen,
        lookUpKey = "",
        isLoading = true,
        existingTemplates = [],
        errorMsg = '',
        saveTemplateHandler = null,
        validationHandler = null
    } = saveTemplate;
    const [selectedTab, setSelectedTab] = useState(0);
    const [disableSave, setDisableSave] = useState(true);
    const tabs = [
        { name: translation("ExistingTemplate", "Existing Template") },
        { name: translation("NewTemplate", "New Template") }
    ];
    const [errorMessage, setErrorMessage] = useState(errorMsg);
    const [templateInfo, setTemplateInfo] = useState({});

    useEffect(() => {
        if (errorMsg && disableSave) {
            setDisableSave(false);
        }
        setErrorMessage(errorMsg);
    }, [errorMsg]);

    const createActionsButton = (disableSave) => {
        return [
            {
                id: "Save",
                name: translation("Save", "Save"),
                onClick: saveTemplateDataHandler,
                disabled: disableSave
            }
        ];
    }

    const hideComponentHandler = () => {
        setSelectedTab(0);
        reseTabContent();
        CloseSaveTemplate();
    }

    const reseTabContent = () => {
        setDisableSave(true);
        setTemplateInfo({});
    }

    const saveTemplateDataHandler = () => {
        if (saveTemplateHandler) {
            const { newTemplateName, existingTemplateInfo } = templateInfo
            saveTemplateHandler(newTemplateName, existingTemplateInfo, dispatch, intl);
        }
    }

    const handleTabChange = (value) => {
        if (value == 0) {
            setErrorMessage('')
        }
        setSelectedTab(value);
        reseTabContent();
    }

    const updateTemplateStatus = ({
        errorMsg = "",
        newTemplateName = "",
        existingTemplateInfo = {},
    }) => {
        setErrorMessage(errorMsg)
        if (!errorMsg) {
            setDisableSave(false)
        }
        else {
            setDisableSave(true)
        }
        setTemplateInfo({ newTemplateName, existingTemplateInfo })
    }

    return (
        <ConfirmModal
            isModalOpen={isTemplateModalOpen}
            title={translation("SaveAsTemplateHeader", "Save Template")}
            onClose={hideComponentHandler}
            hideCancel={false}
            actionButtonList={createActionsButton(disableSave)}
            errorMsg={errorMessage}
            headerIcon={SaveIcon}
        >
            <TabsContainer
                tabs={tabs}
                defaultActiveTab={selectedTab}
                onTabChange={handleTabChange}
            />
            {(selectedTab) ?
                <NewTemplate
                    validationHandler={validationHandler}
                    intl={intl}
                    updateTemplateStatus={updateTemplateStatus}
                />
                :
                <ExistingTemplate
                    updateTemplateStatus={updateTemplateStatus}
                    existingTemplates={existingTemplates}
                    lookUpKey={lookUpKey}
                    isLoading={isLoading}
                />
            }
        </ConfirmModal>
    )
}

export default connect(null, { CloseSaveTemplate })(memo(SaveTemplate))