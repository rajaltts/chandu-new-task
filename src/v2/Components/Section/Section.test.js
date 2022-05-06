import '@testing-library/jest-dom/extend-expect'
import React from 'react'
import { render, unmountComponentAtNode } from 'react-dom'
import { act } from 'react-dom/test-utils'

import Section from './Section'

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

const title = 'Section Title'

it('should be displayed', () => {
    act(() => {
        render(<Section title={title} />, container)
    })
    const box = container.querySelector('#testSectionBox')
    expect(box).not.toBeNull()
})

it('should display title', () => {
    act(() => {
        render(<Section title={title} />, container)
    })
    const box = container.querySelector('#testSectionBox')
    const titleTypo = box.querySelector('#testSectionTypo')
    expect(titleTypo).not.toBeNull()
    expect(titleTypo.textContent).toBe(title)
})

it('should display divider', () => {
    act(() => {
        render(<Section title={title} />, container)
    })
    const box = container.querySelector('#testSectionBox')
    const divider = box.querySelector('#testSectionDivider')
    expect(divider).not.toBeNull()
})

it('should not be displayed', () => {
    act(() => {
        render(<Section title={title} visible={false} />, container)
    })
    const box = container.querySelector('#testSectionBox')
    expect(box).toBeNull()
})

it('should not display divider', () => {
    act(() => {
        render(<Section title={title} divider={false} />, container)
    })
    const box = container.querySelector('#testSectionBox')
    const divider = box.querySelector('#testSectionDivider')
    expect(divider).toBeNull()
})

it('should display custom typo title', () => {
    act(() => {
        render(
            <Section title={title} typographyProps={{align: 'center', color: 'secondary', variant : 'h3'}} />,
            container
        )
    })
    const box = container.querySelector('#testSectionBox')
    const titleTypo = box.querySelector('#testSectionTypo')
    expect(titleTypo).not.toBeNull()
    expect(titleTypo.textContent).toBe(title)
    // expect(titleTypo).toHaveStyle('text-align: center')
    expect(titleTypo).toHaveStyle({textAlign: 'center'})
    expect(titleTypo.classList.contains('MuiTypography-h3')).toBe(true)
    expect(titleTypo.classList.contains('MuiTypography-colorSecondary')).toBe(true)
})