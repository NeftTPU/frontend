import React from 'react'
import { Box, Button, Container, createTheme, Divider, Grid, Stack, ThemeProvider, Typography } from '@mui/material'
import { observer } from 'mobx-react-lite'
import stores from '../../stores/Stores'
import { AddRounded } from '@mui/icons-material'


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

    function handleNewItem() {
        const i = Math.floor(Math.random() * 100)
        stores.collections.add({
            id: '' + i,
            name: 'NEW Collection ' + i,
        })
    }

    return (
        <ThemeProvider theme={newTheme}>
            <Container maxWidth={'md'}>
                <Box display={'flex'} alignItems={'flex-start'} justifyContent={'space-between'}>
                    <Typography variant={'h5'} mb={2}>
                        Мои коллекции
                    </Typography>
                    <Button
                        onClick={handleNewItem}
                        sx={{
                            color: 'white',
                            borderColor: 'white',
                            textTransform: 'none',
                            ':hover': {
                                borderColor: '#d5d4d4',
                            },
                        }}
                        startIcon={<AddRounded/>}
                    >
                        Добавить
                    </Button>
                </Box>
                <Box mx={4}>
                    <Stack spacing={2}>
                        {
                            stores.collections.collections.map((el) => {
                                return (
                                    <>
                                        <Grid container alignItems={'center'}>
                                            <Grid item xs>
                                                <Typography variant={'body1'}>
                                                    {el.name}
                                                </Typography>
                                            </Grid>
                                            <Grid item xs sx={{ textAlign: 'end' }}>
                                                <Button
                                                    variant={'outlined'}
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
                                                    Открыть
                                                </Button>
                                                <Button
                                                    variant={'outlined'}
                                                    onClick={() => stores.collections.remove(el.id)}
                                                    sx={{
                                                        color: theme => theme.palette.error.main,
                                                        borderColor: theme => theme.palette.error.main,
                                                        textTransform: 'none',
                                                        ml: 1,
                                                        ':hover': {
                                                            borderColor: theme => theme.palette.error.dark,
                                                        },
                                                    }}
                                                >
                                                    Удалить
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
        </ThemeProvider>
    )
}

export default observer(Collections)
