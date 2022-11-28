import React, { useState, useEffect } from 'react'
import { TouchBackend } from 'react-dnd-touch-backend'
import { DndProvider } from 'react-dnd'
import { IntlProvider, injectIntl } from 'react-intl'
import { ApiService, cache } from '@carrier/workflowui-globalfunctions'
import withExtraProps from '../../../HOC/withExtraProps'
import ErrorBoundary from '../utils/errorAndCrashMitigation/ErrorBoundary'

const ConfigurationFlow = ({
    baseApi,
    locale,
    children,
    isErrorBoundaryNeeded = false,
    TRANSLATION_API_PROJECT_ID,
    storeName = ''
}) => {
    const [translations, setTranslations] = useState({})

    const getTranslationData = async () => {
        try {
            if (storeName) {
                return await cache(
                    ApiService,
                    [`${baseApi.translationApi}getAllFromLanguageID/${TRANSLATION_API_PROJECT_ID}/${locale.transKey}`],
                    { storeName, ttl: 60 * 60 * 24, saveArgs: true, maxItems: 10 }
                );
            } else {
                return await ApiService(`${baseApi.translationApi}getAllFromLanguageID/${TRANSLATION_API_PROJECT_ID}/${locale.transKey}`)
            }
        }
        catch (error) {
            return { data: null }
        }
    }

    // 1.e) Fetch translations depending on selected language
    useEffect(() => {
        const getTranslations = async () => {
            const { data } = await getTranslationData();
            if (data && data.status === 'success' && data.result) {
                setTranslations(data.result)
                return;
            }
            setTranslations({});
        }
        getTranslations();
    }, [locale.transKey])

    const getContent = () => {
        return (
            <DndProvider
                backend={TouchBackend}
                options={{
                    enableMouseEvents: true,
                }}>
                <IntlProvider locale={locale.lang} messages={translations}>
                    {children}
                </IntlProvider>
            </DndProvider>
        )
    }

    return isErrorBoundaryNeeded ? <ErrorBoundary>{getContent()}</ErrorBoundary> : getContent()
}

export default injectIntl(withExtraProps(ConfigurationFlow))
