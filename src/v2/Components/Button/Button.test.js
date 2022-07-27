import React from 'react'
import { render, unmountComponentAtNode } from 'react-dom'
import { act } from 'react-dom/test-utils'

import { Button } from './Button'

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

const buttonLabel = 'Click me'
const buttonId = 'testButton'

it('should display button with a label', () => {
    act(() => {
        render(<Button id={buttonId}>{buttonLabel}</Button>, container)
    })
    const button = container.querySelector(`#${buttonId}`)
    expect(button).not.toBeNull()
    expect(button.type).toBe('button')
    expect(button.textContent).toBe(buttonLabel)
})

it('should display as a button selected', () => {
    act(() => {
        render(
            <Button id={buttonId} selected>
                {buttonLabel}
            </Button>,
            container
        )
    })
    const button = container.querySelector(`#${buttonId}`)
    expect(button.classList.contains('MuiButton-contained')).toBe(true)
    expect(button.className).toContain('makeStyles-selected') // makestyles autogenerate classnames
})

it('should display button with a custom variant', () => {
    act(() => {
        render(
            <Button id={buttonId} variant='outlined'>
                {buttonLabel}
            </Button>,
            container
        )
    })
    const button = container.querySelector(`#${buttonId}`)
    expect(button).not.toBeNull()
    expect(button.classList.contains('MuiButton-outlined')).toBe(true)
})
