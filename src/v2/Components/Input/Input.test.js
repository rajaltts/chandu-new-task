import React from 'react'
import { render, unmountComponentAtNode } from 'react-dom'
import { act } from 'react-dom/test-utils'

import Input from './Input'

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
        render(<Input label={label} />, container)
    })
    const typo = container.querySelector('.MuiFormLabel-root')
    expect(typo).not.toBeNull()
    expect(typo.textContent).toBe(label)
})

it('should be required', () => {
    act(() => {
        render(<Input label={label} required={true} />, container)
    })
    const typo = container.querySelector('.MuiFormLabel-root')
    const asterisk = container.querySelector('.MuiInputLabel-asterisk')
    expect(typo).not.toBeNull()
    expect(asterisk).not.toBeNull()
    expect(typo.classList.contains('Mui-required')).toBe(true)
})

it('should be disabled', () => {
    act(() => {
        render(<Input label={label} disabled={true} />, container)
    })
    const inputBaseRoot = container.querySelector('.MuiInputBase-root')
    const inputBase = container.querySelector('.MuiInputBase-input')
    expect(inputBaseRoot).not.toBeNull()
    expect(inputBase).not.toBeNull()
    expect(inputBaseRoot.classList.contains('Mui-disabled')).toBe(true)
    expect(inputBase.classList.contains('Mui-disabled')).toBe(true)
})
