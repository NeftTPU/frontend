import * as React from 'react'
import { useState } from 'react'
import { AppBar, Avatar, Box, Button, Container, IconButton, Stack, Toolbar, Tooltip } from '@mui/material'
import { SCREENS } from '../../utils/routes'
import { useNavigate } from 'react-router-dom'
import theme from '../../utils/theme'
import rootStore from '../../stores/RootStore'
import { observer } from 'mobx-react-lite'


const NFTAppBar = () => {
    // const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null)
    const navigate = useNavigate()
    // const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    //     setAnchorElNav(event.currentTarget)
    // }
    //
    // const handleCloseNavMenu = () => {
    //     setAnchorElNav(null)
    // }

    return (
        <AppBar
            position="static"
            elevation={0}
            sx={{
                background: 'linear-gradient(180deg, rgba(0,0,0,1) 0%, rgba(255,255,255,0) 100%)',
                height: 180,
                [theme.breakpoints.down('md')]: {
                    height: 100,
                },
            }}
        >
            <Container maxWidth="lg">
                <Toolbar disableGutters>
                    {/* Mobile centered logo */}
                    <Container
                        sx={{
                            flexGrow: 1,
                            justifyContent: rootStore.appBarStore.isAuthorized ? 'center' : 'start',
                            display: { xs: 'flex', md: 'none' },
                        }}
                        onClick={() => {
                            navigate(SCREENS.mainPage, { replace: true })
                        }}
                    >
                        (logo)
                    </Container>

                    {/* Big screen logo */}
                    <Container sx={{
                        mx: 'auto',
                        width: '10%',
                        display: { xs: 'none', md: 'flex' },
                    }}
                               onClick={() => {
                                   navigate(SCREENS.mainPage, { replace: true })
                               }}
                    >
                        (logo)
                    </Container>


                    {/* Profile pic for both pc and mobile*/}
                    <Box flexGrow={0}>
                        {
                            rootStore.appBarStore.isAuthorized ?
                                <Tooltip title="Профиль">
                                    <IconButton sx={{ p: 0 }} href={SCREENS.mainPage}>
                                        <Avatar alt="User's avatar"/>
                                    </IconButton>
                                </Tooltip>
                                :
                                <Stack direction={'row'} spacing={1.5}>
                                    <Button
                                        variant={'outlined'}
                                        onClick={rootStore.appBarStore.authorize}
                                        sx={{
                                            color: 'white',
                                            borderColor: 'white',
                                            borderRadius: 1,
                                            textTransform: 'none',
                                            fontFamily: '"Montserrat", sans-serif',
                                            ':hover': {
                                                borderColor: '#d5d4d4',
                                            },
                                        }}
                                    >
                                        Вход
                                    </Button>
                                    <Button
                                        variant={'contained'}
                                        disableElevation
                                        onClick={() => console.log('bought')}
                                        sx={{
                                            background: '#554ADA',
                                            borderRadius: 1,
                                            textTransform: 'none',
                                            fontFamily: '"Montserrat", sans-serif',
                                            ':hover': {
                                                background: '#5d53d9',
                                            },
                                        }}
                                    >
                                        Регистрация
                                    </Button>
                                </Stack>
                        }

                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    )
}

export default observer(NFTAppBar)
