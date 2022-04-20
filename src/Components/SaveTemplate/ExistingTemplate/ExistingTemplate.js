import React, { useState } from 'react'
import saveTemplateStyles from '../saveTemplateStyles'
import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField'
import Autocomplete from '@material-ui/lab/Autocomplete'
import translation from '../../Translation'

const ExistingTemplate = ({
    updateTemplateStatus = null,
    existingTemplates = [],
    lookUpKey = '',
    isLoading = true,
}) => {
    const { paragraph, menuPopper, menuListUl, menuContainer, menuItem, menuItemSelected } = saveTemplateStyles()
    const [selectedTemplate, setSelectedTemplate] = useState('')

    const handleTemplateChange = (event, value) => {
        setSelectedTemplate(value)
        if (updateTemplateStatus) {
            updateTemplateStatus({
                existingTemplateInfo: value,
            })
        }
    }

    return (
        <>
            {existingTemplates.length ? (
                <>
                    <Typography className={paragraph} display='block' variant='subtitle2'>
                        {translation(
                            'Existing_Template_Description',
                            'Override existing template with current selection'
                        )}
                    </Typography>
                    <Autocomplete
                        id='existing_Template_Selection'
                        disableClearable
                        value={selectedTemplate}
                        classes={{
                            popper: menuPopper,
                            listbox: menuListUl,
                            root: menuContainer,
                            option: menuItem,
                        }}
                        size='small'
                        fullWidth
                        clearOnBlur={false}
                        onChange={handleTemplateChange}
                        options={existingTemplates}
                        getOptionLabel={(option) => option[lookUpKey]}
                        getOptionSelected={(option, value) => option.TagTemplateId === value.TagTemplateId}
                        renderOption={(option, { selected }) => (
                            <React.Fragment>
                                <span className={selected ? menuItemSelected : ''}>{option[lookUpKey]}</span>
                            </React.Fragment>
                        )}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                margin='normal'
                                variant='outlined'
                                InputProps={{
                                    ...params.InputProps,
                                    endAdornment: <React.Fragment>{params.InputProps.endAdornment}</React.Fragment>,
                                }}
                            />
                        )}
                    />
                </>
            ) : (
                <Typography className={paragraph} display='block' variant='subtitle2'>
                    {isLoading
                        ? translation('Loading', 'Loading...')
                        : translation('NoTemplate', 'No Existing Templates')}
                </Typography>
            )}
        </>
    )
}

export default ExistingTemplate
