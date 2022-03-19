import 'reflect-metadata'
import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Box, ThemeProvider } from '@mui/material'

import theme from './utils/theme'
import { Pages } from './utils/routes'

import Main from './pages/main/Main'
import SignUp from './pages/signUp/SignUp'
import Auth from './pages/auth/Auth'
import NFTAppBar from './components/appbar/Appbar'
import NFTFooter from './components/Footer'
import ResetPassword from './pages/resetPassword/ResetPassword'
import NewPassword from './pages/resetPassword/NewPassword'
import UserGlobalStyles from './utils/UserGlobalStyles'
import Collections from './pages/collection/Collections'


ReactDOM.render(
    <React.StrictMode>
        <ThemeProvider theme={theme}>
            <UserGlobalStyles theme={theme}/>
            <BrowserRouter>
                <NFTAppBar/>
                <Box flex={1}>
                    <Routes>
                        <Route path={Pages.main} element={<Main/>}/>
                        <Route path={Pages.signUp} element={<SignUp/>}/>
                        <Route path={Pages.auth} element={<Auth/>}/>
                        <Route path={Pages.resetPassword} element={<ResetPassword/>}/>
                        <Route path={Pages.setNewPassword} element={<NewPassword/>}/>
                        <Route path={Pages.collections} element={<Collections/>}/>
                    </Routes>
                </Box>
                <NFTFooter/>
            </BrowserRouter>
        </ThemeProvider>
    </React.StrictMode>,
    document.getElementById('root'),
)
