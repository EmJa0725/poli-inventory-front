import * as React from 'react';
import Box from '@mui/material/Box';
import { useEffect, useState } from 'react';
import { TextField, Button, Stack } from '@mui/material';
import { handleClientScriptLoad } from 'next/script';
import CustomTable from '../tables/CustomTable';

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
    width: 'auto',
};

export default function ConfirmInventoryForm({ title, confirmFunction, setOpen, setTableData, confirmDataTable, alertProps, setAlertProps }) {

    const handleSubmit = async (event) => {
        try {
            event.preventDefault();
            // Call andFunction here
            const res = await confirmFunction(confirmDataTable);

            if (res.message?.includes('Error')) {
                throw new Error(res.message);
            }
            setAlertProps({
                ...alertProps,
                show: true,
                type: 'success',
                message: res.message,
            });

            setTableData((prev) => {
                return prev.map((row) => {
                    const updatedItem = res.updatedItems.find((item) => item.id === row.id);
                    if (updatedItem) {
                        // Update the quantity of the changed row
                        row.quantity = updatedItem['new quantity'];
                    }
                    return row;
                });
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
                    Confirm {title} changes
                </h2>
                <form onSubmit={handleSubmit}>
                    <p>
                        Please review the information below and confirm that you want to save the changes.
                    </p>
                    <CustomTable data={confirmDataTable} />
                    <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '1.5rem' }}>
                        <Stack direction="row" spacing={2}>
                            <Button type="submit" variant="contained" color="primary">
                                Submit
                            </Button>
                            <Button type="button" variant="contained" color="secondary" onClick={handleCancel}>
                                Continue Editing
                            </Button>
                        </Stack>
                    </Box>
                </form>
            </Box>
        </>
    );
}






