import React from 'react'
import { render, unmountComponentAtNode } from 'react-dom'
import { act } from 'react-dom/test-utils'
const Intl = jest.genMockFromModule('react-intl')

import { ThemeProvider } from '@material-ui/core/styles'
import Theme from '../../../themes'

import { InputRadioCardList } from './InputRadioCardList'

const intl = {
    formatMessage: ({ defaultMessage }) => defaultMessage,
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
    {
        value: 'C0',
        label: 'C0',
        secondaryLabel: 'Standard',
        description: '',
        media: 'C0.png',
        feasible: true,
        enable: true,
    },
    {
        value: 'CS',
        label: 'CS',
        secondaryLabel: 'Cross flow with 2 dampers',
        description: '',
        media: 'CS.png',
        feasible: true,
        enable: true,
    },
    {
        value: 'CF',
        label: 'CF',
        secondaryLabel: 'Cross flow with 100% fresh air',
        description: '',
        media: 'CF.png',
        feasible: true,
        enable: true,
    },
    {
        value: 'CK',
        label: 'CK',
        secondaryLabel: 'Cross flow with 3 dampers',
        description: '',
        media: 'CK.png',
        feasible: true,
        enable: true,
    },
    {
        value: 'CA',
        label: 'CA',
        secondaryLabel: 'Cross flow with axial return fan',
        description: '',
        media: 'CA.png',
        feasible: true,
        enable: true,
    },
    {
        value: 'CP',
        label: 'CP',
        secondaryLabel: 'Cross flow with lower return plug-fan',
        description: '',
        media: 'CP.png',
        feasible: true,
        enable: true,
    },
]

const value = 'C0'
const name = 'Sel_sAssembly'

const MockedTheme = ({ children }) => {
    return <ThemeProvider theme={Theme}>{children}</ThemeProvider>
}

it('should not have media', () => {
    act(() => {
        render(
            <MockedTheme>
                <InputRadioCardList values={values} value={value} name={name} handleChange={() => {}} />
            </MockedTheme>,
            container
        )
    })
    const cardRoot = container.querySelector('.MuiCard-root')
    const cardImg = cardRoot.querySelector('img')
    expect(cardImg).toBeNull()
})

it('should have media', () => {
    act(() => {
        render(
            <MockedTheme>
                <InputRadioCardList values={values} value={value} name={name} handleChange={() => {}} hasMedia={true} />
            </MockedTheme>,
            container
        )
    })
    const cardRoot = container.querySelector('.MuiCard-root')
    const cardImg = cardRoot.querySelector('img')
    expect(cardImg).not.toBeNull()
})

it('should have primary color', () => {
    act(() => {
        render(
            <MockedTheme>
                <InputRadioCardList values={values} value={value} name={name} handleChange={() => {}} color='primary' />
            </MockedTheme>,
            container
        )
    })
    const cardRoot = container.querySelector('.MuiCard-root')
    expect(cardRoot.classList.contains('color-primary')).toBe(true)
})

it('should have loading class', () => {
    act(() => {
        render(
            <MockedTheme>
                <InputRadioCardList values={values} value={value} name={name} handleChange={() => {}} loading={true} />
            </MockedTheme>,
            container
        )
    })
    const cardRoot = container.querySelector('.MuiCard-root')
    expect(cardRoot.classList.contains('loading')).toBe(true)
})

it('should have relaxed class', () => {
    act(() => {
        render(
            <MockedTheme>
                <InputRadioCardList
                    values={values}
                    value={value}
                    name={name}
                    handleChange={() => {}}
                    relaxed={true}
                    intl={intl}
                />
            </MockedTheme>,
            container
        )
    })
    const cardRoot = container.querySelector('.MuiCard-root')
    const errorTypographyRoot = container.querySelector('.MuiBox-root').querySelector('.MuiTypography-colorError')
    expect(cardRoot.classList.contains('relaxed')).toBe(true)
    expect(errorTypographyRoot).not.toBeNull()
})

