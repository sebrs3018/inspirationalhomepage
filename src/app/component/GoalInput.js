import React, { useState, useEffect, useRef } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { TextField } from '@mui/material'
import { insertGoal } from '../../features/goals/goalsSlice';
import { useDispatch } from 'react-redux';

export const GoalInput = () => {

    const [textToSave, setTextToSave] = useState('');
    const goalDescription = useRef(''); //It's important to notice that this reference will hold also when the keyDown event fires!

    const dispatch = useDispatch();

    const handleChange = ({ target }) => {
        setTextToSave(target.value);
        goalDescription.current = target.value;
    }

    const handleKeyDown = (event) => { 
        if (event.key === 'Enter') {
            dispatch(insertGoal({ id: uuidv4(), description: goalDescription.current }));
            goalDescription.current = '';
            setTextToSave('');
        }
    }

    useEffect(() => {
        window.addEventListener('keydown', handleKeyDown);
        return () => {
            window.removeEventListener('keydown', handleKeyDown)
        }
    }, []);


    return <>
        <TextField id="goalTf" label="Any goals to share?" variant="outlined" fullWidth
            onChange={handleChange}
            value={textToSave}
        />
    </>
}