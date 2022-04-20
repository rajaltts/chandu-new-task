import React, { Fragment, useEffect, useState } from 'react'
import TextField from '@material-ui/core/TextField'
import saveTagStyles from '../saveTagStyles'
import { validateFormFields, injectIntlTranslation } from '@carrier/workflowui-globalfunctions'

const TagName = (props) => {
    const {
        tagNameProps: {
            intl,
            setTagNameForSaveSelection,
            onValidation,
            selectedProject,
            setTagNameForCopySelection,
            tagName: tagInfo = {},
            setProjectError,
            saveTagActiveTab,
            setSelectProjectError,
            projectData,
            setTagError,
        },
        saveSelection,
    } = props
    const [existingErrorTagName, setExistingErrorTagName] = useState('')
    const { isDisabled = false, value = '' } = tagInfo
    const [tagData, addTagData] = useState(value)
    const classes = saveTagStyles()

    useEffect(() => {
        setTagError(existingErrorTagName)
    }, [existingErrorTagName])

    useEffect(() => {
        if (setTagNameForSaveSelection) setTagNameForSaveSelection(tagData)
        if (setTagNameForCopySelection) setTagNameForCopySelection(tagData)
    }, [tagData])

    const validateTagName = (value) => {
        addTagData(value)
        let error = ''
        if (onValidation) {
            error = onValidation(value)
        } else {
            const validations = {
                regExp: /^[^'\"&\/#,<>|\\\\]*$/,
                maxLength: 100,
            }
            const validationMessages = {
                nameRequired: injectIntlTranslation(intl, 'SelectionNameRequired', 'Selection name required'),
                notAllowedCharacters: injectIntlTranslation(
                    intl,
                    'OnlyAlphabetsAndUnderscoreMessage',
                    'Input should contain alphabets and underscore only'
                ),
                maxLengthError: injectIntlTranslation(
                    intl,
                    'TextRangeValidationMessage',
                    'Number of characters should be between {0} and {1}'
                )
                    .replace('{0}', 1)
                    .replace('{1}', 100),
                noBlankSpacesOnly: injectIntlTranslation(
                    intl,
                    'NoBlankSpacesOnly',
                    'Input should not contain blank spaces only'
                ),
            }
            error = validateFormFields(value, validations, validationMessages)
        }
        if (error !== existingErrorTagName) {
            !isDisabled && setExistingErrorTagName && setExistingErrorTagName(error)
        } else if (!selectedProject && saveSelection && !saveTagActiveTab) {
            setProjectError(setProjectSelectError())
        } else if (!projectData && !saveSelection) {
            setSelectProjectError(setProjectSelectError())
        }
    }

    const setProjectSelectError = () => {
        return injectIntlTranslation(intl, 'validationAtLeastOneProject', 'Please select a Project.')
    }

    return (
        <Fragment>
            <div className={classes.tagNameContainer}>
                <div className={classes.tagNameLabelContainer}>
                    <TextField
                        className={`${classes.searchInput} ${classes.textFieldPlaceholder}`}
                        value={tagData}
                        variant='outlined'
                        InputProps={{
                            classes: {
                                input: classes.searchInputRoot,
                                notchedOutline: classes.existingErrorTagName
                                    ? classes.errorBorder
                                    : classes.nonErrorBorder,
                                disabled: classes.disableInput,
                            },
                        }}
                        disabled={isDisabled}
                        label={<span>{injectIntlTranslation(intl, 'SelectionName', 'Selection name') + ' *'}</span>}
                        name='tagName'
                        margin={'dense'}
                        size={'small'}
                        onChange={(event) => validateTagName(event.target.value)}
                    />
                    <span className={classes.errorMsg}>{existingErrorTagName || ''}</span>
                </div>
            </div>
        </Fragment>
    )
}

export default TagName
