import React, { useState } from 'react';

import {
    markAsComplete,
    markAsTodo,
    removeGoal
} from '../../features/goals/goalsSlice';

import { useDispatch } from 'react-redux';
import { Chip } from '@mui/material';

import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
    palette: {
        primary: {
            // Purple and green play nicely together.
            main: '#1976d2',
        },
        secondary: {
            // This is green.A700 as hex.
            main: '#3EA34D',
        },
    },
});



export const GoalChip = ({ description, id, completed }) => {
    const [props, setProps] = useState({
        variant: 'outlined',
        color: 'primary'
    });

    const dispatcher = useDispatch();

    const handleDelete = (id) => {
        dispatcher(removeGoal({ id: id }));
    }

    //TODO: da correggere colore!
    const handleClick = (id) => {
        if(!completed){
            dispatcher(markAsComplete({ id: id }));
            setProps({
                color: 'secondary',
            });
        }
        else{
            dispatcher(markAsTodo({ id: id }));
            setProps({
                color: 'primary',
                variant: 'outlined'
            });
        }
    }

    return <ThemeProvider theme={theme}>
        <Chip
            sx={{ marginRight: 2 }}
            label={description}
            {...props}
            onClick={() => handleClick(id)}
            onDelete={() => handleDelete(id)}
        />
    </ThemeProvider>
} 