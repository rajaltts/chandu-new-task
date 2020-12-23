import React, { useState, memo, useEffect, Fragment } from 'react';
import { injectIntl } from "react-intl";
import translation from '../Translation';
import projectTagSelectionStyles from "./projectTagSelectionStyles";
import { validateFormFields, injectIntlTranslation } from "@carrier/workflowui-globalfunctions";
import TextField from '@material-ui/core/TextField';
import Radio from '@material-ui/core/Radio';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import List from '@material-ui/core/List';
import debounce from "lodash/debounce";
import Box from '@material-ui/core/Box';

const ProjectTagSelection = (props) => {
    const { intl, projectDataList = [], isTagNameDisabled = false, tagLabel = "",
        checkValidation, onSave, onValidation } = props;
    const [dataItem, setDataItem] = useState();
    const [displayProjectNames, setDisplayProjectNames] = useState([]);
    const [tagName, setTagName] = useState(tagLabel);
    const [existingErrorTagName, setExistingErrorTagName] = useState("");
    const [searchValue, setSearchValue] = useState("");
    const [projectError, setProjectError] = useState("");
    const { tagNameContainer, tagNameLabel, errorMsg, searchInput, radioRoot, tagNameLabelContainer,
        radioSection, labelRoot, label, searchInputRoot, noRecords } = projectTagSelectionStyles();
    const [fetchState, setFetchState] = useState(false);

    useEffect(() => {
        if (projectDataList.length > 0) {
            setDisplayProjectNames(projectDataList);
            setFetchState(true);
        }
    }, [projectDataList])

    useEffect(() => {
        if (checkValidation) {
            saveTagAction();
        }
    }, [checkValidation])

    const searchProjects = (value) => {
        if (value) {
            const result = projectDataList && projectDataList.filter((item) => {
                return item.ProjectName.toLowerCase().search(value.toLowerCase()) !== -1;
            });
            setDisplayProjectNames(result);
        }
        else {
            setDisplayProjectNames(projectDataList);
        }
    }

    const validateForm = ({ target: { value } }) => {
        setTagName(value);
        let error = "";
        if (onValidation) {
            error = onValidation(value);
        }
        else {
            const validations = {
                regExp: /^[^'\"&\/#,<>|\\\\]*$/,
                maxLength: 100
            };
            const validationMessages = {
                tagNameRequired: injectIntlTranslation(intl, "Tagnamerequired", "Tag name required"),
                notAllowedCharacters: injectIntlTranslation(intl, "OnlyAlphabetsAndUnderscoreMessage", "Input should contain alphabets and underscore only"),
                maxLengthError: injectIntlTranslation(intl, ("TextRangeValidationMessage"), "Number of characters should be between {0} and {1}").replace('{0}', 1).replace('{1}', 100)
            }
            error = validateFormFields(value, validations, validationMessages);
        }
        if (error !== existingErrorTagName) {
            setExistingErrorTagName(error);
        }
    }

    const setProjectID = (item) => {
        setDataItem(item);
        setProjectError("");
    }

    const onChange = ({ target: { value } }) => {
        setSearchValue(value);
        debounce(searchProjects(value), 200)
    }

    const saveTagAction = (event) => {
        if (!tagName) {
            setExistingErrorTagName(injectIntlTranslation(intl, "Tagnamerequired", "Tag name required"));
        }
        else if (!dataItem) {
            return setProjectError(injectIntlTranslation(intl, "validationAtLeastOneProject", "Please select a Project."));
        }
        else {
            onSave && onSave({ tagName, projectData: dataItem });
        }
    }

    const isRadioSelected = (id) => {
        if (dataItem) {
            return dataItem.ProjectID === id
        }
        return false;
    }

    const showNoRecordsMsg = () => {
        if (fetchState && displayProjectNames.length <= 0) {
            return (
                <Box
                    boxShadow={3}
                    bgcolor="background.paper"
                >
                    <span className={noRecords}>
                        {injectIntlTranslation(intl, "NoRecordsAvailable", "No Records Available")}
                    </span>
                </Box>
            )
        }
        return null;
    }

    return (
        <Fragment>
            <div className={tagNameContainer}>
                <TextField
                    className={searchInput}
                    variant="outlined"
                    InputProps={{
                        classes: {
                            input: searchInputRoot,
                        },
                    }}
                    placeholder={injectIntlTranslation(intl, "SearchProject", "Search project here")}
                    autoFocus
                    margin={'dense'}
                    size={'small'}
                    value={searchValue}
                    onChange={onChange}
                />
            </div>
            <div className={tagNameContainer}>
                <div className={tagNameLabel}>
                    <span>{translation("TagName", "Tag Name")}</span>
                </div>
                <div className={tagNameLabelContainer} >
                    <TextField
                        className={searchInput}
                        value={tagName}
                        variant="outlined"
                        InputProps={{
                            classes: {
                                input: searchInputRoot,
                            },
                        }}
                        disabled={isTagNameDisabled}
                        placeholder={injectIntlTranslation(intl, "TagName", "Tag Name")}
                        name="tagName"
                        margin={'dense'}
                        size={'small'}
                        onChange={validateForm}
                    />
                    <span className={errorMsg}>{existingErrorTagName}</span>
                </div>
            </div>
            <span className={errorMsg}>{projectError}</span>
            {displayProjectNames.length > 0 ?
                <Box
                    boxShadow={3}
                    bgcolor="background.paper"
                >
                    <List className={radioSection} >
                        {displayProjectNames.map(item => {
                            return (
                                <FormControlLabel
                                    id={item.ProjectID}
                                    value={item.ProjectName}
                                    classes={{
                                        root: labelRoot,
                                        label: label
                                    }}
                                    control={<Radio
                                        color="primary"
                                        disableRipple
                                        size={"small"}
                                        classes={{
                                            root: radioRoot
                                        }}
                                        checked={isRadioSelected(item.ProjectID)}
                                    />}
                                    label={item.ProjectName}
                                    labelPlacement="end"
                                    onChange={() => setProjectID(item)}
                                />
                            )
                        })}
                    </List>
                </Box>
                :
                showNoRecordsMsg()
            }
        </Fragment>
    )
}

export default injectIntl((memo(ProjectTagSelection)));