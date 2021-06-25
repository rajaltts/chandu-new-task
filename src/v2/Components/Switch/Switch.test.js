import React from 'react'
import { render, unmountComponentAtNode } from 'react-dom'
import { act } from 'react-dom/test-utils'

import Switch from './Switch'

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

it('should display label', () => {
    act(() => {
        render(<Switch value={true} label={label} handleChange={() => {}} />, container)
    })
    const typo = container.querySelector('.MuiFormControlLabel-label')
    expect(typo).not.toBeNull()
    expect(typo.textContent).toBe(label)
})

it('should have secondary color as default', () => {
    act(() => {
        render(<Switch value={true} label={label} handleChange={() => {}} />, container)
    })
    const button = container.querySelector('.MuiButtonBase-root')
    expect(button).not.toBeNull()
    expect(button.classList.contains('MuiSwitch-colorSecondary')).toBe(true)
    //expect(container.textContent).toBe("Salut, étranger");
})

it('should change color to primary', () => {
    act(() => {
        render(<Switch value={true} color='primary' label={label} handleChange={() => {}} />, container)
    })
    const button = container.querySelector('.MuiButtonBase-root')
    expect(button).not.toBeNull()
    expect(button.classList.contains('MuiSwitch-colorSecondary')).toBe(false)
    expect(button.classList.contains('MuiSwitch-colorPrimary')).toBe(true)
})

it('should be checked', () => {
    act(() => {
        render(<Switch value={true} label={label} handleChange={() => {}} />, container)
    })
    const button = container.querySelector('.MuiButtonBase-root')
    expect(button).not.toBeNull()
    expect(button.classList.contains('Mui-checked')).toBe(true)
})

it('should not be checked', () => {
    act(() => {
        render(<Switch value={false} label={label} handleChange={() => {}} />, container)
    })
    const button = container.querySelector('.MuiButtonBase-root')
    expect(button).not.toBeNull()
    expect(button.classList.contains('Mui-checked')).toBe(false)
})

it('should not be disabled', () => {
    act(() => {
        render(<Switch value={true} disabled={false} label={label} handleChange={() => {}} />, container)
    })
    const button = container.querySelector('.MuiButtonBase-root')
    const formControl = container.querySelector('.MuiFormControlLabel-root')
    const typo = container.querySelector('.MuiFormControlLabel-label')
    expect(button).not.toBeNull()
    expect(formControl).not.toBeNull()
    expect(typo).not.toBeNull()
    expect(button.classList.contains('Mui-disabled')).toBe(false)
    expect(formControl.classList.contains('Mui-disabled')).toBe(false)
    expect(typo.classList.contains('Mui-disabled')).toBe(false)
})

it('should be disabled', () => {
    act(() => {
        render(<Switch value={true} disabled={true} label={label} handleChange={() => {}} />, container)
    })
    const button = container.querySelector('.MuiButtonBase-root')
    const formControl = container.querySelector('.MuiFormControlLabel-root')
    const typo = container.querySelector('.MuiFormControlLabel-label')
    expect(button).not.toBeNull()
    expect(formControl).not.toBeNull()
    expect(typo).not.toBeNull()
    expect(button.classList.contains('Mui-disabled')).toBe(true)
    expect(formControl.classList.contains('Mui-disabled')).toBe(true)
    expect(typo.classList.contains('Mui-disabled')).toBe(true)
})

it('should considere small size', () => {
    act(() => {
        render(<Switch value={true} size='small' label={label} handleChange={() => {}} />, container)
    })
    const switchRoot = container.querySelector('.MuiSwitch-root')
    expect(switchRoot).not.toBeNull()
    expect(switchRoot.classList.contains('MuiSwitch-sizeSmall')).toBe(true)
})

it('should not have small size by default', () => {
    act(() => {
        render(<Switch value={true} label={label} handleChange={() => {}} />, container)
    })
    const switchRoot = container.querySelector('.MuiSwitch-root')
    expect(switchRoot).not.toBeNull()
    expect(switchRoot.classList.contains('MuiSwitch-sizeSmall')).toBe(false)
})

it('should trigger handler with new value on click', () => {
    const onChange = jest.fn()
    act(() => {
        render(<Switch value={true} label={label} handleChange={onChange} />, container)
    })
    const button = container.querySelector('.MuiButtonBase-root')
    expect(button).not.toBeNull()
    act(() => {
        button.dispatchEvent(new MouseEvent('click', { bubbles: true }))
    })
    expect(onChange).toHaveBeenCalledTimes(1)
})

it('should add custom class to root element', () => {
    act(() => {
        render(<Switch value={true} label={label} className='myCustomClass' />, container)
    })
    const button = container.querySelector('.MuiSwitch-root')
    expect(button).not.toBeNull()
    expect(button.classList.contains('myCustomClass')).toBe(true)
})
