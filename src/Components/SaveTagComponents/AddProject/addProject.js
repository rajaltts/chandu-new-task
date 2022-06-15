import React, { memo, useReducer, useEffect, useState } from 'react'
import { intlShape, injectIntl } from 'react-intl'
import { EMPTY_GUID, injectIntlTranslation } from '@carrier/workflowui-globalfunctions'
import { addProjectFields, addProjectReducer, init, fieldType, fieldKeys } from './addProjectUtil'
import saveTagStyles from '../saveTagStyles'
import translation from '../../Translation'
import Autocomplete, { createFilterOptions } from '@material-ui/lab/Autocomplete'
import { TextField } from '@material-ui/core'

/* eslint-disable no-prototype-builtins */

const AddProject = (props) => {
    const {
        intl,
        updateProjectInfo,
        customerNameList,
        projectName = {},
        customerName = {},
        contactName = {},
        contactEmail = {},
        contactNumber = {},
        saveSelection,
        tagName,
    } = props
    const [menuList, setMenuList] = useState([])
    const { ContactName, ContactEmail, ContactNumber, ProjectName, CustomerName } = fieldType
    const classes = saveTagStyles()
    const [customer, setCustomer] = useState(null)
    const [state, dispatch] = useReducer(addProjectReducer, addProjectFields(), init)
    const filter = createFilterOptions()

    useEffect(() => {
        updateCustomFields([
            { fieldContent: projectName, id: ProjectName },
            { fieldContent: customerName, id: CustomerName },
            { fieldContent: contactName, id: ContactName },
            { fieldContent: contactEmail, id: ContactEmail },
            { fieldContent: contactNumber, id: ContactNumber },
        ])
        return () => {
            dispatch({ type: 'reset' })
        }
    }, [])

    useEffect(() => {
        if (customerNameList?.length) {
            setMenuList(customerNameList.filter((customer) => customer.CustomerName))
        }
    }, [customerNameList])

    const getCustomerDataByName = (name) => {
        return customerNameList.find((customer) => customer.CustomerName === name)
    }

    const updateCustomFields = (fieldData) => {
        const fields = { ...state }
        fieldData.forEach((customField) => {
            const { fieldContent, id } = customField
            const newField = fields[id]
            if (Object.keys(fieldContent).length > 0) {
                Object.keys(fieldKeys).forEach((key) => {
                    if (fieldContent.hasOwnProperty(key)) {
                        newField[key] = fieldContent[key]
                    }
                })
            }
            fields[id] = newField
        })
        dispatch({ type: 'updateFields', fields })
        updateProjectHandler(fields)
    }

    const handleAddCustomer = (customer, id, validation) => {
        const customerName = customer?.CustomerName || ''
        const validationMessage = validation(customerName, intl)
        const isDisabled = customerName !== '' && Object.keys(customer).length === 1 ? false : true
        updateCustomerData(id, validationMessage, customer, isDisabled)
    }

    const validateField = ({ event, id, validation, isRequired }) => {
        const {
            target: { value },
        } = event
        const validationMessage = isRequired || value ? validation(value, intl) : ''
        const fields = { ...state }
        fields[id].value = value
        fields[id].error = validationMessage
        dispatch({ type: 'updateFields', fields })
        updateProjectHandler(fields)
    }

    const getCustomerID = (fields, CustomerID) => {
        if (CustomerID) {
            return CustomerID
        }
        if (fields.CustomerName.value) {
            const customer = getCustomerDataByName(fields.CustomerName.value)
            if (customer) {
                return customer.CustomerID
            }
        }
        return EMPTY_GUID
    }

    const updateProjectHandler = (fields, CustomerID = '') => {
        if (updateProjectInfo) {
            const customerId = getCustomerID(fields, CustomerID)
            const projectInfo = {}
            let disableSave = false
            Object.keys(fields).forEach((key) => {
                if (fields[key].isVisible) {
                    const { validation, id, value, error } = fields[key]
                    if ((validation(value, intl) && fields[key].isRequired) || fields[key].error) {
                        disableSave = true
                    }
                    projectInfo[key] = { id: id, value: value, error }
                }
            })
            if (saveSelection && !tagName) {
                disableSave = true
            }
            updateProjectInfo({
                projectInfo,
                disableSave: disableSave,
                customerId,
            })
        }
    }

    const updateCustomerData = (id = '', validationMessage = '', customer = {}, isDisabled = false) => {
        const { CompanyName = '', Email = '', Phone = '', CustomerName = '', CustomerID = '' } = customer
        setCustomer(null)
        const fields = { ...state }
        if (id) {
            fields[id].value = CustomerName
            fields[id].error = validationMessage
        }
        fields[ContactName].value = CompanyName
        fields[ContactName].error = ''
        fields[ContactName].isDisabled = isDisabled
        fields[ContactEmail].value = Email
        fields[ContactEmail].error = ''
        fields[ContactEmail].isDisabled = isDisabled
        fields[ContactNumber].value = Phone
        fields[ContactNumber].error = ''
        fields[ContactNumber].isDisabled = isDisabled
        dispatch({ type: 'updateFields', fields })
        updateProjectHandler(fields, CustomerID)
    }

    const handleCustomerChange = (event, customer, changeType, id, validation) => {
        if (changeType !== 'clear' && changeType === 'select-option') {
            let customerData = null
            if (customer && customer.inputValue) {
                // Create a new value from the user input
                setCustomer(customer.inputValue)
                customerData = { CustomerName: customer.inputValue }
            } else {
                // Existing option
                setCustomer(customer)
                customerData = customer
            }
            handleAddCustomer(customerData, id, validation)
        }
    }

    const disableFields = (id = '') => {
        const fields = { ...state }
        const fieldsToDisable = ['ContactName', 'ContactEmail', 'ContactNumber']
        Object.keys(fields).forEach((field) => {
            if (fields[field].id === id) {
                fields[field].error = ''
            }
            if (fieldsToDisable.includes(field)) {
                fields[field].isDisabled = true
            }
        })
        updateProjectHandler(fields)
    }

    const onCustomerValueChange = (event, value, changeType, id, validation) => {
        if (value) {
            handleAddCustomer(getCustomerDataByName(value) || { CustomerName: value }, id, validation)
        } else {
            disableFields(id)
        }
        if (changeType === 'clear') {
            updateCustomerData()
            disableFields(id)
            setCustomer('')
        }
    }

    const filterOptions = (options, params) => {
        const filtered = filter(options, params)
        // Suggest the creation of a new value
        if (
            !options.find(
                (option) => option.CustomerName.toString().toLowerCase() === params.inputValue.toString().toLowerCase()
            ) &&
            params.inputValue.trim() !== ''
        ) {
            filtered.push({
                inputValue: params.inputValue,
                CustomerName: `Add "${params.inputValue}"`,
            })
        }
        return filtered
    }

    const getOptionsLabel = (option) => {
        // Value selected with enter, right from the input
        if (typeof option === 'string') {
            return option
        }
        // Add "xxx" option created dynamically
        if (option.inputValue) {
            return option.inputValue
        }
        // Regular option
        return option.CustomerName
    }

    const createProjectField = (field) => {
        const {
            label,
            defaultLabel = '',
            value = '',
            id,
            error,
            isDisabled,
            placeHolder,
            isVisible,
            validation,
            isAutoComplete,
            isRequired,
        } = field
        const errorClass = error ? classes.errorBorder : classes.nonErrorBorder
        if (isVisible) {
            return (
                <div className={classes.tagNameContainer}>
                    <div className={classes.tagNameLabelContainer}>
                        {isAutoComplete ? (
                            <div>
                                <Autocomplete
                                    id={id}
                                    value={customer || getCustomerDataByName(customerName.value)}
                                    freeSolo
                                    selectOnFocus={false}
                                    classes={{
                                        endAdornment: classes.adornmentStyle,
                                        popper: classes.optionsContainerAddCustomer,
                                        option: classes.autoCompleteOptions,
                                        listbox: classes.autoCompleteOptionsListContainer,
                                    }}
                                    options={menuList}
                                    onChange={(event, selectedCustomer, reason) =>
                                        handleCustomerChange(event, selectedCustomer, reason, id, validation)
                                    }
                                    onInputChange={(event, value, changeType) =>
                                        onCustomerValueChange(event, value, changeType, id, validation)
                                    }
                                    filterOptions={(options, params) => filterOptions(options, params)}
                                    getOptionLabel={(option) => getOptionsLabel(option)}
                                    renderOption={(option) => option.CustomerName}
                                    noOptionsText={injectIntlTranslation(intl, 'GridNoData')}
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            className={`${classes.searchInput} ${classes.textFieldPlaceholder}`}
                                            label={
                                                <span className={error ? classes.errorLabel : ''}>
                                                    {translation(label, defaultLabel)}
                                                </span>
                                            }
                                            error={error || false}
                                            size='small'
                                            variant='outlined'
                                        />
                                    )}
                                />
                            </div>
                        ) : (
                            <TextField
                                id={id}
                                className={`${classes.searchInput} ${classes.textFieldPlaceholder}`}
                                value={value}
                                variant='outlined'
                                required={isRequired}
                                InputProps={{
                                    classes: {
                                        input: classes.searchInputRoot,
                                        notchedOutline: errorClass,
                                        disabled: classes.disableInput,
                                    },
                                }}
                                disabled={isDisabled}
                                label={injectIntlTranslation(intl, placeHolder, defaultLabel)}
                                name={id}
                                margin={'dense'}
                                size={'small'}
                                onChange={(event) =>
                                    validateField({
                                        event,
                                        id,
                                        validation,
                                        isRequired,
                                    })
                                }
                            />
                        )}
                        <span className={classes.errorMsg}>{error}</span>
                    </div>
                </div>
            )
        }
        return null
    }
    return (
        <div className={`${classes.newProjectSeletionContainer} ${saveSelection ? classes.marginTop25px : ''}`}>
            {Object.keys(state).map((key) => createProjectField(state[key]))}
        </div>
    )
}

AddProject.propTypes = {
    intl: intlShape.isRequired,
}

export default injectIntl(memo(AddProject))
