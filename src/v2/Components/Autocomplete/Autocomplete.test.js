import React from 'react'
import { render, unmountComponentAtNode } from 'react-dom'
import { act } from 'react-dom/test-utils'

import Autocomplete from './Autocomplete'

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
const values = [
    { value: '1', label: 'Project 1' },
    { value: '2', label: 'Project 2' },
    { value: '3', label: 'Project 3' },
    { value: '4', label: 'Project 4' },
]
const value = 'Project 1'

it('should display label', () => {
    act(() => {
        render(<Autocomplete label={label} values={values} handleChange={() => {}} />, container)
    })
    const typo = container.querySelector('.MuiFormLabel-root')
    expect(typo).not.toBeNull()
    expect(typo.textContent).toBe(label)
})

it('should display selected value', () => {
    act(() => {
        render(<Autocomplete label={label} values={values} value={value} handleChange={() => {}} />, container)
    })
    const input = container.querySelector('.MuiInputBase-input')
    expect(input).not.toBeNull()
    expect(input.value).toBe(value)
})

it('should add custom class to autocomplete', () => {
    act(() => {
        render(<Autocomplete values={values} value={value} className='myCustomClass' />, container)
    })
    const autocomplete = container.querySelector('.autocomplete')
    expect(autocomplete).not.toBeNull()
    expect(autocomplete.classList.contains('myCustomClass')).toBe(true)
})
