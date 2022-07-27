import React from 'react'
import { render, unmountComponentAtNode } from 'react-dom'
import { act } from 'react-dom/test-utils'

import ButtonGroup from './ButtonGroup'

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

const buttonGroupDefaultValue = 1
const buttonGroupDefaultValues = [
    { label: 'one', value: 1, feasible: true },
    { label: 'two', value: 2, feasible: true },
]
const buttonGroupId = 'ButtonGroup'
const buttonGroupName = 'test'

it('should display buttonGroup with two buttons', () => {
    act(() => {
        render(
            <ButtonGroup
                name={buttonGroupName}
                value={buttonGroupDefaultValue}
                values={buttonGroupDefaultValues}
                id={buttonGroupId}
            />,
            container
        )
    })
    const buttonGroup = container.querySelector(`#${buttonGroupId}`)
    expect(buttonGroup).not.toBeNull()
    const firstButton = container.querySelector(`#ButtonGroup_${buttonGroupName}_${buttonGroupDefaultValue}`)
    expect(firstButton.className).toContain('makeStyles-selected')
    expect(firstButton.textContent).toBe('one')
    const secondButton = container.querySelector(`#ButtonGroup_${buttonGroupName}_2`)
    expect(secondButton.className).not.toContain('makeStyles-selected')
    expect(secondButton.textContent).toBe('two')
})

it('should display buttonGroup with third button disabled', () => {
    const buttonGroupValues = [...buttonGroupDefaultValues, { label: 'three', value: 3, feasible: false }]
    act(() => {
        render(
            <ButtonGroup
                name={buttonGroupName}
                id={buttonGroupId}
                value={buttonGroupDefaultValue}
                values={buttonGroupValues}
            />,
            container
        )
    })
    const buttonGroup = container.querySelector(`#${buttonGroupId}`)
    expect(buttonGroup).not.toBeNull()
    const thirdButton = container.querySelector(`#ButtonGroup_${buttonGroupName}_3`)
    expect(thirdButton.className).toContain('Mui-disabled')
    const firstButton = container.querySelector(`#ButtonGroup_${buttonGroupName}_${buttonGroupDefaultValue}`)
    expect(firstButton.className).not.toContain('Mui-disabled')
})

// TODO: add more test on events
