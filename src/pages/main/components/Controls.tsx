import React, { FC, useCallback, useState } from 'react'
import { Box, Button, FormControl, IconButton, InputLabel, Stack, Typography } from '@mui/material'
import { Errors } from '../../../utils/enums'
import { GGInputBase } from '../../../components/GGInputBase'
import stores from '../../../stores/Stores'
import FileUploadIcon from '@mui/icons-material/FileUpload'
import Visibility from '@mui/icons-material/Visibility'
import DeleteIcon from '@mui/icons-material/Delete'
import theme from '../../../utils/theme'
import AddIcon from '@mui/icons-material/Add'


const Varitant: FC = () => {

    return (
        <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'}>
            <Typography variant={'body1'}>
                Layer
            </Typography>
            <Box>
                <IconButton>
                    <FileUploadIcon sx={{ color: 'white' }}/>
                </IconButton>
                <IconButton>
                    <Visibility sx={{ color: 'white' }}/>
                </IconButton>
                <IconButton>
                    <DeleteIcon sx={{ color: 'white' }}/>
                </IconButton>
            </Box>
        </Stack>
    )
}

const Controls: FC = () => {

    const [error, setError] = useState<Errors | null>(null)

    const resetError = useCallback(() => {
        setError(null)
    }, [])

    return (
        <Box py={1} px={2} position={'relative'}>
            <FormControl
                variant={'standard'}
                error={error === Errors.nameAlreadyExist}
                onFocus={resetError}
                sx={{
                    mt: 1,
                }}
            >
                <InputLabel
                    shrink
                    sx={{
                        fontSize: '1.25rem',
                        pl: 1,
                        '&.Mui-focused': {
                            color: 'white',
                        },
                    }}
                >
                    New variant
                </InputLabel>
                <GGInputBase
                    autoFocus
                    error={error === Errors.nameAlreadyExist}
                    inputMode={'text'}
                    onChange={(event): void =>
                        stores.auth.updateEmail(event.target.value)}
                    sx={{
                        '& .MuiInputBase-input': {
                            borderRadius: 1,
                            border: (error) ? '1px solid #f00' : '1px solid #fff',
                            backgroundColor: 'transparent',
                            position: 'relative',
                            boxSizing: 'border-box',
                            fontSize: 12,
                            height: 36,
                            color: 'white',
                            width: 250,
                            maxWidth: '85vw',
                            padding: '10px 12px',
                            transition: theme.transitions.create([
                                'border-width',
                            ]),
                            '&:focus': {
                                border: '1.5px solid #fff',
                            },
                        },
                    }}
                />
                {
                    error === Errors.nameAlreadyExist &&
                    <Typography
                        variant={'body2'}
                        sx={{
                            color: '#f00',
                            textAlign: 'end',
                        }}
                    >
                        Layer with this name is already exist
                    </Typography>
                }
            </FormControl>

            <Box
                position={'absolute'}
                right={'15%'}
                top={32}
            >
                <IconButton size={'large'}>
                    <AddIcon sx={{ color: 'white' }}/>
                </IconButton>
            </Box>

            <Box mt={4}>
                <Varitant/>
                <Varitant/>
                <Varitant/>
            </Box>
        </Box>
    )
}

export default Controls