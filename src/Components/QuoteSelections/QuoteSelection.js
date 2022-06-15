import React, { memo, useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { injectIntl } from 'react-intl'
import { closeQuoteSelection, injectIntlTranslation, RandomNumber } from '@carrier/workflowui-globalfunctions'
import ConfirmModal from '../ConfirmModal/ConfirmModal'
import { Button, makeStyles } from '@material-ui/core'
import { QuotePro, NewQuote } from '../SvgImages'
import InputLabel from '@material-ui/core/InputLabel'
import Typography from '@material-ui/core/Typography'
import MenuItem from '@material-ui/core/MenuItem'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'

const useStyles = makeStyles(() => ({
    container: {
        marginTop: '0px !important',
        paddingTop: '0px !important',
        width: '415px !important',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
    },
    formControl: {
        width: '99%',
        marginTop: '16px',
        fontWeight: 'normal',
        color: '#BAC0D0',
    },
    footerButton: {
        fontSize: '1rem',
        lineHeight: '1.2rem',
        padding: '9px 24px',
        textTransform: 'none',
        border: '1px solid rgba(0, 0, 0, 0.23)',
    },
    buttonGradint: {
        background: 'linear-gradient(99.7deg, #15205E -19.43%, #0076F4 80.93%)',
        boxShadow: '0px 11px 12px -10px rgba(4, 105, 221, 0.7)',
    },
    marginRight16px: {
        marginRight: '16px',
    },
    createNew: {
        color: '#1891F6',
        marginLeft: '8px',
    },
    selectedMenu: {
        color: '#1891F6',
    },
    opportunityName: {
        fontWeight: 'bold',
        color: '#1891F6',
    },
    selectMenu: {
        '& ul': {
            padding: '0px',
        },
        '& li': {
            backgroundColor: 'transparent !important',
            border: '1px solid #BAC0D0',
        },
    },
}))

const QuoteSelection = (props) => {
    const { quoteSelection, intl, closeQuoteSelection, dispatch, selectedTags = [], builderList, apis } = props
    const {
        showQuoteSelectionModal,
        quoteSelectionSaveHandler = null,
        errorMsg = '',
        quoteSelectionLoadHandler = null,
    } = quoteSelection
    const {
        container,
        footerButton,
        buttonGradint,
        marginRight16px,
        formControl,
        createNew,
        opportunityName,
        selectMenu,
        selectedMenu,
    } = useStyles()
    const newQuotation = 'newQuote'
    const [disableSave, setDisableSave] = useState(false)
    const [errorMessage, setErrorMessage] = useState(errorMsg)

    useEffect(() => {
        if (errorMsg && disableSave) {
            setDisableSave(true)
        }
        setErrorMessage(errorMsg)
    }, [errorMsg])

    useEffect(() => {
        if (quoteSelectionLoadHandler) {
            loadOptions()
        }
    }, [])

    const loadOptions = async () => {
        const response = await quoteSelectionLoadHandler(selectedTags, builderList)
        const { opportunities = [], quotes = [] } = response
        let newFields = [...fields]
        newFields[0].menuList = opportunities
        newFields[1].menuList = quotes
        if (opportunities.length === 1) {
            newFields[0].value = opportunities[0].name
        }
        setfields(newFields)
    }

    const handleOpenPros = () => {
        if (quoteSelectionSaveHandler) {
            const payload = {
                opportunityId: fields[0].value,
                quoteId: fields[1].value,
                selectedTags,
                opportunities: fields[0].menuList,
                quotes: fields[1].menuList,
                apis,
                builderList,
                intl,
            }
            dispatch(quoteSelectionSaveHandler(payload))
            closeQuoteSelection()
        }
    }

    const hideComponentHandler = () => {
        setErrorMessage('')
        closeQuoteSelection()
    }

    const customFooterButtons = () => {
        const isSaveDisabled = !(fields[0].value && fields[1].value) || disableSave
        return (
            <div>
                <Button
                    classes={{ root: `${footerButton} ${marginRight16px}` }}
                    id='customModalCancel'
                    variant='outlined'
                    size='large'
                    name='Cancel'
                    onClick={hideComponentHandler}>
                    {injectIntlTranslation(intl, 'Cancel')}
                </Button>
                <Button
                    classes={{ root: `${footerButton} ${isSaveDisabled ? marginRight16px : buttonGradint}` }}
                    size='large'
                    variant='contained'
                    color='primary'
                    id={'OpenPros'}
                    name={injectIntlTranslation(intl, 'OpenPros')}
                    onClick={handleOpenPros}
                    disabled={isSaveDisabled}>
                    {injectIntlTranslation(intl, 'OpenPros')}
                </Button>
            </div>
        )
    }

    const handleChange = ({ target: { value } }, index) => {
        let newFields = [...fields]
        if (value === newQuotation) {
            const newQuote = `New quote ${RandomNumber()}`
            newFields[index].value = newQuote
            newFields[index].newLabel = newQuotation
        } else {
            newFields[index].value = value
            newFields[index].newLabel = ''
        }
        setfields(newFields)
    }

    const [fields, setfields] = useState([
        {
            labelId: 'selectedOpportunity',
            id: 'opportunitySelection',
            label: injectIntlTranslation(intl, 'OpportunityId', 'Qpportunity ID'),
            value: '',
            addNewId: false,
            newLabel: '',
            addNewLabel: '',
            menuList: [],
        },
        {
            labelId: 'selectedQuoteId',
            label: injectIntlTranslation(intl, 'QuoteId', 'Quote ID'),
            id: 'quoteIdSelection',
            value: '',
            addNewId: true,
            newLabel: '',
            addNewLabel: injectIntlTranslation(intl, 'AddNewQuote', 'Create new Quote'),
            menuList: [],
        },
    ])

    const createFields = (fields) => {
        return fields.map((field, index) => {
            const { id, labelId, label, value, menuList = [], newLabel, addNewId, addNewLabel } = field
            if (menuList.length === 1 && !addNewId) {
                return (
                    <Typography variant='subtitle2' className={formControl}>
                        {label} : <span className={opportunityName}>{value}</span>
                    </Typography>
                )
            }
            return (
                <FormControl key={index} variant='outlined' size='small' className={formControl}>
                    <InputLabel id={labelId}>{label}</InputLabel>
                    <Select
                        labelId={labelId}
                        id={id}
                        value={value}
                        onChange={(event) => handleChange(event, index)}
                        label={label}
                        MenuProps={{
                            classes: { paper: selectMenu },
                            style: { zIndex: 9999999999 },
                        }}>
                        {addNewId && (
                            <MenuItem value={newQuotation}>
                                <NewQuote />
                                <Typography variant='subtitle1' className={createNew}>
                                    {addNewLabel}
                                </Typography>
                            </MenuItem>
                        )}
                        {newQuotation === newLabel && (
                            <MenuItem className={selectedMenu} value={value}>
                                {value}
                            </MenuItem>
                        )}
                        {menuList.map((menuItem, index) => {
                            const { name, id } = menuItem
                            return (
                                <MenuItem
                                    key={index}
                                    id={id}
                                    className={name === value ? selectedMenu : ''}
                                    value={name}>
                                    {name}
                                </MenuItem>
                            )
                        })}
                    </Select>
                </FormControl>
            )
        })
    }

    return (
        <ConfirmModal
            isModalOpen={showQuoteSelectionModal}
            onClose={hideComponentHandler}
            errorMsg={errorMessage}
            contentClassName={container}
            footerComponent={customFooterButtons()}
            headerIcon={QuotePro}
            id='quoteSelection'
            disableCloseIcon
            title={injectIntlTranslation(intl, 'OpenPros')}>
            {createFields(fields)}
        </ConfirmModal>
    )
}

export default injectIntl(connect(null, { closeQuoteSelection })(memo(QuoteSelection)))
