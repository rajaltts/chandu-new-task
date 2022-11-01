// React
import React from 'react'

import { IntlProvider } from 'react-intl'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'

// Material
import { ThemeProvider } from '@material-ui/core'
import theme from '../../../../../../../themes'

// Local
import LocalCandidateTable from '../../../CandidateTable'

export const CandidateTable = (props) => {
    return (
        <ThemeProvider theme={theme}>
            <DndProvider backend={HTML5Backend} options={{ enableMouseEvents: true }}>
                <IntlProvider locale='en'>
                    <LocalCandidateTable {...props} />
                </IntlProvider>
            </DndProvider>
        </ThemeProvider>
    )
}
