import React from 'react';
import { Dialog } from '@progress/kendo-react-dialogs';
import { faSave, faTimes } from '@fortawesome/free-solid-svg-icons';
import { validateFormFields, isDuplicateTagTemplate } from '@carrier/workflowui-globalfunctions';
import Button from '../Button';

function RenameTemplatePopUp(props) {
  const [tagName, setTagName] = React.useState();
  const [tagValidationError, setTagValidationError] = React.useState();
  const tagNameRef = React.useRef();

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
  return (
    <div>
      {props.opendialouge && <Dialog title={props.title} onClose={onToggleEditDialouge} className="editTagTemplate-dialog">
        <form className="">
          <div className="">
            <label className="">
              <div className="editTagTemplate-dialog-dimensions"><span>{props.templateNameText}</span></div>
              <div className="message textBoxwidth">
                <input
                  className="k-textbox form-control"
                  name="tagName"
                  value={tagName}
                  onChange={handleChange}
                  ref={tagNameRef}
                />
                <span className="errorMsg">{tagValidationError}</span>
              </div>
            </label>
            <label className="">
              <div className="editTagTemplate-dialog-dimensions"><span>{props.existingTemplateText}</span></div>
              <div className="message textBoxwidth">
                <input
                  className="k-textbox form-control"
                  name="tagName"
                  value={props.item && props.item.TemplateName}
                  onChange={handleChange}
                  disabled
                />
              </div>
            </label>
          </div>

          <div className="dialog-but">
            <Button
              icon={faTimes}
              name={props.cancelText}
              styles="eButtonPrimary"
              style={{ backgroundColor: "#152c73", color: "white" }}
              onClick={onToggleEditDialouge}
              id="Cancel_Rename"
            />
            <Button
              icon={faSave}
              name={props.renameTemplateText}
              styles="eButtonPrimary"
              style={{ backgroundColor: "#152c73", color: "white" }}
              onClick={(e) => onUpdateTagTemplate(e)}
              id="Rename_TagTemplate"
            />
          </div>
        </form>
      </Dialog>}
    </div>
  )
}

export default RenameTemplatePopUp;