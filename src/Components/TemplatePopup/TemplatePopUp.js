import React from 'react';
import { Dialog } from '@progress/kendo-react-dialogs';
import { connect } from 'react-redux'
import Button from '../Button';

function TemplatePopUp(props) {

  function onToggleDeleteDialouge(flag) {
    props.onToggleDeleteDialouge(flag)
  }
  function deleteTagTemplate(e) {
    e.preventDefault()
    if (props.tagTemplateDelete) {
      props.deleteItem();
    }
    else {
      props.deleteTemplate(props.item);
    }
    props.onToggleDeleteDialouge(false)
  }
  return (
    <div>
      <Dialog title={props.popUpHeading} onClose={() => onToggleDeleteDialouge(false)} className="editTagTemplate-dialog">
        <form>
          <div>
            <label>
              <div className="confirmation_delete"><span>{props.confirmText}</span></div>
            </label>
          </div>

          <div className="dialog-but">
            <Button
              name={props.okText}
              styles="eButtonPrimary"
              style={{ backgroundColor: "#152c73", color: "white" }}
              onClick={(e) => deleteTagTemplate(e)}
              id="Delete_template"
            />
            <Button
              name={props.noText}
              styles="eButtonPrimary"
              style={{ backgroundColor: "#152c73", color: "white" }}
              onClick={() => onToggleDeleteDialouge(false)}
              id="Cancel_Delete_Template"
            />
          </div>
        </form>
      </Dialog>
    </div>
  )
}
const mapStateToProps = (state) => ({
  TagTemplates: state.getTagTemplates,
  openDialouge: state.TagTemplateOpenDialouge
});

export default connect(mapStateToProps, {})(TemplatePopUp);