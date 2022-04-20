import { makeStyles } from '@material-ui/core/styles'

const searchStyles = makeStyles((theme) => ({
    nonErrorBorder: {
        borderColor: '#bcbcbc !important',
    },
    searchInputRoot: {
        fontSize: '14px',
    },
    searchInput: {
        width: '100%',
    },
    searchRoot: {
        borderRadius: '19px',
        height: '32px',
        minWidth: '276px',
    },
}))

export default searchStyles
