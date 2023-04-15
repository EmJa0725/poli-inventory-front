import * as React from 'react';
import Box from '@mui/material/Box';
import { useEffect, useState } from 'react';
import { TextField, Button, Stack } from '@mui/material';
import { handleClientScriptLoad } from 'next/script';

const style = {
    position: 'absolute',
    textAlign: 'center',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

export default function CustomDeleteForm({ title, selectedItem, deleteFunction, setOpen, setTableData, alertProps, setAlertProps }) {

    const handleSubmit = async (event) => {
        try {
            event.preventDefault();
            console.log(selectedItem.id);
            // Call andFunction here
            const res = await deleteFunction(selectedItem.id);

            if (res.message?.includes('Error')) {
                throw new Error(res.message);
            }

            setAlertProps({
                ...alertProps,
                show: true,
                type: 'success',
                message: res.message,
            });

            // Remove the deleted product from the table
            setTableData((prev) => {
                return prev.filter((product) => product.id !== selectedItem.id);
            });
        } catch (error) {
            setAlertProps({
                ...alertProps,
                show: true,
                type: 'error',
                message: error.message,
            });
        } finally {
            setOpen(false);
        }
    };

    const handleCancel = () => {
        setOpen(false);
    }

    return (
        <>
            <Box sx={style} alignItems="center">
                <h2 style={{ marginBottom: '1.5rem' }}>
                    Delete {title}
                </h2>
                <form onSubmit={handleSubmit}>
                    <p>
                        This action cannot be undone. ¿Are you sure you want to delete <br />
                        <span style={{ fontWeight: 'bold' }}>
                            {selectedItem.name}?
                        </span>
                    </p>
                    <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '1.5rem' }}>
                        <Stack direction="row" spacing={2}>
                            <Button type="submit" variant="contained" color="primary">
                                Submit
                            </Button>
                            <Button type="button" variant="contained" color="secondary" onClick={handleCancel}>
                                Cancel
                            </Button>
                        </Stack>
                    </Box>
                </form>
            </Box>
        </>
    );
}






