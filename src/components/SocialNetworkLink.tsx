import React, { ElementType, FC } from 'react'
import { IconButton, SvgIcon } from '@mui/material'


export const SocialNetworkLink: FC<{ icon: ElementType; viewBox: string }> = ({ icon, viewBox }) => (
    <IconButton size={'medium'}>
        <SvgIcon
            component={icon}
            viewBox={viewBox}
            style={{
                width: 32,
                height: 32,
            }}
        />
    </IconButton>
)