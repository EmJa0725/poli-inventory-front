import * as React from 'react';
import Box from '@mui/material/Box';
import { useEffect, useState } from 'react';
import { TextField, Button } from '@mui/material';
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

export default function CustomAddForm({ title, addFunction, formFields, setOpen, setTableData, alertProps, setAlertProps }) {
    const dataTypes = {
        varchar: 'text',
        int: 'number',
        float: 'number'
    };

    const [updatedFormFields, setUpdatedFormFields] = useState([]);

    useEffect(() => {
        setUpdatedFormFields(mapDataTypes());
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const mapDataTypes = () => {
        return formFields.map((field) => {
            const { type, ...rest } = field;
            const updatedType = dataTypes[type];
            return { ...rest, type: updatedType };
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
            const res = await addFunction(Object.fromEntries(data.entries()));

            if (res.message?.includes('Error')) {
                throw new Error(res.message);
            }

            setAlertProps({
                ...alertProps,
                show: true,
                type: 'success',
                message: res.message,
            });

            setTableData((prev) => [...prev, res[title.toLowerCase()]]);

            // // Clear input fields
            // event.target.reset();
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

    return (
        <>
            <Box sx={style} alignItems="center">
                <h2 style={{ marginBottom: '1.5rem' }}>
                    Add {title}
                </h2>
                <form onSubmit={handleSubmit}>
                    {updatedFormFields?.map((field) => (
                        <div key={field.name} >
                            <TextField
                                margin='normal'
                                name={field.name}
                                label={field.name}
                                type={field.type}
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
