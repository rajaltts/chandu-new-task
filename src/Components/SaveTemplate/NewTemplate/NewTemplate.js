import React, { useState, useEffect } from "react"
import saveTemplateStyles from "../saveTemplateStyles";
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import { validateFormFields, injectIntlTranslation } from '@carrier/workflowui-globalfunctions';
import translation from "../../Translation";

const NewTemplate = ({
    intl,
    validationHandler = null,
    updateTemplateStatus = null,
}) => {
    const { paragraph, field } = saveTemplateStyles();
    const [errorMessage, setErrorMessage] = useState("");

    useEffect(() => {
        onTemplateNameChange("")
    }, [])

    const onTemplateNameChange = (value) => {
        let errorMsg = ""
        if (validationHandler) {
            errorMsg = validationHandler(value);
        }
        else {
            const validations = {
                regExp: /^[^'\"&\/#,<>|\\\\]*$/,
                maxLength: 100
            };
            const validationMessages = {
                nameRequired: injectIntlTranslation(intl, "PleaseEnterTagName", "Please enter a Template name"),
                notAllowedCharacters: injectIntlTranslation(intl, "SpecialCharactersNotAllowed", "Special characters are not allowed."),
                maxLengthError: injectIntlTranslation(intl, "MaxLengthError100", "Number of characters should not be more than 100")
            }
            errorMsg = validateFormFields(value, validations, validationMessages);
        }
        setErrorMessage(errorMsg)
        if (updateTemplateStatus) {
            updateTemplateStatus({
                errorMsg: errorMsg,
                newTemplateName: value
            });
        }
    }

    return (
        <>
            <Typography className={paragraph} display="block" variant="subtitle2">
                {translation("New_Template_Description", "Create new template from current selection")}
            </Typography>
            <TextField
                id="New_Template_Name"
                InputProps={{
                    classes: {
                        input: field
                    },
                }}
                variant="outlined"
                fullWidth
                onChange={({ target: { value } }) => onTemplateNameChange(value.trim())}
                error={errorMessage}
            />
        </>
    )
}

export default NewTemplate;