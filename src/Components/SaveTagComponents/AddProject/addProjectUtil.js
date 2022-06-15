import {
    RandomNumber,
    validateFormFields,
    defaultValidation,
    defaultValidationMessages,
    injectIntlTranslation,
} from '@carrier/workflowui-globalfunctions'

/* eslint-disable no-useless-escape */

const projectNameValidation = (value, intl) => {
    return validateFormFields(value, defaultValidation, defaultValidationMessages(intl))
}

const tagNameValidation = (value, intl) => {
    const validationMessages = {
        nameRequired: injectIntlTranslation(intl, 'Tagnamerequired', 'Tag name required'),
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
    }
    return validateFormFields(value, defaultValidation, validationMessages)
}

const customerNameValidation = (value, intl) => {
    let validationMessages = defaultValidationMessages(intl)
    validationMessages.nameRequired = ''
    return validateFormFields(value, defaultValidation, validationMessages)
}

const companyNameValidation = (value, intl) => {
    let validationMessages = defaultValidationMessages(intl)
    validationMessages.nameRequired = ''
    return validateFormFields(value, defaultValidation, validationMessages)
}

const emailValidation = (value, intl) => {
    const validations = {
        regExp: /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i,
        maxLength: 50,
    }
    const validationMessages = {
        nameRequired: '',
        notAllowedCharacters: injectIntlTranslation(
            intl,
            'EmailValidationMessage',
            'Please enter a valid email address.'
        ),
        maxLengthError: injectIntlTranslation(
            intl,
            'MaxLengthError50',
            'Number of characters should not be more than 50'
        ),
    }
    return validateFormFields(value, validations, validationMessages)
}

const contactNumberValidation = (value, intl) => {
    const contactRegExp = /^[\+-]?(([0-9\\(\\)]{1})[ ]?[\+]?[ ]?[-]?[ ]?[\\(]?[ ]?[\\)]?[ ]?){1,20}(?=\r?$)/
    if (!value.match(contactRegExp)) {
        return injectIntlTranslation(
            intl,
            'InvalidPhoneMessage',
            'Only -,(,) and numbers are accepted. Less than 20 numbers should be entered'
        )
    }
    return ''
}

export const fieldKeys = {
    isVisible: 'isVisible',
    isDisabled: 'isDisabled',
    isAutoComplete: 'isAutoComplete',
    label: 'label',
    id: 'id',
    value: 'value',
    error: 'error',
    placeHolder: 'placeHolder',
    validation: 'validation',
    isRequired: 'isRequired',
    defaultLabel: 'defaultLabel',
}

export const init = () => {
    return addProjectFields()
}

export const addProjectReducer = (state, action) => {
    switch (action.type) {
        case 'updateFields':
            return action.fields
        case 'reset':
            return addProjectFields()
        default:
            throw new Error()
    }
}

export const fieldType = {
    ProjectName: 'ProjectName',
    TagName: 'TagName',
    CustomerName: 'CustomerName',
    ContactName: 'ContactName',
    ContactEmail: 'ContactEmail',
    ContactNumber: 'ContactNumber',
}

export const addProjectFields = () => {
    const { ProjectName, TagName, CustomerName, ContactName, ContactEmail, ContactNumber } = fieldType
    const {
        isVisible,
        isDisabled,
        isAutoComplete,
        label,
        id,
        value,
        error,
        placeHolder,
        validation,
        isRequired,
        defaultLabel,
    } = fieldKeys
    return {
        [ProjectName]: {
            [isVisible]: true,
            [isDisabled]: false,
            [isAutoComplete]: false,
            [isRequired]: true,
            [label]: 'NewProjectProjectName',
            [defaultLabel]: 'Project Name',
            [id]: ProjectName,
            [value]: 'Project ' + RandomNumber(),
            [error]: '',
            [placeHolder]: 'NewProjectProjectName',
            [validation]: projectNameValidation,
        },
        [TagName]: {
            [isVisible]: false,
            [isDisabled]: false,
            [isAutoComplete]: false,
            [isRequired]: true,
            [label]: 'TagName',
            [defaultLabel]: 'Tag Name',
            [id]: TagName,
            [value]: '',
            [error]: '',
            [placeHolder]: 'TagName',
            [validation]: tagNameValidation,
        },
        [CustomerName]: {
            [isVisible]: true,
            [isDisabled]: false,
            [isAutoComplete]: true,
            [isRequired]: false,
            [label]: 'CustomerName',
            [defaultLabel]: 'Customer Name',
            [id]: CustomerName,
            [value]: '',
            [error]: '',
            [placeHolder]: 'CustomerName',
            [validation]: customerNameValidation,
        },
        [ContactName]: {
            [isVisible]: true,
            [isDisabled]: false,
            [isAutoComplete]: false,
            [isRequired]: false,
            [label]: 'CompanyName',
            [defaultLabel]: 'Contact Name',
            [id]: ContactName,
            [value]: '',
            [error]: '',
            [placeHolder]: 'CompanyName',
            [validation]: companyNameValidation,
        },
        [ContactEmail]: {
            [isVisible]: true,
            [isDisabled]: false,
            [isAutoComplete]: false,
            [isRequired]: false,
            [label]: 'NewProjectEmailid',
            [defaultLabel]: 'Contact Email',
            [id]: ContactEmail,
            [value]: '',
            [error]: '',
            [placeHolder]: 'NewProjectEmailid',
            [validation]: emailValidation,
        },
        ContactNumber: {
            [isVisible]: true,
            [isDisabled]: false,
            [isAutoComplete]: false,
            [isRequired]: false,
            [label]: 'ContactNumber',
            [defaultLabel]: 'Contact Number',
            [id]: ContactNumber,
            [value]: '',
            [error]: '',
            [placeHolder]: 'ContactNumber',
            [validation]: contactNumberValidation,
        },
    }
}
