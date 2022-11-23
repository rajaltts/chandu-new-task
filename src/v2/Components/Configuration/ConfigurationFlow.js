import React, { useState, useEffect } from 'react'
import { TouchBackend } from 'react-dnd-touch-backend'
import { DndProvider } from 'react-dnd'
import { IntlProvider, injectIntl } from 'react-intl'
import { ApiService } from '@carrier/workflowui-globalfunctions'
import withExtraProps from '../../../HOC/withExtraProps'
import ErrorBoundary from '../utils/errorAndCrashMitigation/ErrorBoundary'

const ConfigurationFlow = ({ baseApi, locale, children, TRANSLATION_API_PROJECT_ID }) => {
    const [translations, setTranslations] = useState({})

    // 1.e) Fetch translations depending on selected language
    useEffect(() => {
        ApiService(
            `${baseApi.translationApi}getAllFromLanguageID/${TRANSLATION_API_PROJECT_ID}/${locale.transKey}`,
            'GET'
        )
            .then(({ data }) => {
                if (data && data.status === 'success' && data.result) {
                    setTranslations({ ...data.result })
                }
            })
            .catch((error) => {
                console.warn(error)
                setTranslations({})
            })
    }, [locale.transKey])

    return (
        <ErrorBoundary>
            <DndProvider
                backend={TouchBackend}
                options={{
                    enableMouseEvents: true,
                }}>
                <IntlProvider locale={locale.lang} messages={translations}>
                    {children}
                </IntlProvider>
            </DndProvider>
        </ErrorBoundary>
    )
}

export default injectIntl(withExtraProps(ConfigurationFlow))
