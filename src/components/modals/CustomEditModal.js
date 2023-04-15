import * as React from 'react';
import Box from '@mui/material/Box';
import { useEffect, useState } from 'react';
import { TextField, Button, Modal } from '@mui/material';
import CustomAlert from '../alerts/CustomAlert';

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

export default function CustomEditModal({ selectedProduct, editFunction, formFields, open, setOpen, setTableData }) {
    const [updatedFormFields, setUpdatedFormFields] = useState([]);
    const dataTypes = {
        varchar: 'text',
        int: 'number',
        float: 'number'
    };
    const [alertProps, setAlertProps] = useState({
        show: false,
        type: 'success',
        message: '',
        vertical: 'top',
        horizontal: 'right',
    });

    useEffect(() => {
        setUpdatedFormFields(mapDataTypes());
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedProduct]);

    const mapDataTypes = () => {
        console.log(formFields);
        return formFields.map((field) => {
            const { type, ...rest } = field;
            const updatedType = dataTypes[type];
            return { ...rest, type: updatedType, value: selectedProduct[rest.name] };
        });
    };

    const handleSubmit = async (event) => {
        try {
            event.preventDefault();
            const data = new FormData(event.currentTarget);
            console.log({
                data: Object.fromEntries(data.entries())
            });
            // Call andFunction here
            const res = await editFunction({
                id: selectedProduct.id,
                ...Object.fromEntries(data.entries())
            });

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
                    if (row.id === selectedProduct.id) {
                        return { ...row, ...Object.fromEntries(data.entries()) };
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

    const handleOnChange = (event) => {
        const { name, value } = event.target;
        setUpdatedFormFields((prev) => {
            return prev.map((field) => {
                if (field.name === name) {
                    return { ...field, value };
                }
                return field;
            });
        });
    };

    const handleClose = () => setOpen(false);

    return (
        <>
            {alertProps.show && <CustomAlert alertProps={alertProps} setAlertProps={setAlertProps} />}
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style} alignItems="center">
                    <h2 style={{ marginBottom: '1.5rem' }}>
                        Edit Product
                    </h2>
                    <form onSubmit={handleSubmit}>
                        {updatedFormFields?.map((field) => (
                            <div key={field.name} >
                                <TextField
                                    margin='normal'
                                    name={field.name}
                                    label={field.name}
                                    type={field.type}
                                    value={field.value}
                                    onChange={(e) => handleOnChange(e)}
                                    inputProps={{ min: 0 }}
                                    required
                                />
                            </div>
                        ))}
                        <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '1rem' }}>
                            <Button type="submit" variant="contained" color="primary">
                                Submit
                            </Button>
                        </Box>
                    </form>
                </Box>
            </Modal>
        </>
    );
}
