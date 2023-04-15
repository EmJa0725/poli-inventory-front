import * as React from 'react';
import { Modal } from '@mui/material';

export default function CustomModal({ open, setOpen, ChildComponent, childComponentProps}) {
    const handleClose = () => setOpen(false);
    childComponentProps.setOpen = setOpen;
    return (
        <>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >   
                <>
                    <ChildComponent {...childComponentProps} />
                </>
            </Modal>
        </>
    );
}
