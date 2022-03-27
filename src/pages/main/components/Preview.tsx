import React, { FC } from 'react'
import { Box } from '@mui/material'
import stores from '../../../stores/Stores'
import { observer } from 'mobx-react-lite'
import { BASE_URL } from '../../../utils/consts'


const Preview: FC = () => {

    return (
        <Box
            px={2}
            position={'relative'}
            sx={{
                overflowY: 'scroll',
                height: '100%',
            }}
        >
            {
                stores.main?.currentImage?.image &&
                <img
                    src={BASE_URL + stores.main.currentImage.image?.file}
                    alt={'preview'}
                    style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'contain',
                        background: 'dimgrey'
                    }}
                />
            }
        </Box>
    )
}

export default observer(Preview)
