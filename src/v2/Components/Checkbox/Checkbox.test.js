import React from 'react'
import { render, unmountComponentAtNode } from 'react-dom'
import { act } from 'react-dom/test-utils'

import Checkbox from './Checkbox'

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

const label = 'my label'
const tooltipTitle = 'tooltipTitle'

it('should be checked', () => {
    act(() => {
        render(<Checkbox value={true} />, container)
    })
    const checkbox = container.querySelector('.MuiCheckbox-root')
    expect(checkbox).not.toBeNull()
    expect(checkbox.classList.contains('Mui-checked')).toBe(true)
})

it('should not be checked', () => {
    act(() => {
        render(<Checkbox value={false} />, container)
    })
    const checkbox = container.querySelector('.MuiCheckbox-root')
    expect(checkbox).not.toBeNull()
    expect(checkbox.classList.contains('Mui-checked')).toBe(false)
})

it('should display label', () => {
    act(() => {
        render(<Checkbox value={true} label={label} />, container)
    })
    const formLabel = container.querySelector('.MuiFormControlLabel-label')
    expect(formLabel).not.toBeNull()
    expect(formLabel.textContent).toBe(label)
})

it('should have primary color', () => {
    act(() => {
        render(<Checkbox value={true} color='primary' />, container)
    })
    const checkbox = container.querySelector('.MuiButtonBase-root')
    expect(checkbox).not.toBeNull()
    expect(checkbox.classList.contains('MuiCheckbox-colorSecondary')).toBe(false)
    expect(checkbox.classList.contains('MuiCheckbox-colorPrimary')).toBe(true)
})

it('should be disabled', () => {
    act(() => {
        render(<Checkbox value={true} disabled={true} />, container)
    })
    const checkbox = container.querySelector('.MuiCheckbox-root')
    expect(checkbox).not.toBeNull()
    expect(checkbox.classList.contains('Mui-disabled')).toBe(true)
})

it('should not be disabled', () => {
    act(() => {
        render(<Checkbox value={true} disabled={false} />, container)
    })
    const checkbox = container.querySelector('.MuiCheckbox-root')
    expect(checkbox).not.toBeNull()
    expect(checkbox.classList.contains('Mui-disabled')).toBe(false)
})

it('should be relaxed', () => {
    act(() => {
        render(<Checkbox value={true} relaxed={true} label={label} tooltipTitle={tooltipTitle} />, container)
    })
    const formControl = container.querySelector('.MuiFormControlLabel-root')
    expect(formControl).not.toBeNull()
    expect(
        formControl.classList
            .toString()
            .split(' ')
            .some((c) => /^makeStyles-relaxed-\d+$/.test(c))
    ).toBe(true)
    const typo = container.querySelector('.MuiTypography-root')
    expect(typo).not.toBeNull()
    const span = typo.querySelector('span')
    expect(span).not.toBeNull()
    expect(span.textContent).toBe(label)
})

it('should not be relaxed', () => {
    act(() => {
        render(<Checkbox value={true} relaxed={false} label={label} />, container)
    })
    const formControl = container.querySelector('.MuiFormControlLabel-root')
    expect(formControl).not.toBeNull()
    expect(
        formControl.classList
            .toString()
            .split(' ')
            .some((c) => /^makeStyles-relaxed-\d+$/.test(c))
    ).toBe(false)
    const typo = container.querySelector('.MuiTypography-root')
    expect(typo).not.toBeNull()
    const span = typo.querySelector('span')
    expect(span).toBeNull()
})

it('should add custom class to root element', () => {
    act(() => {
        render(<Checkbox value={true} className='myCustomClass' />, container)
    })
    const formControl = container.querySelector('.MuiFormControlLabel-root')
    expect(formControl).not.toBeNull()
    expect(formControl.classList.contains('myCustomClass')).toBe(true)
})

it('should trigger handleChange', () => {
    const onChange = jest.fn()
    act(() => {
        render(<Checkbox value={true} handleChange={onChange} />, container)
    })
    const checkbox = container.querySelector('.MuiButtonBase-root')
    expect(checkbox).not.toBeNull()
    act(() => {
        checkbox.dispatchEvent(new MouseEvent('click', { bubbles: true }))
        checkbox.dispatchEvent(new MouseEvent('click', { bubbles: true }))
        checkbox.dispatchEvent(new MouseEvent('click', { bubbles: true }))
    })
    expect(onChange).toHaveBeenCalledTimes(3)
})
