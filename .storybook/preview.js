import React from 'react'
import { muiTheme } from 'storybook-addon-material-ui'
import theme from '../src/themes'
import { IntlProvider } from 'react-intl'
import { DndProvider } from 'react-dnd'
import { TouchBackend } from 'react-dnd-touch-backend'
import { HTML5Backend } from 'react-dnd-html5-backend'

export const parameters = {
    actions: { argTypesRegex: '^on[A-Z].*' },
}

export const decorators = [
    muiTheme([theme]),
    (Story) => (
        <DndProvider
            backend={HTML5Backend}
            options={{
                enableMouseEvents: true,
            }}>
            <IntlProvider locale='en'>
                <Story />
            </IntlProvider>
        </DndProvider>
    ),
]
