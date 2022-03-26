import React, { FC } from 'react'
import { Box, IconButton, List, ListItem, ListItemButton, ListItemText } from '@mui/material'
import stores from '../../../stores/Stores'
import { observer } from 'mobx-react-lite'
import { UseQueryResult } from 'react-query'
import { Layer } from '../MainStore'
import DeleteIcon from '@mui/icons-material/Delete'


interface LayersProps {
    layers: UseQueryResult<Layer[], any>
    handleDeleteLayer(id: number): void
    handleOpenSnackbar(from: string): void
}


const Layers: FC<LayersProps> = ({ layers, handleDeleteLayer, handleOpenSnackbar }) => {

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
                {
                    layers.isSuccess &&
                    layers.data.map((layer) =>
                        <ListItem
                            disablePadding
                            key={layer.id}
                            secondaryAction={
                                <IconButton
                                    edge="end"
                                    onClick={() => {
                                        handleDeleteLayer(layer.id)
                                        handleOpenSnackbar('deleteLayer')
                                    }}
                                >
                                    <DeleteIcon sx={{ color: 'white' }}/>
                                </IconButton>
                            }
                        >
                            <ListItemButton
                                onClick={() => {
                                    stores.main.setCurrentLayer(layer)
                                }}
                            >
                                <ListItemText primary={layer.title}/>
                            </ListItemButton>
                        </ListItem>,
                    )
                }
            </List>
        </Box>
    )
}

export default observer(Layers)