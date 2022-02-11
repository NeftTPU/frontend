import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { ThemeProvider } from '@mui/material'

import theme from './utils/theme'
import { SCREENS } from './utils/routes'

import Main from './pages/main/Main'
import SignUp from './pages/signUp/SignUp'
import Auth from './pages/auth/Auth'
import NFTAppBar from './components/appbar/Appbar'
import NFTFooter from './components/Footer'


ReactDOM.render(
    <React.StrictMode>
        <ThemeProvider theme={theme}>
            <BrowserRouter>
                <NFTAppBar/>
                <Routes>
                    <Route path={SCREENS.mainPage} element={<Main/>}/>
                    <Route path={SCREENS.signUpPage} element={<SignUp/>}/>
                    <Route path={SCREENS.authPage} element={<Auth/>}/>
                </Routes>
                <NFTFooter/>
            </BrowserRouter>
        </ThemeProvider>
    </React.StrictMode>,
    document.getElementById('root'),
)
