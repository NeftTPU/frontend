import * as React from 'react'
import { useCallback, useState } from 'react'
import {
    AppBar,
    Avatar,
    Box,
    Button,
    Container,
    IconButton,
    Link,
    Menu,
    MenuItem,
    Stack,
    Theme,
    Toolbar,
    Tooltip,
    Typography,
    useMediaQuery,
} from '@mui/material'
import { Pages } from '../../utils/routes'
import { useNavigate } from 'react-router-dom'
import theme from '../../utils/theme'
import { observer } from 'mobx-react-lite'
import stores from '../../stores/Stores'


interface NavPage {
    name: string
    link: Pages
}


const navPages = [
    {
        name: 'GENERATOR',
        link: Pages.main,
    },
]

const menuPages = [
    {
        name: 'Collections',
        link: Pages.collections,
    },
    {
        name: 'Log out',
        onClick: () => {
            void stores.appBar.logout()
            void stores.token.clearToken()
            window.location.reload()
        },
        link: Pages.main,
    },
]

const NFTAppBar = () => {
    const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null)
    const navigate = useNavigate()
    const isMobile = useMediaQuery((theme: Theme) => theme.breakpoints.down('md'))

    const handleOpenNavMenu = useCallback((event: React.MouseEvent<HTMLElement>) => {
        setAnchorElNav(event.currentTarget)
    }, [])

    const handleCloseNavMenu = (link: Pages): void => {
        setAnchorElNav(null)
        navigate(link)
    }

    const navigateToMainPage = useCallback(() => {
        navigate(Pages.main)
    }, [navigate])

    const navigateToAuthPage = useCallback(() => {
        navigate(Pages.auth)
    }, [navigate])

    const navigateToSignUpPage = useCallback(() => {
        navigate(Pages.signUp)
    }, [navigate])

    return (
        <AppBar
            position={'static'}
            elevation={0}
            sx={{
                background: 'linear-gradient(180deg, rgba(0,0,0,1) 0%, rgba(255,255,255,0) 100%)',
                height: 180,
                [theme.breakpoints.down('md')]: {
                    height: 100,
                },
            }}
        >
            <Container maxWidth={'lg'}>
                <Toolbar disableGutters>
                    {/* Mobile centered logo */}
                    <Stack
                        direction={'row'}
                        alignItems={'center'}
                        sx={{
                            flexGrow: isMobile ? 1 : 0,
                            cursor: 'pointer',
                        }}
                        onClick={navigateToMainPage}
                    >
                        {
                            stores.appBar.isAuthorized &&
                            <Typography variant={'h6'} fontFamily={'Raleway'}>
                                {'NFT GENERATOR'}
                            </Typography>
                        }
                    </Stack>

                    {/* Centered big screed navigation */}
                    {
                        !isMobile &&
                        <Stack
                            direction={'row'}
                            alignItems={'center'}
                            justifyContent={'center'}
                            spacing={12}
                            sx={{
                                flexGrow: 1,
                            }}
                        >
                            {
                                navPages.map((page: NavPage) => (
                                    <Link
                                        key={page.name}
                                        onClick={(): void => navigate(page.link)}
                                        sx={{
                                            my: 2,
                                            color: 'white',
                                            display: 'block',
                                            cursor: 'pointer',
                                        }}
                                    >
                                        <Typography>
                                            {page.name}
                                        </Typography>
                                    </Link>
                                ))
                            }
                        </Stack>
                    }

                    {/* Profile pic for both pc and mobile*/}
                    <Box flexGrow={0}>
                        {
                            stores.appBar.isAuthorized ?
                                <Box>
                                    <Tooltip title={'Профиль'}>
                                        <IconButton
                                            sx={{ p: 0 }}
                                            onClick={handleOpenNavMenu}
                                            aria-label={'menu-mobile'}
                                            aria-controls={'menu-appbar'}
                                            aria-haspopup={'true'}
                                        >
                                            <Avatar alt={'User\'s avatar'}/>
                                        </IconButton>
                                    </Tooltip>
                                    <Menu
                                        id={'menu-appbar'}
                                        anchorEl={anchorElNav}
                                        anchorOrigin={{
                                            vertical: 'bottom',
                                            horizontal: 'right',
                                        }}
                                        keepMounted
                                        transformOrigin={{
                                            vertical: 'top',
                                            horizontal: 'right',
                                        }}
                                        open={Boolean(anchorElNav)}
                                        onClose={handleCloseNavMenu}
                                        sx={{
                                            mt: 2,
                                            '& .MuiMenu-list': {
                                                background: (theme: Theme): string => theme.palette.primary.main,
                                                border: '1px solid #554ADA',
                                            },
                                        }}
                                    >
                                        {
                                            menuPages.map((page) => (
                                                <MenuItem
                                                    key={page.name}
                                                    onClick={page?.onClick ?? (() => handleCloseNavMenu(page.link))}
                                                    sx={{
                                                        ':hover': { background: '#554ADA' },
                                                    }}
                                                >
                                                    <Typography textAlign={'center'}>
                                                        {page.name}
                                                    </Typography>
                                                </MenuItem>
                                            ))
                                        }
                                    </Menu>
                                </Box>
                                :
                                <Stack direction={'row'} spacing={1.5}>
                                    <Button
                                        variant={'outlined'}
                                        onClick={navigateToAuthPage}
                                        // onClick={() => stores.appBar.authorize()}
                                        sx={{
                                            color: 'white',
                                            borderColor: 'white',
                                            borderRadius: 1,
                                            fontSize: '1rem',
                                            textTransform: 'none',
                                            fontFamily: '"Raleway", sans-serif',
                                            ':hover': {
                                                borderColor: '#d5d4d4',
                                            },
                                        }}
                                    >
                                        Sign In
                                    </Button>
                                    <Button
                                        variant={'contained'}
                                        disableElevation
                                        onClick={navigateToSignUpPage}
                                        sx={{
                                            background: '#554ADA',
                                            borderRadius: 1,
                                            fontSize: '1rem',
                                            textTransform: 'none',
                                            fontFamily: '"Raleway", sans-serif',
                                            ':hover': {
                                                background: '#5d53d9',
                                            },
                                        }}
                                    >
                                        Sign Up
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
