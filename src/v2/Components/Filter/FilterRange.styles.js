import { makeStyles, Slider, withStyles } from '@material-ui/core'

// Taken from the official documentation ( Airbnb style )
// https://v4.mui.com/components/slider/#customized-sliders
// With some adjustements to fit the final design
export const AirbnbSlider = withStyles((theme) => ({
    root: {
        color: theme.palette.secondary.main,
        height: 3,
        padding: '13px 0',
    },
    thumb: {
        height: 22,
        width: 22,
        backgroundColor: '#fff',
        marginTop: -10,
        marginLeft: -11,
        boxShadow: '#ebebeb 0 2px 2px',
        '&:focus, &:hover, &$active': {
            boxShadow: '#ccc 0 2px 3px 1px',
        },
        '& .bar': {
            height: 9,
            width: 1,
            backgroundColor: 'lightgrey',
            marginLeft: 1,
            marginRight: 1,
        },
    },
    track: {
        height: 3,
        backgroundColor: theme.palette.secondary.main,
    },
    rail: {
        color: '#d8d8d8',
        opacity: 1,
        height: 3,
    },
}))(Slider)

export const useFilterRangeStyles = makeStyles(() => ({
    valueUnit: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        columnGap: 24,
    },
}))
