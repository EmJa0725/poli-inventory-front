import * as React from 'react';
import Box from '@mui/material/Box';
import { useEffect, useState } from 'react';
import { TextField, Button } from '@mui/material';
import CustomAlert from '../alerts/CustomAlert';

export default function CustomAddForm({ addFunction, formFields }) {
    const dataTypes = {
        varchar: 'text',
        int: 'number',
        float: 'number'
    };

    const [updatedFormFields, setUpdatedFormFields] = useState([]);
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
            // Clear input fields
            event.target.reset();
        } catch (error) {
            setAlertProps({
                ...alertProps,
                show: true,
                type: 'error',
                message: error.message,
            });
        }
    };

    return (
        <>
            {alertProps.show && <CustomAlert alertProps={alertProps} setAlertProps={setAlertProps} />}
            <form onSubmit={handleSubmit}>
                {updatedFormFields?.map((field) => (
                    <div key={field.name} >
                        <TextField
                            margin='normal'
                            name={field.name}
                            label={field.name}
                            type={field.type}
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
        </>
    );
}
