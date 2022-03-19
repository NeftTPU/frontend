import React, { FC, useCallback, useEffect, useState } from 'react'
import { Box, Button, FormControl, IconButton, InputAdornment, InputLabel, Stack, Typography } from '@mui/material'
import discord from '../../assets/icons/socialNetworks/discord.svg'
import google from '../../assets/icons/socialNetworks/google.svg'
import twitch from '../../assets/icons/socialNetworks/twitch.svg'
import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import theme from '../../utils/theme'
import stores from '../../stores/Stores'
import { GGInputBase } from '../../components/GGInputBase'
import { Pages } from '../../utils/routes'
import { useNavigate } from 'react-router-dom'
import { SocialNetworkLink } from '../../components/SocialNetworkLink'
import { Errors } from '../../utils/enums'
import { observer } from 'mobx-react-lite'


const Auth: FC = () => {

    const [showPassword, setShowPassword] = useState(false)
    const [error, setError] = useState<Errors | null>(null)

    const navigate = useNavigate()

    const handleClickShowPassword = useCallback(() => {
        setShowPassword((prevState) => !prevState)
    }, [])

    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>): void => {
        event.preventDefault()
    }

    const handleSignUp = useCallback(() => {
        navigate(Pages.signUp)
    }, [navigate])

    const handleForgotPassword = useCallback(() => {
        navigate(Pages.resetPassword)
    }, [navigate])

    const resetError = useCallback(() => {
        setError(null)
    }, [])

    const handleSignIn = useCallback(() => {

        function checkLogin(): boolean {
            if (stores.auth.login.length === 0) {
                setError(Errors.incorrectLogin)
                return false
            } else {
                resetError()
                return true
            }
        }

        function checkPassword(): boolean {
            if (stores.auth.password.length === 0) {
                setError(Errors.wrongPassword)
                return false
            } else {
                resetError()
                return true
            }
        }

        const check = checkLogin() && checkPassword()

        if (check) {
            void stores.auth.auth()
        }
    }, [navigate])

    if (stores.auth.status === 'success') {
        navigate(Pages.main)
    }

    return (
        <Box
            overflow={'hidden'}
            textAlign={'center'}
            sx={{
                [theme.breakpoints.down('md')]: {
                    mt: 4,
                },
            }}
        >
            <Typography variant={'h3'}>
                SIGN IN
            </Typography>
            <Stack
                direction={'column'}
                alignItems={'center'}
            >
                <FormControl
                    variant={'standard'}
                    error={error === Errors.incorrectLogin || error === Errors.nonExistentLogin}
                    onFocus={resetError}
                    sx={{
                        mt: 1,
                    }}
                >
                    <InputLabel
                        shrink
                        htmlFor={'login-input'}
                        sx={{
                            fontSize: '1.5rem',
                            pl: 1,
                            '&.Mui-focused': {
                                color: 'white',
                            },
                        }}
                    >
                        Login
                    </InputLabel>
                    <GGInputBase
                        id={'login-input'}
                        autoFocus
                        error={error === Errors.incorrectLogin || error === Errors.nonExistentLogin}
                        onChange={(event): void =>
                            stores.auth.updateLogin(event.target.value)}
                    />
                    {
                        error === Errors.incorrectLogin &&
                        <Typography
                            variant={'body1'}
                            sx={{
                                color: '#f00',
                                textAlign: 'end',
                            }}
                        >
                            Incorrect login
                        </Typography>
                    }
                    {
                        error === Errors.nonExistentLogin &&
                        <Typography
                            variant={'body2'}
                            sx={{
                                color: '#f00',
                                textAlign: 'end',
                            }}
                        >
                            This login does not have an existing account
                        </Typography>
                    }
                </FormControl>
                <FormControl
                    variant={'standard'}
                    error={error === Errors.wrongPassword}
                    onFocus={resetError}
                    onKeyDown={(event): void => {
                        if (event.code === 'Enter') {
                            handleSignIn()
                        }
                    }}
                    sx={{
                        mt: 2,
                        position: 'relative',
                    }}
                >
                    <InputLabel
                        shrink
                        htmlFor={'pass-input'}
                        sx={{
                            fontSize: '1.5rem',
                            pl: 1,
                            '&.Mui-focused': {
                                color: 'white',
                            },
                        }}
                    >
                        Password
                    </InputLabel>
                    <GGInputBase
                        id={'pass-input'}
                        inputMode={'text'}
                        type={showPassword ? 'text' : 'password'}
                        error={error === Errors.wrongPassword}
                        onChange={(event): void =>
                            stores.auth.updatePassword(event.target.value)}
                        sx={{
                            '& .MuiInputBase-input': {
                                pr: 6,
                            },
                        }}
                        endAdornment={(
                            <InputAdornment
                                position={'end'}
                                sx={{
                                    position: 'absolute',
                                    right: 16,
                                }}
                            >
                                <IconButton
                                    aria-label={'toggle password visibility'}
                                    onClick={handleClickShowPassword}
                                    onMouseDown={handleMouseDownPassword}
                                    edge={'end'}
                                    sx={{ color: 'white' }}
                                >
                                    {showPassword ? <VisibilityOff/> : <Visibility/>}
                                </IconButton>
                            </InputAdornment>
                        )}
                    />
                    <Box
                        position={'absolute'}
                        right={0}
                        onClick={handleForgotPassword}
                    >
                        <Typography
                            variant={'body2'}
                            sx={{
                                textDecoration: 'underline',
                                cursor: 'pointer',
                                '&:hover': {
                                    color: '#5d53d9',
                                },
                            }}
                        >
                            Forgot password?
                        </Typography>
                    </Box>
                    {
                        error === Errors.wrongPassword &&
                        <Typography
                            variant={'body2'}
                            sx={{
                                color: '#f00',
                                textAlign: 'end',
                            }}
                        >
                            Wrong password
                        </Typography>
                    }
                </FormControl>
            </Stack>
            <Typography
                variant={'subtitle1'}
                fontWeight={500}
                mt={4}
                sx={{ textTransform: 'uppercase' }}
            >
                OR LOG IN WITH
            </Typography>
            <Stack
                direction={'row'}
                alignItems={'center'}
                justifyContent={'center'}
                spacing={3}
            >
                <SocialNetworkLink icon={google} viewBox={'0 0 31 31'}/>
                <SocialNetworkLink icon={discord} viewBox={'0 0 44 30'}/>
                <SocialNetworkLink icon={twitch} viewBox={'0 0 30 31'}/>
            </Stack>
            <Button
                variant={'contained'}
                disableElevation
                onClick={handleSignIn}
                sx={{
                    width: theme.breakpoints.values.sm * 0.75,
                    maxWidth: '85vw',
                    py: 2,
                    px: 4,
                    mt: 4,
                    background: '#554ADA',
                    borderRadius: 0.5,
                    ':hover': {
                        background: '#5d53d9',
                    },
                }}
            >
                <Typography
                    fontWeight={600}
                    fontSize={'1.25rem'}
                >
                    SIGN IN
                </Typography>
            </Button>
            <Stack
                direction={'row'}
                spacing={1}
                justifyContent={'center'}
                mt={1}
                mb={4}
            >
                <Typography variant={'body2'}>
                    New to NeFTb?
                </Typography>
                <Typography
                    variant={'body2'}
                    onClick={handleSignUp}
                    sx={{
                        textDecoration: 'underline',
                        cursor: 'pointer',
                        '&:hover': {
                            color: '#5d53d9',
                        },
                    }}
                >
                    Sign up
                </Typography>
            </Stack>

        </Box>
    )
}

export default observer(Auth)
