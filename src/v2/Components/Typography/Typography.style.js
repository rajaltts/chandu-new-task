import makeStyles from '@material-ui/core/styles/makeStyles'

const useTypographyStyles = makeStyles((theme) => ({
    [theme.breakpoints.up('xs')]: {
        paragraph: {
            marginBottom: 8,
        },
        bold: {
            fontWeight: 'bold!important',
        },
        uppercase: {
            textTransform: 'uppercase',
        },
    }
}))

export default useTypographyStyles