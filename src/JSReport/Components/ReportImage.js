import React from 'react';

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
        text = { "font-weight": "bold" },
        container = { "display": "flex", "flex-direction": "column", "text-align": "center", "margin": "10px" }
    } = classes
    return (
        <div id={id} key={id} style={container}>
            <img {...customImageProps} />
            {label && <span style={text}>{label}</span>}
        </div>
    )
}

export default ReportImage