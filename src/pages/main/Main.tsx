import React, { FC, useState } from 'react'
import { Alert, Box, Button, Container, Grid, Snackbar, Stack, Typography } from '@mui/material'
import Controls from './components/Controls'
import Layers from './components/Layers'
import stores from '../../stores/Stores'
import { observer } from 'mobx-react-lite'
import Preview from './components/Preview'
import { Layer } from './MainStore'
import { http } from '../../utils/http'
import { COLLECTION_URL, IMAGE_URL, LAYER_URL } from '../../utils/consts'
import { useQuery } from 'react-query'


const Main: FC = () => {

    // Snackbars
    const [openSnackbar, setOpenSnackbar] = useState(false)
    const [snackBarMessage, setSnackbarMessage] = useState('Success!')

    const changeSnackbarMessage = (from: string) => {
        switch (from) {
            case 'addLayer': {
                setSnackbarMessage('Layer added!')
                return
            }
            case 'deleteLayer': {
                setSnackbarMessage('Layer deleted!')
                return
            }
            case 'addImage': {
                setSnackbarMessage('Image posted! Pick the layer again')
                return
                return
            }
            case 'deleteImage': {
                setSnackbarMessage('Image deleted!')
                return
            }
            case 'createCollection': {
                setSnackbarMessage('Finally! Collection created!')
                return
            }
            default: {
                setSnackbarMessage('Success!')
                return
            }
        }
    }

    const handleOpenSnackbar = (from: string) => {
        changeSnackbarMessage(from)
        setOpenSnackbar(true)
    }

    const handleCloseSnackbar = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return
        }
        setOpenSnackbar(false)
    }

    // Api
    const fetchLayers = async (): Promise<Layer[]> => {
        return http.get(LAYER_URL)
            .then((res) => res.data)
            .catch((err) => console.error(err.response.data))
    }

    const layers = useQuery('layers', fetchLayers)

    const handleDeleteImage = (id: number) => {
        http.delete(IMAGE_URL + id)
            .then(async (res) => {
                console.log(res)
                await layers.refetch()
            })
    }

    const handleDeleteLayer = (id: number) => {
        http.delete(LAYER_URL + id)
            .then(async (res) => {
                console.log(res)
                await layers.refetch()
            })
    }

    const handleRefetchLayers = (): void => {
        layers.refetch()
        stores.main.setCurrentLayer(null)
    }

    const handleCreateCollection = async () => {
        const ids: number[] = []
        layers.data?.map((layer) => ids.push(layer.id))

        const formData = new FormData()
        formData.append('title', `Collection #${Math.round(Math.random() * 1000).toString()}`)
        formData.append('collection_ids', JSON.stringify(ids))

        http.post(COLLECTION_URL, formData)
            .then((res) => {
                console.log(res)
                handleOpenSnackbar('createCollection')
            })
            .catch((err) => console.error(err))
    }

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
                            onClick={async () => {
                                await stores.main.addLayer()
                                    .then(() => {
                                        layers.refetch()
                                        handleOpenSnackbar('addLayer')
                                    })
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
                            background: '#0c1536',
                        }}
                    >
                        <Layers
                            layers={layers}
                            handleDeleteLayer={handleDeleteLayer}
                            handleOpenSnackbar={handleOpenSnackbar}
                        />
                    </Box>
                </Grid>
                <Grid item md={4}>
                    <Stack direction={'row'} alignItems={'center'} spacing={3}>
                        <Typography variant={'h6'}>
                            {stores.main.currentLayer ? 'Images of ' + stores.main.currentLayer.title : 'Images'}
                        </Typography>
                        {
                            stores.main.currentLayer &&
                            <Button
                                variant={'outlined'}
                                onClick={() => {
                                    stores.main.addImage()
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
                        }
                    </Stack>
                    <Box
                        width={'100%'}
                        height={'40vh'}
                        mt={1}
                        sx={{
                            border: '1px solid white',
                            borderRadius: 1,
                            background: '#0c1536',
                        }}
                    >
                        <Controls
                            handleDeleteImage={handleDeleteImage}
                            handleRefetchLayers={handleRefetchLayers}
                            handleOpenSnackbar={handleOpenSnackbar}
                        />
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
                            background: '#0c1536',
                        }}
                    >
                        <Preview/>
                    </Box>
                </Grid>
            </Grid>
            <Box width={'100%'} textAlign={'center'}>
                <Button
                    variant={'contained'}
                    disableElevation
                    onClick={handleCreateCollection}
                    sx={{
                        background: '#554ADA',
                        borderRadius: 1,
                        mt: 2,
                        fontSize: '1.5rem',
                        fontFamily: '"Raleway", sans-serif',
                        ':hover': {
                            background: '#5d53d9',
                        },
                    }}
                >
                    Create collection!
                </Button>
            </Box>
            <Snackbar open={openSnackbar} autoHideDuration={2500} onClose={handleCloseSnackbar}>
                <Alert onClose={handleCloseSnackbar} severity="success" sx={{ width: '100%' }}>
                    {snackBarMessage}
                </Alert>
            </Snackbar>
        </Container>
    )
}

export default observer(Main)
