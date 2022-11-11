// React
import React, { useEffect, useState } from 'react'
import { injectIntl } from 'react-intl'
import { withRouter } from 'react-router'

// Material
import { Grid, Box, Tooltip, IconButton, Typography } from '@material-ui/core'
import DeleteIcon from '@material-ui/icons/Delete'
import withExtraProps from '../../../HOC/withExtraProps'

// Carrier
import {
    getWorkflowDetailsForRoute,
    ApiService,
    breadcrumbText,
    getFullUrl,
    commonConstant,
    injectIntlTranslation,
    BlankTemplate,
    getUrlInfo,
    showSuccessNotification,
    showErrorNotification,
    getTemplateList,
} from '@carrier/workflowui-globalfunctions'

// Styles
import useStyles from './TemplateSelection.styles'

// Layout
import { Select, CardLayout, globalStyles } from '@carrier/ngecat-reactcomponents'

const TemplateSelection = (props) => {
    const {
        workflowsConfig,
        baseApi,
        intl,
        templatesList,
        history,
        showSuccessNotification,
        showErrorNotification,
        getTemplateList,
        sectionNames,
        rulesLoading,
        setProperties,
        loadTemplateData,
    } = props
    const classes = useStyles()
    const globalClasses = globalStyles()
    const {
        workflow: { id: builderId, launchUrl },
    } = getWorkflowDetailsForRoute(workflowsConfig, window.location)

    const [formattedTemplatesValues, setFormattedTemplatesValues] = useState([])
    const [currentTemplate, setCurrentTemplate] = useState(getUrlInfo(breadcrumbText.templateId))

    useEffect(() => {
        if (currentTemplate && loadTemplateData) {
            loadTemplateData(currentTemplate)
        }
    }, [])

    useEffect(() => {
        const newTemplateId = getUrlInfo(breadcrumbText.templateId)
        if (newTemplateId && newTemplateId !== currentTemplate) {
            if (loadTemplateData) {
                loadTemplateData(newTemplateId)
            }
            setCurrentTemplate(newTemplateId)
        }
    }, [history.location])

    // 1.c) Load user templates list
    useEffect(() => {
        const {
            workflow: { id: builderId },
        } = getWorkflowDetailsForRoute(workflowsConfig, window.location)
        getTemplateList(builderId, baseApi.templateApi, intl)
    }, [])

    useEffect(() => {
        let templates = []
        if (templatesList.templates.length) {
            templates = templatesList.templates.map((template) => ({
                value: template.TagTemplateId,
                description: template.TagTemplateName,
                label: template.TagTemplateName,
                feasible: true,
                enable: true,
            }))
        }

        const defaultTemplate = {
            ...BlankTemplate,
            description: injectIntlTranslation(intl, BlankTemplate.description),
        }
        setFormattedTemplatesValues([defaultTemplate, ...templates])
    }, [templatesList])

    const selectTemplate = (template) => {
        setProperties({})
        const selectedTemplate = formattedTemplatesValues.find((item) => item.value === template)
        const { selection = {} } = launchUrl
        const templateInfo = {
            [breadcrumbText.templateId]: selectedTemplate.value,
            [breadcrumbText.templateName]: selectedTemplate.description,
        }
        const templateUrl = getFullUrl({ pathname: '/' }, selection, {}, {}, templateInfo)
        history.replace(templateUrl, { ...history.location.state })
    }

    const currentTemplateClickHandler = (event) => {
        const templateId = event.target.closest('li').getAttribute('data-value')
        if (templateId === currentTemplate) {
            setCurrentTemplate(commonConstant.EMPTY_GUID)
            selectTemplate(templateId)
        }
    }

    const DeleteTemplateBtn = () => {
        const handleDelete = async (e) => {
            e.stopPropagation()
            try {
                const templateId = e.target.closest('li').getAttribute('data-value')
                await ApiService(`${baseApi.templateApi}DeleteTemplate?templateId=${templateId}`, 'DELETE', {
                    templateId,
                })
                const templateDetails = templatesList.templates.find(
                    (template) => template.TagTemplateId === templateId
                )
                showSuccessNotification(
                    `"${templateDetails.TagTemplateName}" ` + injectIntlTranslation(intl, 'TEMPLATE_DELETE')
                )
                getTemplateList(builderId, baseApi.templateApi, intl)
            } catch (err) {
                showErrorNotification(err.message, false)
            }
        }

        return (
            <Tooltip title={injectIntlTranslation(intl, 'DELETE_TEMPLATE')}>
                <IconButton onClick={handleDelete}>
                    <DeleteIcon />
                </IconButton>
            </Tooltip>
        )
    }

    const getRenderValue = (selected) => {
        const selectedTemplate = formattedTemplatesValues.find((elem) => elem.value === selected)
        if (selectedTemplate) {
            return selectedTemplate.label
        }
        return null
    }

    return (
        <Box id={sectionNames.TEMPLATE || 'template'} mb={5}>
            <Typography variant='h2' color='primary'>
                {injectIntlTranslation(intl, 'SELECT_TEMPLATE')}
            </Typography>
            <CardLayout contentClassName={`${classes.selectTemplateCard} ${globalClasses.sideMarginsReset}`}>
                <Grid container spacing={0}>
                    <Grid item xs={12} sm={8} md={7}>
                        <Select
                            label={injectIntlTranslation(intl, 'TEMPLATE')}
                            name={injectIntlTranslation(intl, 'TEMPLATE')}
                            values={formattedTemplatesValues || []}
                            value={currentTemplate}
                            handleChange={selectTemplate}
                            optionAction={<DeleteTemplateBtn />}
                            excludeActionOption={BlankTemplate.value}
                            disabled={rulesLoading}
                            menuItemClickHandler={currentTemplateClickHandler}
                            renderValue={getRenderValue}
                        />
                    </Grid>
                </Grid>
            </CardLayout>
        </Box>
    )
}

export default injectIntl(
    withRouter(withExtraProps(TemplateSelection, { showSuccessNotification, showErrorNotification, getTemplateList }))
)
