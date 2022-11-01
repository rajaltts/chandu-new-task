import React from 'react'
import { muiTheme } from 'storybook-addon-material-ui'
import theme from '../src/themes'
import { IntlProvider } from 'react-intl'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'

export const parameters = {
    actions: { argTypesRegex: '^on[A-Z].*' },
    options: {
        storySort: (a, b) => {
            if (a[1].parameters.order && b[1].parameters.order && a[1].kind === b[1].kind) {
                return a[1].parameters.order - b[1].parameters.order
            }
            return a[1].kind === b[1].kind ? 0 : a[1].id.localeCompare(b[1].id, undefined, { numeric: true })
        },
    },
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
