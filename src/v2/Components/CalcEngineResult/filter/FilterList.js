// React
import React from 'react'

// Material
import { Card, List, ListItem, ListItemText, Box } from '@material-ui/core'

// Local
import Typography from '../../Typography/Typography'

// Styles
import { useFilterListStyle } from './FilterList.styles'

const FilterList = ({ title, selected, total, children, titleComponent, cardProps, listProps }) => {
    const classes = useFilterListStyle()
    return (
        <Card className={classes.marginBottom} {...cardProps}>
            <List disablePadding {...listProps}>
                <ListItem id={`List_${title}`}>
                    <ListItemText
                        primary={
                            titleComponent || (
                                <Box className={classes.title}>
                                    <Typography bold>{title}</Typography>
                                    <Typography variant='caption' className={classes.lineHeight}>
                                        (<b>{selected} models</b> on {total})
                                    </Typography>
                                </Box>
                            )
                        }
                    />
                </ListItem>
                {children}
            </List>
        </Card>
    )
}

export default FilterList
