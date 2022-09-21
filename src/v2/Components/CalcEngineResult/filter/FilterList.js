// React
import React from 'react'

// Material
import { Card, List, ListItem, ListItemText, makeStyles, Box } from '@material-ui/core'

// Local
import Typography from '../../Typography/Typography'

const useStyle = makeStyles((theme) => ({
    title: { display: 'flex', justifyContent: 'space-between', alignItem: 'center' },
    counter: { lineHeight: '18px' },
    marginBottom: {
        marginBottom: theme.spacing(10),
        [theme.breakpoints.up('sm')]: {
            marginBottom: theme.spacing(11),
        },
        [theme.breakpoints.up('md')]: {
            marginBottom: theme.spacing(11),
        },
    },
}))

const FilterList = ({ title, selected, total, children, titleComponent, cardProps, listProps }) => {
    const classes = useStyle()
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
