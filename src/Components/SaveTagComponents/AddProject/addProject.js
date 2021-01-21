import React, { memo, useReducer, useEffect, useState } from "react";
import { intlShape, injectIntl } from "react-intl";
import { EMPTY_GUID, injectIntlTranslation } from '@carrier/workflowui-globalfunctions';
import translation from '../../Translation';
import { addProjectFields, addProjectReducer, init, fieldType, fieldKeys } from "./addProjectUtil";
import TextField from '@material-ui/core/TextField';
import saveTagStyles from "../saveTagStyles";
import AutoComplete from "../AutoComplete/autoComplete";

const AddProject = (props) => {
  const { intl, updateProjectInfo, customerNameList,
    projectName = {}, customerName = {}, tagName = {}, contactName = {}, contactEmail = {}, contactNumber = {} } = props;
  const [menuList, setMenuList] = useState(customerNameList);
  const { ContactName, ContactEmail, ContactNumber, ProjectName, TagName, CustomerName } = fieldType;
  const { tagNameContainer, tagNameLabel, errorMsg, errorBorder, nonErrorBorder, searchInput,
    tagNameLabelContainer, searchInputRoot, newProjectSeletionContainer, requiredAsterik, disableInput } = saveTagStyles();
  const [state, dispatch] = useReducer(addProjectReducer, addProjectFields(), init);

  useEffect(() => {
    updateCustomFields([
      { fieldContent: projectName, id: ProjectName },
      { fieldContent: tagName, id: TagName },
      { fieldContent: customerName, id: CustomerName },
      { fieldContent: contactName, id: ContactName },
      { fieldContent: contactEmail, id: ContactEmail },
      { fieldContent: contactNumber, id: ContactNumber },
    ]);
    return () => {
      dispatch({ type: 'reset' });
    }
  }, []);

  useEffect(() => {
    setMenuList(customerNameList);
  }, [customerNameList]);

  const updateCustomFields = (fieldData) => {
    const fields = { ...state };
    fieldData.forEach(customField => {
      const { fieldContent, id } = customField;
      const newField = fields[id];
      if (Object.keys(fieldContent).length > 0) {
        Object.keys(fieldKeys).forEach(key => {
          if (fieldContent.hasOwnProperty(key)) {
            newField[key] = fieldContent[key];
          }
        })
      }
      fields[id] = newField;
    });
    dispatch({ type: 'updateFields', fields });
  }

  const updateCustomerInfo = ({ event, id, validation, menuItem = {} }) => {
    const { target: { value } } = event;
    const { CompanyName = "", Email = "", Phone = "", CustomerName = value, CustomerID = "" } = menuItem;
    const validationMessage = validation(CustomerName, intl);
    const isDisabled = ((CustomerName !== "") && Object.keys(menuItem).length === 0) ? false : true;
    const fields = { ...state };
    fields[id].value = CustomerName;
    fields[id].error = validationMessage;
    fields[ContactName].value = CompanyName;
    fields[ContactName].error = "";
    fields[ContactName].isDisabled = isDisabled;
    fields[ContactEmail].value = Email;
    fields[ContactEmail].error = "";
    fields[ContactEmail].isDisabled = isDisabled;
    fields[ContactNumber].value = Phone;
    fields[ContactNumber].error = "";
    fields[ContactNumber].isDisabled = isDisabled;
    dispatch({ type: 'updateFields', fields });
    updateProjectHandler(fields, CustomerID);
  }

  const validateField = ({ event, id, validation }) => {
    const { target: { value } } = event;
    const validationMessage = value ? validation(value, intl) : "";
    const fields = { ...state };
    fields[id].value = value;
    fields[id].error = validationMessage;
    dispatch({ type: 'updateFields', fields });
    updateProjectHandler(fields);
  }

  const getCustomerID = (fields, CustomerID) => {
    if (CustomerID) { return CustomerID; }
    if (fields.CustomerName.value) {
      const customer = customerNameList.find(customer => customer.CustomerName === fields.CustomerName.value);
      if (customer) { return customer.CustomerID; }
    }
    return EMPTY_GUID;
  }

  const updateProjectHandler = (fields, CustomerID = "") => {
    if (updateProjectInfo) {
      const customerId = getCustomerID(fields, CustomerID);
      const projectInfo = {};
      let disableSave = false;
      Object.keys(fields).forEach(key => {
        if (fields[key].isVisible) {
          const { validation, id, value } = fields[key];
          if (validation(value, intl) && fields[key].isRequired) {
            disableSave = true;
          }
          projectInfo[key] = { id: id, value: value };
        }
      });
      updateProjectInfo({ projectInfo, disableSave, customerId })
    }
  }

  const createProjectField = (field) => {
    const { label, defaultLabel = "", value = "", id, error, isDisabled,
      placeHolder, isVisible, validation, isAutoComplete, isRequired } = field;
    const errorClass = error ? errorBorder : nonErrorBorder;
    if (isVisible) {
      return (
        <div className={tagNameContainer}>
          <div className={tagNameLabel}>
            <span>{translation(label, defaultLabel)}</span>
            {isRequired && <span className={requiredAsterik}>*</span>}
          </div>
          <div className={tagNameLabelContainer} >
            {isAutoComplete
              ?
              <AutoComplete
                value={value}
                menuList={menuList}
                field={field}
                validateField={updateCustomerInfo}
                isError={error ? true : false}
              />
              :
              <TextField
                className={searchInput}
                value={value}
                variant="outlined"
                required={isRequired}
                InputProps={{
                  classes: {
                    input: searchInputRoot,
                    notchedOutline: errorClass,
                    disabled: disableInput
                  }
                }}
                disabled={isDisabled}
                placeholder={injectIntlTranslation(intl, placeHolder, defaultLabel)}
                name={id}
                margin={'dense'}
                size={'small'}
                onChange={event => validateField({ event, id, validation })}
              />
            }
            <span className={errorMsg}>{error}</span>
          </div>
        </div>
      )
    }
    return null;
  }
  return (
    <div className={newProjectSeletionContainer}>
      {
        Object.keys(state).map(key => createProjectField(state[key]))
      }
    </div>
  )
}

AddProject.propTypes = {
  intl: intlShape.isRequired
};

export default injectIntl(memo(AddProject));