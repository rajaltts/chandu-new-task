import React from 'react'
import { injectIntl } from 'react-intl'
import { injectIntlTranslation, downloadFiles } from '@carrier/workflowui-globalfunctions'
import { LayoutButton } from '../../../LayoutButton/LayoutButton'
import withExtraProps from '../../../../../HOC/withExtraProps'
import quoteControlStyles from './OuoteControl.styles'
import OptionTabListComponent from '../OptionTabListComponent'

const QuoteControl = (props) => {
    const {
        intl,
        baseApi: { blobStorage },
        stepInfo,
    } = props
    const { dropdownButton } = quoteControlStyles()
    const ETOGuide = `${blobStorage}ecatui/ARTU_ETO_Guide 9-10-20.xlsx`
    return (
        <div key={stepInfo.rulesPropertyName}>
            <OptionTabListComponent {...props} />
            <LayoutButton className={dropdownButton} variant='outlined' onClick={() => downloadFiles(ETOGuide)}>
                {injectIntlTranslation(intl, 'LATEST_ETO_INFO', 'Click Here for Latest ETO Information')}
            </LayoutButton>
        </div>
    )
}

export default injectIntl(withExtraProps(QuoteControl))