it('should have 1 items per row (on desktop)', () => {
    act(() => {
        render(
            <MockedTheme>
                <InputRadioCardList
                    values={values}
                    value={value}
                    name={name}
                    handleChange={() => {}}
                    nbItemsPerRow='1'
                />
            </MockedTheme>,
            container
        )
    })
    const gridItem = container.querySelector('.MuiGrid-item')
    expect(gridItem.classList.contains('MuiGrid-grid-sm-12')).toBe(true)
})

it('should have 2 items per row (on desktop)', () => {
    act(() => {
        render(
            <MockedTheme>
                <InputRadioCardList
                    values={values}
                    value={value}
                    name={name}
                    handleChange={() => {}}
                    nbItemsPerRow='2'
                />
            </MockedTheme>,
            container
        )
    })
    const gridItem = container.querySelector('.MuiGrid-item')
    expect(gridItem.classList.contains('MuiGrid-grid-sm-6')).toBe(true)
})

it('should have 3 items per row (on desktop)', () => {
    act(() => {
        render(
            <MockedTheme>
                <InputRadioCardList
                    values={values}
                    value={value}
                    name={name}
                    handleChange={() => {}}
                    nbItemsPerRow='3'
                />
            </MockedTheme>,
            container
        )
    })
    const gridItem = container.querySelector('.MuiGrid-item')
    expect(gridItem.classList.contains('MuiGrid-grid-sm-4')).toBe(true)
})

it('should have 4 items per row (on desktop)', () => {
    act(() => {
        render(
            <MockedTheme>
                <InputRadioCardList
                    values={values}
                    value={value}
                    name={name}
                    handleChange={() => {}}
                    nbItemsPerRow='4'
                />
            </MockedTheme>,
            container
        )
    })
    const gridItem = container.querySelector('.MuiGrid-item')
    expect(gridItem.classList.contains('MuiGrid-grid-sm-3')).toBe(true)
})

it('should have 6 items per row (on desktop)', () => {
    act(() => {
        render(
            <MockedTheme>
                <InputRadioCardList
                    values={values}
                    value={value}
                    name={name}
                    handleChange={() => {}}
                    nbItemsPerRow='6'
                />
            </MockedTheme>,
            container
        )
    })
    const gridItem = container.querySelector('.MuiGrid-item')
    expect(gridItem.classList.contains('MuiGrid-grid-sm-2')).toBe(true)
})

it('should have 1 items per row (on mobile)', () => {
    act(() => {
        render(
            <MockedTheme>
                <InputRadioCardList
                    values={values}
                    value={value}
                    name={name}
                    handleChange={() => {}}
                    nbItemsPerRowMobile='1'
                />
            </MockedTheme>,
            container
        )
    })
    const gridItem = container.querySelector('.MuiGrid-item')
    expect(gridItem.classList.contains('MuiGrid-grid-xs-12')).toBe(true)
})

it('should have 2 items per row (on mobile)', () => {
    act(() => {
        render(
            <MockedTheme>
                <InputRadioCardList
                    values={values}
                    value={value}
                    name={name}
                    handleChange={() => {}}
                    nbItemsPerRowMobile='2'
                />
            </MockedTheme>,
            container
        )
    })
    const gridItem = container.querySelector('.MuiGrid-item')
    expect(gridItem.classList.contains('MuiGrid-grid-xs-6')).toBe(true)
})

it('should have 3 items per row (on mobile)', () => {
    act(() => {
        render(
            <MockedTheme>
                <InputRadioCardList
                    values={values}
                    value={value}
                    name={name}
                    handleChange={() => {}}
                    nbItemsPerRowMobile='3'
                />
            </MockedTheme>,
            container
        )
    })
    const gridItem = container.querySelector('.MuiGrid-item')
    expect(gridItem.classList.contains('MuiGrid-grid-xs-4')).toBe(true)
})

it('should have 4 items per row (on mobile)', () => {
    act(() => {
        render(
            <MockedTheme>
                <InputRadioCardList
                    values={values}
                    value={value}
                    name={name}
                    handleChange={() => {}}
                    nbItemsPerRowMobile='4'
                />
            </MockedTheme>,
            container
        )
    })
    const gridItem = container.querySelector('.MuiGrid-item')
    expect(gridItem.classList.contains('MuiGrid-grid-xs-3')).toBe(true)
})

module.exports = Intl
