import React from 'react'
import RenameTemplatePopUp from './RenameTemplatePopUp'
import translation from '../Translation'

export default {
    title: 'TemplatePopup/Rename Template PopUp',
    component: RenameTemplatePopUp,
}

const RenameTemplatePopUpTemplate = ({ ...args }) => {
    const [opendialouge, setOpendialouge] = React.useState(true)
    function onToggleReplaceDialouge(flag) {
        setOpendialouge(flag)
    }

    return (
        <RenameTemplatePopUp
            {...args}
            onToggleEditDialouge={onToggleReplaceDialouge}
            opendialouge={opendialouge}
            title={translation('Edit Tag Templates')}
            tagNameRequiredText={translation('TagNameRequired')}
            notAllowedCharactersText={translation('NotAllowedCharacters')}
            maxLengthError={translation('MaxLengthError')}
            templateNameText={translation('TagTemplateName')}
            existingTemplateText={translation('ExistingTemplate')}
            cancelText={translation('Cancel')}
            renameTemplateText={translation('Rename')}
            duplicateTemplateNameText={translation('DuplicateTemplateNameMessage')}
        />
    )
}

export const RenameTemplatePopUpModal = RenameTemplatePopUpTemplate.bind({})
RenameTemplatePopUpModal.args = {
    opendialouge: true,
    title: '',
    tagNameRequiredText: '',
    notAllowedCharactersText: '',
    maxLengthError: '',
}
