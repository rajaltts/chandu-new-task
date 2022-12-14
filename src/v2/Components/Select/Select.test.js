import React from 'react'
import { render, unmountComponentAtNode } from 'react-dom'
import { act } from 'react-dom/test-utils'

import Select from './Select'

import { IntlProvider } from 'react-intl'

const messages = {
    VALUE_NOT_COMPATIBLE: 'Value is not compatible',
    WRONG_VALUE_MESSAGE: 'Value is wrong',
}

const MockIntl = ({ children }) => {
    return (
        <IntlProvider locale='en' messages={messages}>
            {children}
        </IntlProvider>
    )
}

let container = null
beforeEach(() => {
    container = document.createElement('div')
    document.body.appendChild(container)
})

afterEach(() => {
    unmountComponentAtNode(container)
    container.remove()
    container = null
})

const values = [
    { value: 'ANY', label: 'ANY', description: 'ANY', feasible: true, enable: true },
    { value: 'Vectios IPJ', label: 'Vectios IPJ', description: 'Vectios IPJ', feasible: true, enable: true },
    { value: 'Vectios RPJ', label: 'Vectios RPJ', description: 'Vectios RPJ', feasible: true, enable: true },
    { value: '50FC 020-093', label: '50FC 020-093', description: '50FC 020-093', feasible: false, enable: true },
    { value: '50FC 100-280', label: '50FC 100-280', description: '50FC 100-280', feasible: false, enable: true },
]
const value = 'ANY'
const label = 'my label'

it('should display label', () => {
    act(() => {
        render(
            <MockIntl>
                <Select values={values} value={value} label={label} onChange={() => {}} />
            </MockIntl>,
            container
        )
    })
    const typo = container.querySelector('.MuiFormLabel-root')
    expect(typo).not.toBeNull()
    expect(typo.textContent).toBe(label)
})

it('should add custom class to root element', () => {
    act(() => {
        render(
            <MockIntl>
                <Select values={values} value={value} label={label} onChange={() => {}} />
            </MockIntl>,
            container
        )
    })
    const inputRoot = container.querySelector('.MuiInputBase-root')
    expect(inputRoot).not.toBeNull()
})

it('should not be disabled', () => {
    act(() => {
        render(
            <MockIntl>
                <Select values={values} value={value} label={label} onChange={() => {}} />
            </MockIntl>,
            container
        )
    })
    const elementInput = container.querySelector('.MuiInputBase-root')
    const elementLabel = container.querySelector('.MuiFormLabel-root')
    const elementSelect = container.querySelector('.MuiSelect-root')
    expect(elementInput).not.toBeNull()
    expect(elementLabel).not.toBeNull()
    expect(elementSelect).not.toBeNull()
    expect(elementInput.classList.contains('Mui-disabled')).toBe(false)
    expect(elementLabel.classList.contains('Mui-disabled')).toBe(false)
    expect(elementSelect.classList.contains('Mui-disabled')).toBe(false)
    expect(elementSelect.id).toBe(`Select_${label}`)
})

it('should not be relaxed', () => {
    act(() => {
        render(
            <MockIntl>
                <Select values={values} value={value} label={label} onChange={() => {}} />
            </MockIntl>,
            container
        )
    })
    const input = container.querySelector('.MuiInputBase-root')
    const elementLabel = container.querySelector('.MuiFormLabel-root')
    const helperText = container.querySelector('.MuiFormHelperText-root')
    expect(input).not.toBeNull()
    expect(elementLabel).not.toBeNull()
    expect(helperText).toBeNull()
    expect(input.classList.contains('Mui-error')).toBe(false)
    expect(elementLabel.classList.contains('Mui-error')).toBe(false)
})

it('should be relaxed', () => {
    act(() => {
        render(
            <MockIntl>
                <Select
                    values={values}
                    value={value}
                    label={label}
                    relaxed={true}
                    notCompatibleLabel={'Invalid'}
                    onChange={() => {}}
                />
            </MockIntl>,
            container
        )
    })
    const input = container.querySelector('.MuiInputBase-root')
    const elementLabel = container.querySelector('.MuiFormLabel-root')
    const helperText = container.querySelector('.MuiFormHelperText-root')
    expect(input).not.toBeNull()
    expect(elementLabel).not.toBeNull()
    expect(helperText).not.toBeNull()
    expect(input.classList.contains('Mui-error')).toBe(true)
    expect(elementLabel.classList.contains('Mui-error')).toBe(true)
    expect(helperText.classList.contains('Mui-error')).toBe(true)
})
