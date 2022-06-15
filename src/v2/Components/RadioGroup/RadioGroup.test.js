import React from 'react'
import { render, unmountComponentAtNode } from 'react-dom'
import { act } from 'react-dom/test-utils'

import RadioGroup from './RadioGroup'

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
    {
        value: 'CIAT',
        label: 'CIAT',
        description: '',
        feasible: true,
        enable: true,
    },
    {
        value: 'Carrier',
        label: 'Carrier',
        description: '',
        feasible: false,
        enable: true,
    },
]
const value = 'Carrier'
const label = 'my label'

it('should display label', () => {
    act(() => {
        render(<RadioGroup values={values} value={value} label={label} />, container)
    })
    const formRoot = container.querySelector('.MuiFormControl-root')
    const formLabel = formRoot.querySelector('.MuiFormLabel-root')
    expect(formLabel).not.toBeNull()
    expect(formLabel.textContent).toBe(label)
})

it('should have primary color', () => {
    act(() => {
        render(<RadioGroup values={values} value={value} color='primary' />, container)
    })
    const radio = container.querySelector('.MuiButtonBase-root')
    expect(radio).not.toBeNull()
    expect(radio.classList.contains('MuiRadio-colorSecondary')).toBe(false)
    expect(radio.classList.contains('MuiRadio-colorPrimary')).toBe(true)
})

it('should be disabled', () => {
    act(() => {
        render(<RadioGroup values={values} value={value} disabled={true} />, container)
    })
    const radio = container.querySelector('.MuiIconButton-root')
    expect(radio).not.toBeNull()
    expect(radio.classList.contains('Mui-disabled')).toBe(true)
})

it('should be displayed in row', () => {
    act(() => {
        render(<RadioGroup values={values} value={value} row={true} />, container)
    })
    const radioGroup = container.querySelector('.MuiFormGroup-root')
    expect(radioGroup).not.toBeNull()
    expect(radioGroup.classList.contains('MuiFormGroup-row')).toBe(true)
})

it('should not be displayed in row', () => {
    act(() => {
        render(<RadioGroup values={values} value={value} row={false} />, container)
    })
    const radioGroup = container.querySelector('.MuiFormGroup-root')
    expect(radioGroup).not.toBeNull()
    expect(radioGroup.classList.contains('MuiFormGroup-row')).toBe(false)
})

it('should add custom class to root element', () => {
    act(() => {
        render(<RadioGroup values={values} value={value} className='myCustomClass' />, container)
    })
    const formControl = container.querySelector('.MuiFormControl-root')
    expect(formControl).not.toBeNull()
    expect(formControl.classList.contains('myCustomClass')).toBe(true)
})

it('should trigger handleChange', () => {
    const onChange = jest.fn()
    act(() => {
        render(<RadioGroup values={values} value={value} onChange={onChange} />, container)
    })
    const radio = container.querySelector('.MuiButtonBase-root')
    expect(radio).not.toBeNull()
    act(() => {
        radio.dispatchEvent(new MouseEvent('click', { bubbles: true }))
        radio.dispatchEvent(new MouseEvent('click', { bubbles: true }))
        radio.dispatchEvent(new MouseEvent('click', { bubbles: true }))
    })
    expect(onChange).toHaveBeenCalledTimes(3)
})

it('should select radio type using id', () => {
    act(() => {
        render(<RadioGroup name='RadioRuleProp' values={values} value={value} />, container)
    })
    const radio = container.querySelector(`#Radio_RadioRuleProp_${value}`)
    expect(radio).not.toBeNull()
    expect(radio.type).toBe('radio')
})
