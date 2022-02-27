import React, { useState, useEffect, useRef, useCallback } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { TextField } from '@mui/material'
import { insertGoal } from '../../features/goals/goalsSlice';
import { useDispatch } from 'react-redux';

export const GoalInput = () => {

    const [textToSave, setTextToSave] = useState('');  
    const [errorProps, setErrorProps] = useState({});
    const goalDescription = useRef(''); //It's important to notice that this reference will hold also when the keyDown event fires!

    const dispatch = useDispatch();

    const handleChange = ({ target }) => {
        if(target.value?.trim().length > 0){
            setErrorProps({})
        }
        setTextToSave(target.value);
        goalDescription.current = target.value;
    }

    const handleKeyDown = useCallback((event) => { 
            if (event.key === 'Enter') {
    
                goalDescription.current = goalDescription.current.trim();
                if(!goalDescription.current){
                    console.log('empty!');
                    setErrorProps({
                        error: true,
                        label: "Error",
                        helperText: "The goal must have at least one non-empty character"
                    });
                }
                else{
                    dispatch(insertGoal({ id: uuidv4(), description: goalDescription.current }));
                }
    
                goalDescription.current = '';
                setTextToSave('');
            }
    }, [dispatch]);

    useEffect(() => {
        console.log('setting a listener!');

        window.addEventListener('keydown', handleKeyDown);
        return () => {
            window.removeEventListener('keydown', handleKeyDown)
        }
    }, [handleKeyDown]);


    return <>
        <TextField id="goalTf" label="Any goals to share?" variant="outlined" fullWidth
            {...errorProps}
            onChange={handleChange}
            value={textToSave}
        />
    </>
}