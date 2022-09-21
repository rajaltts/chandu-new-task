// React
import React from 'react'

// Material
import { Box, Input, InputAdornment } from '@material-ui/core'

// Local
import Typography from '../../Typography/Typography'

// Styles
import { AirbnbSlider, useFilterRangeStyles } from './FilterRange.styles'

const AirbnbThumbComponent = (props) => {
    return (
        <span {...props}>
            <span className='bar' />
            <span className='bar' />
        </span>
    )
}

const FilterRange = ({ name, label, value, minMax, unit, step = 1, onChange }) => {
    const classes = useFilterRangeStyles()
    // Check that min and max are numbers
    const doDisplay = minMax.every((v) => typeof v === 'number')

    if (!doDisplay) {
        return null
    }

    const handleSliderChange = (event, newValue) => {
        onChange({ target: { name, value: newValue } })
    }

    const handleMinInputChange = (event) => {
        if (event.target.value !== '') {
            const newValue = [Number(event.target.value), value[1]]
            onChange({ target: { name, value: newValue } })
        } else {
            onChange({ target: { name, value: [null, value[1]] } })
        }
    }
    const handleMaxInputChange = (event) => {
        if (event.target.value !== '') {
            const newValue = [value[0], Number(event.target.value)]
            onChange({ target: { name, value: newValue } })
        } else {
            onChange({ target: { name, value: [value[0], null] } })
        }
    }

    const handleInputBlur = () => {
        value[0] = Math.max(Math.min(value[0], minMax[1]), minMax[0])
        value[1] = Math.max(Math.min(value[1], minMax[1]), minMax[0])
        value.sort((a, b) => (a > b ? 1 : -1))
        onChange({ target: { name, value } })
    }

    return (
        <div id={`FilterRange_${name}`}>
            <Typography variant='body2'>{label}</Typography>
            <Box className={classes.valueUnit}>
                <Input
                    value={value[0] === null ? '' : value[0]}
                    size='small'
                    onChange={handleMinInputChange}
                    onBlur={handleInputBlur}
                    endAdornment={<InputAdornment position='end'>{unit}</InputAdornment>}
                    inputProps={{
                        step,
                        min: minMax[0],
                        max: minMax[1],
                        type: 'number',
                    }}
                />
                <Input
                    value={value[1] === null ? '' : value[1]}
                    size='small'
                    onChange={handleMaxInputChange}
                    onBlur={handleInputBlur}
                    endAdornment={<InputAdornment position='end'>{unit}</InputAdornment>}
                    inputProps={{
                        step,
                        min: minMax[0],
                        max: minMax[1],
                        type: 'number',
                    }}
                />
            </Box>
            <AirbnbSlider
                ThumbComponent={AirbnbThumbComponent}
                value={value}
                name={name}
                step={step}
                min={minMax[0]}
                max={minMax[1]}
                valueLabelDisplay='auto'
                onChange={handleSliderChange}
            />
        </div>
    )
}

export default FilterRange