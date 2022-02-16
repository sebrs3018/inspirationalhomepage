import React, { useState } from 'react';

import {
    markAsComplete,
    removeGoal
} from '../../features/goals/goalsSlice';

import { useDispatch } from 'react-redux';
import { Chip } from '@mui/material';

export const GoalChip = ({ description, id }) => {
    const [completed, setCompleted] = useState('primary');
    const dispatcher = useDispatch();

    const handleDelete = (id) => {
        console.log('removing');
        dispatcher(removeGoal({ id: id }));
    }

    const handleClick = (id) => {
        console.log('mark as complete');
        dispatcher(markAsComplete({ id: id }));
        setCompleted('success');
    }
 
    //TODO: inserire colore più carino al caso "da completare" per i vari chip-task
    return <Chip
        label={description}
        color={completed}
        variant="outlined"
        onClick={() => handleClick(id)}
        onDelete={() => handleDelete(id)}
    />
} 