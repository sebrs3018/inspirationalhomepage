import {
    Modal,
    Button,
    Box,
    Typography,

} from '@mui/material';
import React, { useState } from 'react';


const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

export const QuoteModal = (prop) => {
    const { buttonText, headerText, quoteText, quoteAuthor } = prop;

    const [open, setOpen] = useState(false);

    const handleOpen = () => {
        setOpen(true);
    }

    const handleClose = () => {
        setOpen(false);
    }

    return <div>
        <Button variant='contained' onClick={handleOpen}>{buttonText}</Button>
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <Typography variant="h6" component="h2" textAlign={'center'}>
                    {headerText}
                </Typography>
                <Typography sx={{ mt: 2 }} >
                    {quoteText}
                </Typography>
                <Typography  sx={{ mt: 2 }} textAlign={'center'}>
                    {quoteAuthor}
                </Typography>
            </Box>
        </Modal>
    </div>
}