const pxToRem = (nb) => {
    const base = 16

    return `${nb / base}rem`
}

let defaultTheme = {
    palette: {
        primary: {
            main: '#071e62',
        },
        secondary: {
            main: '#1891F6',
        },
        grey: {
            50: '#f0f0f4',
            150: '#dddde1',
            350: '#E5E7ED',
            450: '#BAC0D0',
            550: '#4A596A',
            750: '#617080',
            900: '#333333',
            main: '#A7AFC3',
            dark: '#747A88',
        },
        blue: {
            20: '#bddefc',
            30: '#e6f2fe',
            40: '#d1e9fd',
            50: '#d8e4f4',
            60: '#cfe6fd',
        },
        red: {
            20: '#fff4f4',
            30: '#ffeaea',
            40: '#ffdfdf',
            50: '#eddae1',
            main: '#FF2A2A',
        },
        orange: {
            100: '#E9A52B',
            900: '#EB5623',
        },
        yellow: {
            main: '#E9A52B',
        },
        text: {
            primary: '#333333',
            secondary: '#A7AFC3',
            grey: '#a7abb6',
        },
        warning: {
            main: '#FF2A2A',
        },
        background: {
            white: 'white',
        },
        ciat: {
            primary: {
                main: '#ff8080',
            },
            secondary: {
                main: '#A7AFC3',
            },
        },
        carrier: {
            primary: {
                main: '#071e62',
            },
            secondary: {
                main: '#A7AFC3',
            },
        },
    },
    typography: {
        fontFamily: 'Roboto, sans-serif',
        h2: {
            fontSize: pxToRem(20),
            fontWeight: 600,
            lineHeight: '23px',
            paddingBottom: pxToRem(2),
            '@media (min-width: 768px)': {
                paddingBottom: pxToRem(6),
            },
        },
        h3: {
            fontSize: pxToRem(16),
            fontWeight: 600,
            paddingBottom: 0,
            '@media (min-width: 768px)': {
                paddingBottom: 0,
            },
        },
        body1: {
            fontSize: pxToRem(14),
            lineHeight: '1.3',
            '@media (min-width: 768px)': {
                fontSize: pxToRem(16),
            },
        },
        subtitle1: {
            fontSize: pxToRem(14),
            lineHeight: '16px',
        },
        subtitleBold: {
            fontSize: pxToRem(14),
            lineHeight: '16px',
            fontWeight: 'bold',
        },
        caption: {
            fontSize: pxToRem(12),
            lineHeight: '14px',
        },
        text: {
            fontSize: pxToRem(16),
            fontWeight: 600,
        },
        subtitleBold2: {
            height: pxToRem(16),
            letterSpacing: pxToRem(1),
            fontWeight: 600,
        },
    },
    breakpoints: {
        values: {
            xs: 0,
            sm: 768,
            md: 960,
            lg: 1280,
            lgup: 1440,
            xl: 1920,
        },
    },
    fontWeight: {
        100: 100,
        200: 200,
        300: 300,
        400: 400,
        500: 500,
        600: 600,
        bold: 'bold',
    },
    rem: {
        9: pxToRem(9),
        11: pxToRem(11),
        16: pxToRem(16),
        80: pxToRem(80),
        109: pxToRem(109),
        125: pxToRem(125),
    },
    alignPosition: {
        center: 'center',
    },
    common: {
        overFlowEllipsis: {
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
        },
        displayFlexRow: {
            display: 'flex',
            flexDirection: 'row',
        },
        displayFlexColumn: {
            display: 'flex',
            flexDirection: 'column',
        },
    },
    overrides: {
        MuiButton: {
            root: {
                /* Use Button uppercase property to get uppercase characters */
                textTransform: 'capitalize',
            },
        },
    },
}

const getFocusableCells = (elementParent, query) => {
    let focussable = Array.prototype.filter.call(
        elementParent.querySelectorAll(query || '[tabindex="2"]'),
        (element) => {
            return element.offsetWidth > 0 || element.offsetHeight > 0 || element === document.activeElement
        }
    )
    let index = focussable.indexOf(document.activeElement)
    return { focussable, index }
}

export { pxToRem, defaultTheme, getFocusableCells }
