import React, { useState, memo, useEffect, Fragment } from "react";
import { injectIntl } from "react-intl";
import saveTagStyles from "../saveTagStyles";
import { injectIntlTranslation } from "@carrier/workflowui-globalfunctions";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import TagName from "../TagName/TagName";
import CircularProgress from '@material-ui/core/CircularProgress';

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
        defaultSelectedProject,
        onSearchTextChange = null,
        isLoading = false,
        setProjectError
    } = props;
    const [displayProjectNames, setDisplayProjectNames] = useState([]);
    const [tagNameForCopySelection, setTagNameForCopySelection] = useState("");
    const [projectData, setProjectData] = useState(defaultSelectedProject);
    const [selectProjectError, setSelectProjectError] = useState("");
    const [timer, setTimer] = useState(null);
    const [loading, setLoading] = useState(true);
    const isDisabled = tagName?.isDisabled || false;
    const classes = saveTagStyles();

    useEffect(() => {
        if (projectDataList.length) {
            setDisplayProjectNames(
                projectDataList.filter(
                    (project) =>
                        project.ProjectName && project.ProjectName.trim() !== ""
                )
            );
        }
        setLoading(isLoading)
    }, [projectDataList, isLoading]);

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
            clearValues();
            onSeachTextChangeHandler("")
            return;
        }
        setProjectData(value);
        setProjectError && setProjectError("")
        setSelectProjectError("");
    };

    const clearValues = () => {
        setProjectData(null);
        const errorText = injectIntlTranslation(
            intl,
            "validationAtLeastOneProject",
            "Please select a Project."
        )
        setProjectError && setProjectError(errorText)
        setSelectProjectError(errorText);
    }

    const getTagNameProps = () => {
        return {
            setTagNameForCopySelection,
            tagName,
            onValidation,
            intl,
            setSelectProjectError,
            projectData,
        };
    };

    const renderProjectNameOptions = (option, selected) => (
        <React.Fragment>
            <span className={selected ? classes.menuItemSelected : ""}>
                {option.ProjectName}
            </span>
        </React.Fragment>
    );

    const onSeachTextChangeHandler = (value) => {
        if (onSearchTextChange) {
            setLoading(true)
            if (timer) clearTimeout(timer);
            let timeOut = setTimeout(() => {
                onSearchTextChange(value);
                clearValues();
            }, 300);
            setTimer(timeOut);
        }
    }

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
                clearOnBlur={false}
                options={loading ? [] : displayProjectNames}
                loading={loading}
                loadingText={injectIntlTranslation(intl, "Loading", "Loading...")}
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
                        onChange={({ target: { value } }) => onSeachTextChangeHandler(value)}
                        InputProps={{
                            ...params.InputProps,
                            endAdornment: (
                                <React.Fragment>
                                    {loading ? <CircularProgress color="inherit" size={20} /> : null}
                                    {params.InputProps.endAdornment}
                                </React.Fragment>
                            )
                        }}
                    />
                )}
            />
            <span className={classes.errorMsg}>
                {saveSelection ? projectError : selectProjectError || ""}
            </span>
        </Fragment>
    );
};

export default injectIntl(memo(ProjectTagSelection));
