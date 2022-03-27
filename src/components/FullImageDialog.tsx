import { Button, Dialog, DialogActions, Slide } from '@mui/material'
import React, { FC } from 'react'
import { TransitionProps } from '@mui/material/transitions'


const Transition = React.forwardRef(function Transition(
    props: TransitionProps & {
        children: React.ReactElement;
    },
    ref: React.Ref<unknown>,
) {
    return <Slide direction="up" ref={ref} {...props} />
})


export interface FullImageDialogProps {
    image: string
    open: boolean
    handleClose: () => void
}


const FullImageDialog: FC<FullImageDialogProps> = ({ image, open, handleClose }) => {
    return (
        <>
            <Dialog
                maxWidth={'lg'}
                open={open}
                onClose={handleClose}
                TransitionComponent={Transition}
                keepMounted
                PaperProps={{
                    style: { background: '#0f1a40' },
                }}
            >
                <img
                    src={image}
                    style={{
                        width: '100%',
                        objectFit: 'contain',
                    }}
                    loading={'lazy'}
                />
                <DialogActions>
                    <Button onClick={handleClose}>Close</Button>
                </DialogActions>
            </Dialog>
        </>
    )
}

export default FullImageDialog
