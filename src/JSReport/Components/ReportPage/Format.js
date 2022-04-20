import React from 'react'
import { FormatTransKey } from '@carrier/workflowui-globalfunctions'
import translation from '../../../Components/Translation'
import BarLoader from 'react-spinners/BarLoader'
import { css } from '@emotion/core'

/**
 * @category Utils 🔧 Reports
 * @component
 * @description Extract specific value of calcEngine API results
 * @param  {string} {children} Content to format
 * @param  {boolean} {loading} Display loading spinner
 * @param  {boolean} {translate} Translate content (either use content as key if props.isPropName, either create a dynamic one)
 * @param  {boolean} {isPropName} Use content as key for translation
 * @param  {boolean} {sup} Display as an exponent the string between ^ characters in content
 * @returns {React.ReactElement} Loading spinner if no data or props.loading, or content (translated or not, depending on translate input props)
 */
export const Format = ({ children, loading, translate, isPropName, sup, sub }) => {
    if (children === null || children === undefined) return <></>
    if (children === '' && loading)
        return (
            <BarLoader
                css={css`
                    display: block;
                    margin: 2px;
                    width: '50%';
                `}
                size={7}
                height={7}
                sizeUnit={'px'}
                color={'#80808052'}
                loading={true}
            />
        )
    else if (translate)
        return isPropName ? translation(children) : translation(FormatTransKey(children.replace(':', '')))
    else if (sup)
        return children.match(/(\^.*?\^)/g) !== null ? (
            <div>
                {children
                    .split('^')
                    .map((e, i) =>
                        i === 1 ? (
                            <sup key={`format-sup-${i}`}>{e}</sup>
                        ) : (
                            e && <span key={`format-span-${i}`}>{e}</span>
                        )
                    )
                    .filter(Boolean)}
            </div>
        ) : (
            ''
        )
    else if (sub)
        return children.match(/(\^.*?\^)/g) !== null ? (
            <div>
                {children
                    .split('^')
                    .map((e, i) =>
                        i === 1 ? (
                            <sub key={`format-sup-${i}`}>{e}</sub>
                        ) : (
                            e && <span key={`format-span-${i}`}>{e}</span>
                        )
                    )
                    .filter(Boolean)}
            </div>
        ) : (
            ''
        )
    else if (Array.isArray(children))
        return (
            <>
                {children.map((child, i) => (
                    <div key={`child-${i}`}>{child}</div>
                ))}
            </>
        )
    return children
}
