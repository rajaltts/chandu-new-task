import React, { useState, memo, useEffect, Fragment } from "react";
import { injectIntl } from "react-intl";
import saveTagStyles from "../saveTagStyles";
import { injectIntlTranslation } from "@carrier/workflowui-globalfunctions";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import TagName from "../TagName/TagName";

const ProjectTagSelection = (props) => {
    const {
        intl,
        projectDataList = [],
        onProjectSelect,
        projectError,
        tagName,
        onValidation,
        saveSelection,
        onSaveTagData,
        defaultSelectedProject
    } = props;
    const [displayProjectNames, setDisplayProjectNames] = useState([]);
    const [tagNameForCopySelection, setTagNameForCopySelection] = useState("");
    const [projectData, setProjectData] = useState(null);
    const isDisabled = tagName?.isDisabled || false;
    const classes = saveTagStyles();

    useEffect(() => {
        if (projectDataList.length) {
            setDisplayProjectNames(projectDataList);
        }
    }, [projectDataList]);

    useEffect(() => {
        let disableSave = false;
        const tagNameStatus = !isDisabled && !tagNameForCopySelection;
        if (tagNameStatus || !projectData) {
            disableSave = true;
        }
        onSaveTagData &&
            onSaveTagData({
                tagName: tagNameForCopySelection,
                projectData: projectData,
                disableSave,
            });
    }, [tagNameForCopySelection, projectData]);

    useEffect(() => {
        if (onProjectSelect) onProjectSelect(projectData);
    }, [projectData]);

    const onProjectSelectChange = (event, value, reason) => {
        if (reason === "clear") {
            setProjectData(null);
            return;
        }
        setProjectData(value);
    };

    const getTagNameProps = () => {
        return {
            setTagNameForCopySelection,
            tagName,
            onValidation,
            intl,
        };
    };

    const renderProjectNameOptions = (option, selected) => (
        <React.Fragment>
            <span className={selected ? classes.menuItemSelected : ""}>
                {option.ProjectName}
            </span>
        </React.Fragment>
    );

    const getProjectOptionSelected = (option, value) =>
        option.ProjectName === value.ProjectName;

    return (
        <Fragment>
            {!saveSelection ? (
                <TagName tagNameProps={getTagNameProps()} />
            ) : null}
            <Autocomplete
                id="search-project"
                className={`${classes.searchInput} ${classes.textFieldPlaceholder} ${classes.autocomplete}`}
                classes={{
                    endAdornment: classes.adornmentStyle,
                    popper: classes.optionsContainer,
                    option: classes.autoCompleteOptions,
                    listbox: classes.autoCompleteOptionsListContainer,
                }}
                options={displayProjectNames}
                getOptionLabel={(option) => option.ProjectName}
                getOptionSelected={(option, value) =>
                    getProjectOptionSelected(option, value)
                }
                renderOption={(option, { selected }) =>
                    renderProjectNameOptions(option, selected)
                }
                onChange={(event, value, changeType) =>
                    onProjectSelectChange(event, value, changeType)
                }
                defaultValue={defaultSelectedProject}
                noOptionsText={injectIntlTranslation(intl, "GridNoData")}
                renderInput={(params) => (
                    <TextField
                        {...params}
                        label={
                            <span>
                                {injectIntlTranslation(
                                    intl,
                                    "SearchProject",
                                    "Search project here"
                                )}
                            </span>
                        }
                        size="small"
                        variant="outlined"
                    />
                )}
            />
            <span className={classes.errorMsg}>{projectError || ""}</span>
        </Fragment>
    );
};

export default injectIntl(memo(ProjectTagSelection));
