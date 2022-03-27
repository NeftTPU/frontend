import React, { FC } from 'react'
import { Box, IconButton, List, ListItem, Stack, Typography } from '@mui/material'
import stores from '../../../stores/Stores'
import FileUploadIcon from '@mui/icons-material/FileUpload'
import Visibility from '@mui/icons-material/Visibility'
import DeleteIcon from '@mui/icons-material/Delete'
import { observer } from 'mobx-react-lite'


interface ControlsProps {
    handleOpenSnackbar(from: string): void
    handleDeleteImage(id: number): void
    handleRefetchLayers(): void
}


const Controls: FC<ControlsProps> = ({ handleDeleteImage, handleRefetchLayers, handleOpenSnackbar }) => {

    return (
        <Box
            px={2}
            position={'relative'}
            sx={{
                overflowY: 'scroll',
                height: '100%',
            }}
        >
            <List>
                {/* Local, not sended */}
                {
                    stores.main.images &&
                    stores.main.images.map((neftImage) =>
                        <ListItem
                            disablePadding
                            key={stores.main.currentLayer?.id.toString() + neftImage.id.toString()}
                            sx={{
                                borderBottom: '1px solid #fff',
                                py: 0.5,
                                width: '100%',
                            }}
                        >
                            <Stack
                                direction={'row'}
                                alignItems={'center'}
                                justifyContent={'space-between'}
                                sx={{
                                    width: '100%',
                                }}
                            >
                                <Typography
                                    variant={'body1'}
                                    sx={{
                                        color: neftImage?.file || neftImage.image?.file ? 'white' : 'red',
                                    }}
                                >
                                    {neftImage.title}
                                </Typography>
                                <Box>
                                    <label htmlFor={'uploadImage' + neftImage.id.toString()}>
                                        <input
                                            id={'uploadImage' + neftImage.id.toString()}
                                            accept={'image/png'}
                                            type={'file'}
                                            onChange={(event): void => {
                                                console.log(neftImage.title)
                                                if (event.target.files !== null) {
                                                    stores.main.setCurrentImage(neftImage)
                                                    stores.main.uploadImageFileAndPath(event.target.files[0])
                                                        .then(() => {
                                                            handleRefetchLayers()
                                                            handleOpenSnackbar('addImage')
                                                        })
                                                }
                                            }}
                                            style={{
                                                display: 'none',
                                            }}
                                        />
                                        <IconButton component={'span'}>
                                            <FileUploadIcon sx={{ color: 'white' }}/>
                                        </IconButton>
                                    </label>
                                </Box>
                            </Stack>
                        </ListItem>)
                }

                {/* From server*/}
                {
                    stores.main.currentLayer &&
                    stores.main.currentLayer.layer_set &&
                    stores.main.currentLayer.layer_set.map((neftImage) =>
                        <ListItem
                            disablePadding
                            key={stores.main.currentLayer?.id.toString() + neftImage.id.toString()}
                            sx={{
                                borderBottom: '1px solid #fff',
                                py: 0.5,
                                width: '100%',
                            }}
                        >
                            <Stack
                                direction={'row'}
                                alignItems={'center'}
                                justifyContent={'space-between'}
                                sx={{
                                    width: '100%',
                                }}
                            >
                                <Typography
                                    variant={'body1'}
                                    sx={{
                                        color: neftImage?.file || neftImage.image?.file ? 'white' : 'red',
                                    }}
                                >
                                    {neftImage.title}
                                </Typography>
                                <Box>
                                    <IconButton
                                        onClick={() => stores.main.setCurrentImage(neftImage)}
                                    >
                                        <Visibility sx={{ color: 'white' }}/>
                                    </IconButton>
                                    <IconButton
                                        onClick={() => {
                                            handleDeleteImage(neftImage.id)
                                            handleRefetchLayers()
                                            handleOpenSnackbar('deleteImage')
                                        }}
                                    >
                                        <DeleteIcon sx={{ color: 'white' }}/>
                                    </IconButton>
                                </Box>
                            </Stack>
                        </ListItem>)
                }
            </List>
        </Box>
    )
}

export default observer(Controls)
