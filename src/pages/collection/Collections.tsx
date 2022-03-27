import React, { useEffect } from 'react'
import { Box, Button, Container, createTheme, Divider, Grid, Stack, ThemeProvider, Typography } from '@mui/material'
import { observer } from 'mobx-react-lite'
import stores from '../../stores/Stores'
import CollectionDialog from './CollectionDialog'


const newTheme = createTheme({
    palette: {
        primary: {
            main: '#FFF',
        },
    },
    typography: {
        fontFamily: '"Raleway", sans-serif',
        allVariants: {
            color: 'white',
        },
    },
})

const Collections = () => {

    useEffect(() => {
        void stores.collections.getCollections()
    }, [])

    return (
        <ThemeProvider theme={newTheme}>
            <Container maxWidth={'md'}>
                <Box display={'flex'} alignItems={'flex-start'} justifyContent={'space-between'}>
                    <Typography variant={'h5'} mb={2}>
                        My collections
                    </Typography>
                </Box>
                <Box mx={4}>
                    <Stack spacing={2}>
                        {
                            stores.collections.collections?.map((el) => {
                                return (
                                    <>
                                        <Grid container alignItems={'center'}>
                                            <Grid item xs>
                                                <Typography variant={'body1'}>
                                                    {el.title}
                                                </Typography>
                                            </Grid>
                                            <Grid item xs sx={{ textAlign: 'end' }}>
                                                <Button
                                                    variant={'outlined'}
                                                    onClick={() => stores.collections.open(el.id)}
                                                    sx={{
                                                        color: 'white',
                                                        borderColor: 'white',
                                                        textTransform: 'none',
                                                        mr: 1,
                                                        ':hover': {
                                                            borderColor: '#d5d4d4',
                                                        },
                                                    }}
                                                >
                                                    Open
                                                </Button>
                                            </Grid>
                                        </Grid>
                                        <Divider/>
                                    </>
                                )
                            })
                        }
                    </Stack>
                </Box>
            </Container>
            <CollectionDialog/>
        </ThemeProvider>
    )
}

export default observer(Collections)
