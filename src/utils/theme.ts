import { createTheme, responsiveFontSizes } from '@mui/material'


let theme = createTheme({
    palette: {
        primary: {
            main: '#080E24',
        },
        success: {
            main: '#080E24',
        },
    },
    typography: {
        allVariants: {
            color: '#FFF',
            fontFamily: '\'Montserrat\', sans-serif',
        },
    },
    components: {
        MuiAutocomplete: {
            styleOverrides: {
                inputRoot: {
                    padding: 0,
                    paddingLeft: 8,
                },
                input: {
                    fontSize: '0.95rem',
                },
            },
        },
        MuiInputLabel: {
            styleOverrides: {
                outlined: {
                    'fontSize': '0.95rem',
                    '.MuiAutocomplete-root &:not(.MuiInputLabel-shrink)': {
                        transform: 'translate(14px, 7.5px) scale(1)',
                    },
                },
            },
        },
        MuiOutlinedInput: {
            styleOverrides: {
                input: {
                    padding: 4,
                    paddingLeft: 8,
                    fontSize: '0.95rem',
                },
                root: {
                    paddingTop: 2,
                    paddingBottom: 2,
                    paddingLeft: 8,
                    paddingRight: 8,
                    fontSize: '0.95rem',
                },
            },
        },
    },
})
theme = responsiveFontSizes(theme)

export default theme
