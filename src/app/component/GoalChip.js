import React, { useState } from 'react';

import {
    markAsComplete,
    removeGoal
} from '../../features/goals/goalsSlice';

import { useDispatch } from 'react-redux';
import { Chip } from '@mui/material';

import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
    palette: {
        primary: {
            // Purple and green play nicely together.
            main: '#545e75',
        },
        secondary: {
            // This is green.A700 as hex.
            main: '#8eb8e5',
        },
    },
});



export const GoalChip = ({ description, id }) => {
    const [props, setProps] = useState({
        variant: 'outlined',
        color: 'primary'
    });

    const dispatcher = useDispatch();

    const handleDelete = (id) => {
        console.log('removing');
        dispatcher(removeGoal({ id: id }));
    }

    const handleClick = (id) => {
        console.log('mark as complete');
        dispatcher(markAsComplete({ id: id }));
        setProps({
            color: 'secondary',
        });
    }

    //TODO: inserire colore più carino al caso "da completare" per i vari chip-task
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