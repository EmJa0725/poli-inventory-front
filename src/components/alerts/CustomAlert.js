import * as React from 'react';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import Snackbar from '@mui/material/Snackbar';

export default function CustomAlert({ alertProps, setAlertProps }) {
    ;
    const { show, type, message, vertical, horizontal } = alertProps;

    const handleClose = (event, reason) => {
        if (!reason || reason?.includes('timeout')) {
            // Close alert
            setAlertProps({
                ...alertProps,
                show: false,
                type: 'success',
                message: ''
            });
        }
    };

    return (
        <Stack sx={{ width: '100%' }} spacing={2}>
            <Snackbar
                anchorOrigin={{ vertical, horizontal }}
                open={show}
                autoHideDuration={6000}
                onClose={handleClose}
                key={vertical + horizontal}
            >
                <Alert
                    severity={type}
                    sx={{ width: '100%' }}
                    onClose={handleClose}
                    elevation={6}
                    variant='filled'
                >
                    {message}
                </Alert>
            </Snackbar>
        </Stack>
    );
}