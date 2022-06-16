import React from 'react'
import ConfirmModal from '../ConfirmModal/ConfirmModal'
import { connect } from 'react-redux'
import Button from '../Button'
import TemplatePopUpStyles from './TemplatePopUpStyles'

function TemplatePopUp(props) {
    const { deleteConfirmationText, deleteConfirmationBody } = TemplatePopUpStyles()

    function onToggleDeleteDialouge(flag) {
        props.onToggleDeleteDialouge(flag)
    }
    function deleteTagTemplate(e) {
        e.preventDefault()
        if (props.tagTemplateDelete) {
            props.deleteItem()
        } else {
            props.deleteTemplate(props.item)
        }
        props.onToggleDeleteDialouge(false)
    }

    const createRemoveTemplateButtons = () => {
        return (
            <div className='dialog-but'>
                <Button
                    name={props.okText}
                    styles='eButtonPrimary'
                    onClick={(e) => deleteTagTemplate(e)}
                    id='Delete_template'
                />
                <Button
                    name={props.noText}
                    styles='eButtonPrimary'
                    onClick={() => onToggleDeleteDialouge(false)}
                    id='Cancel_Delete_Template'
                />
            </div>
        )
    }

    return (
        <ConfirmModal
            isModalOpen={true}
            title={props.popUpHeading}
            fullWidth
            hideCancel
            onClose={() => onToggleDeleteDialouge(false)}
            footerComponent={createRemoveTemplateButtons()}
            className='editTagTemplate-dialog'>
            <div className={deleteConfirmationBody}>
                <div className='confirmation_delete'>
                    <span className={deleteConfirmationText}>{props.confirmText}</span>
                </div>
            </div>
        </ConfirmModal>
    )
}
const mapStateToProps = (state) => ({
    TagTemplates: state.getTagTemplates,
    openDialouge: state.TagTemplateOpenDialouge,
})

export default connect(mapStateToProps, {})(TemplatePopUp)
