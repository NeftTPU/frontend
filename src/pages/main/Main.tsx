import React from 'react'
import { Box, Button, Container, Grid, Stack, Typography } from '@mui/material'
import Controls from './components/Controls'


const Main = () => {

    return (
        <Container maxWidth={'lg'}>
            <Grid
                container
                spacing={3}
                alignItems={'top'}
            >
                <Grid item md={3}>
                    <Stack direction={'row'} alignItems={'center'} spacing={3}>
                        <Typography variant={'h6'}>
                            Layers
                        </Typography>
                        <Button
                            variant={'outlined'}
                            onClick={() => {
                            }}
                            sx={{
                                py: 0.25,
                                color: 'white',
                                borderColor: 'white',
                                borderRadius: 1,
                                textTransform: 'none',
                                ':hover': {
                                    borderColor: '#d5d4d4',
                                },
                            }}
                        >
                            <Typography variant={'h6'} fontWeight={300}>
                                + Add
                            </Typography>
                        </Button>
                    </Stack>
                    <Box
                        width={'100%'}
                        height={'40vh'}
                        mt={1}
                        sx={{
                            border: '1px solid white',
                            borderRadius: 1,
                            background: '#0c1536'
                        }}
                    >
                        {'smth'}
                    </Box>
                </Grid>
                <Grid item md={4}>
                    <Typography variant={'h6'}>
                        Controls
                    </Typography>
                    <Box
                        width={'100%'}
                        height={'40vh'}
                        mt={1.75}
                        sx={{
                            border: '1px solid white',
                            borderRadius: 1,
                            background: '#0c1536'
                        }}
                    >
                        <Controls/>
                    </Box>
                </Grid>
                <Grid item md={5}>
                    <Stack direction={'row'} alignItems={'center'} spacing={3}>
                        <Typography variant={'h6'}>
                            Preview
                        </Typography>
                        <Button
                            variant={'outlined'}
                            onClick={() => {
                            }}
                            sx={{
                                py: 0.25,
                                color: 'white',
                                borderColor: 'white',
                                borderRadius: 1,
                                textTransform: 'none',
                                ':hover': {
                                    borderColor: '#d5d4d4',
                                },
                            }}
                        >
                            <Typography variant={'h6'} fontWeight={300}>
                                Random
                            </Typography>
                        </Button>
                    </Stack>
                    <Box
                        width={'100%'}
                        height={'40vh'}
                        mt={1}
                        sx={{
                            border: '1px solid white',
                            borderRadius: 1,
                            background: '#0c1536'
                        }}
                    >
                        {'smth'}
                    </Box>
                </Grid>
            </Grid>
        </Container>
    )
}

export default Main
