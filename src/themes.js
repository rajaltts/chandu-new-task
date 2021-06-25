import createMuiTheme from '@material-ui/core/styles/createMuiTheme'

const pxToRem = (nb) => {
    const base = 16

    return `${nb / base}rem`
}

const theme = createMuiTheme({
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
        },
        warning: {
            main: '#FF2A2A',
        },
    },
    typography: {
        fontFamily: 'Roboto, sans-serif',
        h2: {
            fontSize: pxToRem(20),
            fontWeight: 600,
            lineHeight: '23px',
            paddingBottom: '20px',
            '@media (min-width: 768px)': {
                paddingBottom: '24px',
            },
        },
        h3: {
            fontSize: pxToRem(16),
            fontWeight: 600,
            paddingBottom: '20px',
            '@media (min-width: 768px)': {
                paddingBottom: '24px',
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
            fontWeight: 600,
        },
        caption: {
            fontSize: pxToRem(12),
            lineHeight: '14px',
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
})

export default theme
