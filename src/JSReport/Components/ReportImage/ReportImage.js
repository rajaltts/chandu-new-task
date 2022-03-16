import React from 'react';
import reportStyles from '../reportStyles';

/**
 * @category Customer Reports 📁 Page #1 - Standard
 * @component
 * @description Table display - ReportImage [Standard page]
 */
const ReportImage = ({
    customImageProps = {
        src: 'https://stecatbuildersdev.blob.core.windows.net/ecatui/ecatimages/png/DefaultReportImage.png',
        alt: "No Image",
        height: 100,
        width: 100,
        style: {}
    },
    label = null,
    id = 'customImage',
    classes = {}
}) => {
    const {
        text = {},
        container = {}
    } = classes
    return (
        <div id={id} key={id} style={{...container, ...reportStyles['reportImageDefault']}}>
            <img {...customImageProps} />
            {label && <span style={{...text, ...reportStyles['boldFont']}}>{label}</span>}
        </div>
    )
}

export default ReportImage