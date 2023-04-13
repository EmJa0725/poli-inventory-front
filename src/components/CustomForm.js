import * as React from 'react';
import Box from '@mui/material/Box';
import { useEffect, useState } from 'react';
import { TextField, Button } from '@mui/material';

export default function CustomForm({ addFunction, formFields }) {
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

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        console.log({
            data: Object.fromEntries(data.entries())
        });
        // Call andFunction here
        addFunction(Object.fromEntries(data.entries()));
    };

    return (
        <form onSubmit={handleSubmit}>
            {updatedFormFields?.map((field) => (
                <TextField
                    key={field.name}
                    name={field.name}
                    label={field.name}
                    type={field.type}
                    required
                />
            ))}
            <Button type="submit" variant="contained" color="primary">
                Submit
            </Button>
        </form>
    );
}
