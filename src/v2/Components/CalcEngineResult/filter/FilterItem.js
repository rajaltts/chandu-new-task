// React
import React, { useState } from 'react'

// Material
import { Collapse, IconButton, ListItem, ListItemText } from '@material-ui/core'
import { ExpandLess, ExpandMore, Clear } from '@material-ui/icons'

const FilterItem = ({
    title,
    openIcon,
    closeIcon,
    children,
    collapseProps,
    openByDefault,
    listItemTextProps,
    onRestoreClick,
    ...rest
}) => {
    const [open, setOpen] = useState(openByDefault)
    const onClick = () => setOpen(!open)
    return (
        <>
            <ListItem id={`List_${title}`} button onClick={onClick} {...rest}>
                <ListItemText primary={title} {...listItemTextProps} />
                {onRestoreClick && (
                    <IconButton onClick={(e) => onRestoreClick(e)}>
                        <Clear />
                    </IconButton>
                )}
                {open ? openIcon || <ExpandLess /> : closeIcon || <ExpandMore />}
            </ListItem>
            <Collapse {...collapseProps} in={open}>
                {children}
            </Collapse>
        </>
    )
}

export default FilterItem