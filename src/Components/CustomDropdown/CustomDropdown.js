import React, { useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSave, faSortDown, faTrashAlt, faEdit } from '@fortawesome/free-solid-svg-icons'
import { guid } from '@carrier/workflowui-globalfunctions';

function CustomDropdown(props) {
  const node = useRef();
  const [open, setOpen] = React.useState(false);

  function onDropBtnClick() {
    props.onDropBtnClick(open, props.conceptTemplateType);
    setOpen(!open)
  }
  function onClickSaveTagPopUp() {
    props.openSaveTagTemplate(props.conceptTemplateType);
  }
  function editTagTemplate(item) {
    props.editTagTemplate(item)
    setOpen(!open)
  }
  function deleteTagTemplate(item) {
    props.deleteTagTemplate(item, "delete")
    setOpen(!open)
  }
  function onClickOfDropdownMenu(templateData) {
    let unitValue;
    if (props.UnitSystem === "Metric") {
      unitValue = "SI"
    } else {
      unitValue = "IP"
    }
    props.onItemClick(templateData, unitValue, props.conceptTemplateType)
    setOpen(!open)
  }
  function accordianId() {
    let getAccordianID = props.TemplateNames && props.TemplateNames.filter(item => item.AccordianID === props.conceptTemplateType);
    let Valid = props.TemplateNames && props.TemplateNames.length && getAccordianID.length || !(props.TemplateNames && props.TemplateNames.length);
    return Valid;
  }

  useEffect(() => {
    document.addEventListener("mousedown", handleClick);

    return () => {
      document.removeEventListener("mousedown", handleClick);
    };
  }, []);

  const handleClick = e => {
    if (node.current.contains(e.target)) {
      return;
    }
    setOpen(false);
  };

  return (
    <div id="SaveTagTemplateBtn"
      className={props.conceptTemplate ? "wbtnDropdown conceptTemplate" : "wbtnDropdown"}
      ref={node} >
      <button className="Wbtn" onClick={onClickSaveTagPopUp}>
        <FontAwesomeIcon icon={faSave} className="faCusLeft" />
        {props.HeadingName}
      </button>
      <button className="Wbtn GroupBtn" onClick={onDropBtnClick}>
        {props.dropDownName}
        <FontAwesomeIcon icon={faSortDown} />
      </button>
      {open ? <ul className="dropdownBox">
        {accordianId() && props.TemplateNames && props.tagTemplates ? props.tagTemplates.map((item) => {
          return (
            <li key={guid()}>
              <span onClick={() => onClickOfDropdownMenu(item)}> {item.TagTemplateName || item.TemplateName || item.Attributes.Description} </span>
              {!item.defaultValues &&
                <div>
                  <span
                    className="ActionLink"
                    id="TagTemplateEditlink"
                    data-action="TagTemplateEdit"
                    onClick={() => editTagTemplate(item)}
                  >
                    <FontAwesomeIcon className="columncolor" icon={faEdit} />
                  </span>
                  <span
                    className="ActionLink"
                    id="TagTemplateDeletelink"
                    data-action="TagTemplatetDelete"
                    onClick={() => deleteTagTemplate(item)}
                  >
                    <FontAwesomeIcon className="columncolor" icon={faTrashAlt} />
                  </span>
                </div>
              }
            </li>
          )
        }) : "Loading..."}
      </ul> : null}
    </div>
  )
}

export default CustomDropdown;