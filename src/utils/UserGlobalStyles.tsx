import React, { FC } from 'react'
import { GlobalStyles, Theme } from '@mui/material'


const UserGlobalStyles: FC<{ theme: Theme }> = () => (
    <GlobalStyles
        styles={{
            'body': {
                margin: 0,
                backgroundColor: '#080E24',
            },

            '#root': {
                height: '100%',
                minHeight: '100vh',
                display: 'flex',
                flexDirection: 'column',
            },

            /**
             * Text selection color
             */
            '::selection': {
                background: '#5d53d9',
            },
            '::-moz-selection': {
                background: '#5d53d9',
            },
            'video': {
                display: 'block',
            },
        }}
    />
)

export default UserGlobalStyles
