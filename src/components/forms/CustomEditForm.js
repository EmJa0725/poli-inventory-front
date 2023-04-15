import * as React from 'react';
import Box from '@mui/material/Box';
import { useEffect, useState } from 'react';
import { TextField, Button } from '@mui/material';

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

export default function CustomEditForm({ title, selectedItem, editFunction, formFields, setOpen, setTableData, alertProps, setAlertProps }) {
    const [updatedFormFields, setUpdatedFormFields] = useState([]);
    const dataTypes = {
        varchar: 'text',
        int: 'number',
        float: 'number'
    };

    useEffect(() => {
        setUpdatedFormFields(mapDataTypes());
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedItem]);

    const mapDataTypes = () => {
        return formFields.map((field) => {
            const { type, ...rest } = field;
            const updatedType = dataTypes[type];
            return { ...rest, type: updatedType, value: selectedItem[rest.name] };
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
                id: selectedItem.id,
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
                    if (row.id === selectedItem.id) {
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

    return (
        <>
            <Box sx={style} alignItems="center">
                <h2 style={{ marginBottom: '1.5rem' }}>
                    Edit {title}
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
        </>
    );
}






