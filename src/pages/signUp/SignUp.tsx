import React, { FC, useCallback, useState } from 'react'
import { Box, Button, Checkbox, FormControl, FormControlLabel, IconButton, InputAdornment, InputLabel, Stack, Typography } from '@mui/material'
import discord from '../../assets/icons/socialNetworks/discord.svg'
import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import theme from '../../utils/theme'
import stores from '../../stores/Stores'
import { GGInputBase } from '../../components/GGInputBase'
import { SocialNetworkLink } from '../../components/SocialNetworkLink'
import { Pages } from '../../utils/routes'
import { useNavigate } from 'react-router-dom'
import google from '../../assets/icons/socialNetworks/google.svg'
import twitch from '../../assets/icons/socialNetworks/twitch.svg'
import { Errors } from '../../utils/enums'


const SignUp: FC = () => {

    const navigate = useNavigate()
    const [checked, setChecked] = useState(false)
    const [showPassword, setShowPassword] = useState(false)
    const [emailError, setEmailError] = useState<Errors | null>(null)
    const [loginError, setLoginError] = useState<Errors | null>(null)
    const [passwordError, setPasswordError] = useState<Errors | null>(null)
    const [termsError, setTermsError] = useState<Errors | null>(null)

    const handleClickShowPassword = useCallback(() => {
        setShowPassword((prevState) => !prevState)
    }, [])

    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>): void => {
        event.preventDefault()
    }

    const handleSignIn = useCallback(() => {
        navigate(Pages.auth)
    }, [navigate])

    const resetLoginError = useCallback(() => {
        setLoginError(null)
    }, [])

    const resetEmailError = useCallback(() => {
        setEmailError(null)
    }, [])

    const resetPasswordError = useCallback(() => {
        setPasswordError(null)
    }, [])

    const resetTermsError = useCallback(() => {
        setTermsError(null)
    }, [])

    const handleSignUp = useCallback(() => {
        const checkLogin = (): void => {
            if (stores.signUp.login === '') {
                setLoginError(Errors.loginAlreadyExist)
            } else {
                setLoginError(null)
            }
        }

        const checkEmail = (): void => {
            const isEmail = stores.signUp.email
                .toLowerCase()
                .match(
                    // eslint-disable-next-line max-len
                    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                )
            if (!isEmail) {
                setEmailError(Errors.incorrectEmail)
            } else {
                // if (smth) {
                //     // if email doesnt exist
                //     setError(Errors.nonExistentEmail)
                // }
                setEmailError(null)
            }
        }

        const checkPasswords = (): void => {
            if (stores.signUp.password.length < 8) {
                setPasswordError(Errors.weakPassword)
            } else if (stores.signUp.password !== stores.signUp.repeatPassword) {
                setPasswordError(Errors.passwordsDontMatch)
            } else {
                setPasswordError(null)
            }
        }

        const checkTerms = (): void => {
            if (!checked) {
                setTermsError(Errors.termsDontAgreed)
            } else {
                setTermsError(null)
            }
        }

        checkLogin()
        checkEmail()
        checkPasswords()
        checkTerms()
    }, [checked])

    const handleTermsCheck = useCallback(() => {
        setChecked((prevState) => !prevState)
        resetTermsError()
    }, [resetTermsError])

    return (
        <Stack
            direction={'column'}
            alignItems={'center'}
            sx={{
                mt: -6,
                pb: 6,
                overflow: 'hidden',
                [theme.breakpoints.down('md')]: {
                    mt: 2,
                },
            }}
        >
            <Typography variant={'h3'}>
                SIGN UP
            </Typography>
            <Stack
                direction={'column'}
                alignItems={'center'}
            >
                <FormControl
                    variant={'standard'}
                    error={loginError !== null}
                    onFocus={resetLoginError}
                    sx={{
                        mt: 1,
                    }}
                >
                    <InputLabel
                        shrink
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
                        autoFocus
                        inputMode={'text'}
                        error={loginError !== null}
                        onChange={(event): void =>
                            stores.signUp.updateLogin(event.target.value)}
                    />
                    {
                        loginError === Errors.loginAlreadyExist &&
                        <Typography
                            variant={'body1'}
                            sx={{
                                color: '#f00',
                                textAlign: 'end',
                            }}
                        >
                            This login already taken
                        </Typography>
                    }
                </FormControl>
                <FormControl
                    variant={'standard'}
                    error={emailError !== null}
                    onFocus={resetEmailError}
                    sx={{
                        mt: 2,
                    }}
                >
                    <InputLabel
                        shrink
                        sx={{
                            fontSize: '1.5rem',
                            pl: 1,
                            '&.Mui-focused': {
                                color: 'white',
                            },
                        }}
                    >
                        Email
                    </InputLabel>
                    <GGInputBase
                        inputMode={'email'}
                        error={emailError !== null}
                        onChange={(event): void =>
                            stores.signUp.updateEmail(event.target.value)}
                    />
                    {
                        emailError === Errors.incorrectEmail &&
                        <Typography
                            variant={'body1'}
                            sx={{
                                color: '#f00',
                                textAlign: 'end',
                            }}
                        >
                            Incorrect email
                        </Typography>
                    }
                    {
                        emailError === Errors.emailAlreadyExist &&
                        <Typography
                            variant={'body1'}
                            sx={{
                                color: '#f00',
                                textAlign: 'end',
                            }}
                        >
                            This email already taken
                        </Typography>
                    }
                </FormControl>
                <FormControl
                    variant={'standard'}
                    error={passwordError !== null}
                    onFocus={resetPasswordError}
                    sx={{
                        mt: 2,
                    }}
                >
                    <InputLabel
                        shrink
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
                        inputMode={'text'}
                        type={showPassword ? 'text' : 'password'}
                        error={passwordError !== null}
                        onChange={(event): void =>
                            stores.signUp.updatePassword(event.target.value)}
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
                    {
                        passwordError === Errors.weakPassword &&
                        <Typography
                            variant={'body1'}
                            sx={{
                                color: '#f00',
                                textAlign: 'end',
                            }}
                        >
                            Weak password
                        </Typography>
                    }
                </FormControl>
                <FormControl
                    variant={'standard'}
                    error={passwordError !== null}
                    onFocus={resetPasswordError}
                    onKeyDown={(event): void => {
                        if(event.code === 'Enter') {
                            handleSignUp()
                        }
                    }}
                    sx={{
                        mt: 2,
                    }}
                >
                    <InputLabel
                        shrink
                        sx={{
                            fontSize: '1.5rem',
                            pl: 1,
                            '&.Mui-focused': {
                                color: 'white',
                            },
                        }}
                    >
                        Repeat password
                    </InputLabel>
                    <GGInputBase
                        inputMode={'text'}
                        type={showPassword ? 'text' : 'password'}
                        error={passwordError !== null}
                        onChange={(event): void =>
                            stores.signUp.updateRepeatPassword(event.target.value)}
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
                    {
                        passwordError === Errors.passwordsDontMatch &&
                        <Typography
                            variant={'body1'}
                            sx={{
                                color: '#f00',
                                textAlign: 'end',
                            }}
                        >
                            {/* eslint-disable-next-line react/no-unescaped-entities */}
                            Passwords don't match
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
                OR SIGN UP WITH
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
            <Box
                sx={{
                    width: theme.breakpoints.values.sm * 0.75,
                    maxWidth: '85vw',
                }}
            >
                <FormControlLabel
                    label={'I agree the Terms of Service and Privacy Policy'}
                    checked={checked}
                    onChange={handleTermsCheck}
                    control={(
                        <Checkbox
                            sx={{
                                color: termsError === Errors.termsDontAgreed ? 'red' : 'white',
                                '&.Mui-checked': {
                                    color: 'white',
                                },
                            }}
                        />
                    )}
                    sx={{ mt: 2 }}
                />
            </Box>
            <Button
                variant={'contained'}
                disableElevation
                onClick={handleSignUp}
                sx={{
                    width: theme.breakpoints.values.sm * 0.75,
                    maxWidth: '85vw',
                    py: 2,
                    px: 4,
                    mt: 2,
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
                    SIGN UP
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
                    Already have an account?
                </Typography>
                <Typography
                    variant={'body2'}
                    onClick={handleSignIn}
                    sx={{
                        textDecoration: 'underline',
                        cursor: 'pointer',
                        '&:hover': {
                            color: '#5d53d9',
                        },
                    }}
                >
                    Sign in
                </Typography>
            </Stack>
        </Stack>
    )
}

export default SignUp
