import React from 'react';
import ConfirmModal from '../ConfirmModal/ConfirmModal';
import { faSave, faTimes } from '@fortawesome/free-solid-svg-icons';
import { validateFormFields, isDuplicateTagTemplate } from '@carrier/workflowui-globalfunctions';
import Button from '../Button';
import TextField from '@material-ui/core/TextField';
import RenameTemplatePopUpStyles from './RenameTemplatePopUpStyles';

function RenameTemplatePopUp(props) {
  const [tagName, setTagName] = React.useState();
  const [tagValidationError, setTagValidationError] = React.useState();
  const tagNameRef = React.useRef();
  const { tagNameContainer, tagNameLabel, tagNameField, errorBorder, nonErrorBorder, errorMsg, fieldDisabled } = RenameTemplatePopUpStyles();
  const errorClass = tagValidationError ? errorBorder : nonErrorBorder;

  function onToggleEditDialouge() {
    setTagName("")
    setTagValidationError("")
    props.onToggleEditDialouge(!props.opendialouge)
  }

  function handleChange(e) {
    const value = e.target.value;
    setTagName(value);
    const validations = {
      regExp: /^[A-Za-z0-9 _]*[A-Za-z0-9][A-Za-z0-9 _.]*$/,
      maxLength: 50
    }
    const validationMessages = { nameRequired: props.tagNameRequiredText, notAllowedCharacters: props.notAllowedCharactersText, maxLengthError: props.maxLengthError }

    const error = validateFormFields(value, props.customValidations || validations, validationMessages);
    if (error !== tagValidationError)
      setTagValidationError(error);
  }

  function onUpdateTagTemplate(e) {
    e.preventDefault()
    if (tagName) {
      let isduplicate = false;
      if (props.allTemplates && tagName !== props.item.TemplateName) {
        isduplicate = isDuplicateTagTemplate(props.allTemplates, tagName);
      }
      if (isduplicate) {
        setTagValidationError(props.duplicateTemplateNameText);
      }
      else {
        props.onUpdateTagTemplate(e, tagName)
        setTagName("")
      }
    }
    else {
      setTagValidationError(props.tagNameRequiredText)
      tagNameRef.current.focus();
    }
  }

  const createRenameTemplateButtons = () => {
    return (
      <div className="dialog-but">
        <Button
          icon={faTimes}
          name={props.cancelText}
          styles="eButtonPrimary"
          onClick={onToggleEditDialouge}
          id="Cancel_Rename"
        />
        <Button
          icon={faSave}
          name={props.renameTemplateText}
          styles="eButtonPrimary"
          onClick={(e) => onUpdateTagTemplate(e)}
          id="Rename_TagTemplate"
        />
      </div>
    );
  }

  return (
    <div>
      {props.opendialouge && <ConfirmModal
        isModalOpen={true}
        title={props.title}
        fullWidth
        hideCancel
        onClose={onToggleEditDialouge}
        footerComponent={createRenameTemplateButtons()}
        className="editTagTemplate-dialog"
      >
        <div className={tagNameContainer}>
          <div className={tagNameLabel}>
            <span> {props.templateNameText}</span>
          </div>
          <div className={tagNameField}>
            <TextField
              fullWidth
              id="rename_tagtemplate"
              value={tagName}
              variant="outlined"
              required={true}
              InputProps={{
                classes: {
                  notchedOutline: errorClass,
                }
              }}
              name="tagName"
              margin={'dense'}
              size={'small'}
              onChange={handleChange}
              ref={tagNameRef}
            />
            <span className={errorMsg}>{tagValidationError}</span>
          </div>
        </div>
        <div className={tagNameContainer}>
          <div className={tagNameLabel}>
            <span>{props.existingTemplateText}</span>
          </div>
          <div className={tagNameField}>
            <TextField
              fullWidth
              className={fieldDisabled}
              id="rename_tagtemplate_disabled"
              value={props.item && props.item.TemplateName}
              variant="outlined"
              required={true}
              name="tagName"
              margin={'dense'}
              size={'small'}
              onChange={handleChange}
              disabled
            />
          </div>
        </div>
      </ConfirmModal>}
    </div>
  )
}

export default RenameTemplatePopUp;