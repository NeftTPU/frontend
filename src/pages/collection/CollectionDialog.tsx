import React, { FC } from 'react'
import { TransitionProps } from '@mui/material/transitions'
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    ImageList,
    ImageListItem,
    Slide,
} from '@mui/material'
import { observer } from 'mobx-react-lite'
import { BASE_URL } from '../../utils/consts'
import stores from '../../stores/Stores'
import FullImageDialog from '../../components/FullImageDialog'


const Transition = React.forwardRef(function Transition(
    props: TransitionProps & {
        children: React.ReactElement<any, any>;
    },
    ref: React.Ref<unknown>,
) {
    return <Slide direction={'up'} ref={ref} {...props} />
})

const CollectionDialog: FC = () => {

    const [open, setOpen] = React.useState(false)
    const [image, setImage] = React.useState<string | undefined>(undefined)

    function handleClose() {
        setOpen(false)
    }

    function openFullImage(imagePath: string) {
        setImage(BASE_URL + imagePath)
        setOpen(true)
    }

    return (
        <>
            <Dialog
                open={stores.collectionDialog.open}
                TransitionComponent={Transition}
                keepMounted
                onClose={stores.collectionDialog.closeDialog}
                PaperProps={{
                    style: { background: '#0f1a40' },
                }}
            >
                <DialogTitle>{stores.collectionDialog.collection?.title}</DialogTitle>
                <DialogContent>
                    {
                        stores.collectionDialog.collection &&
                        <ImageList sx={{ width: 500, height: 450 }} cols={2} rowHeight={164}>
                            {
                                stores.collectionDialog.collection.images.map((image) => (
                                    <ImageListItem key={image.id}>
                                        <img
                                            src={BASE_URL + image.file}
                                            alt={`${image.id}`}
                                            style={{
                                                width: '98%',
                                                objectFit: 'contain',
                                                cursor: 'pointer'
                                            }}
                                            loading={'lazy'}
                                            onClick={() => openFullImage(image.file)}
                                        />
                                    </ImageListItem>
                                ))}
                        </ImageList>
                    }
                </DialogContent>
                <DialogActions>
                    <Button onClick={stores.collectionDialog.closeDialog}>Close</Button>
                </DialogActions>
            </Dialog>
            {
                image &&
                <FullImageDialog image={image} open={open} handleClose={handleClose}/>
            }
        </>
    )
}

export default observer(CollectionDialog)
