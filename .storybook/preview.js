import React from 'react'
import { muiTheme } from 'storybook-addon-material-ui'
import theme from '../src/themes'
import { IntlProvider } from 'react-intl'

export const parameters = {
    actions: { argTypesRegex: '^on[A-Z].*' },
}

export const decorators = [
    muiTheme([theme]),
    (Story) => (
        <IntlProvider locale='en'>
            <Story />
        </IntlProvider>
    ),
]
