import React, { memo } from 'react'
import { IntlProvider } from 'react-intl'
import { injectIntl } from 'react-intl'

const CustomTranslation = (props) => {
    const { translations, translationsUniqueKey, lang, row, messages, children } = props
    return translations ? (
        <IntlProvider messages={translations[row[translationsUniqueKey]] || messages} locale={lang}>
            {children}
        </IntlProvider>
    ) : (
        children
    )
}

export default memo(injectIntl(CustomTranslation))
