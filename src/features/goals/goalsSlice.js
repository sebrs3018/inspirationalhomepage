import { createSlice } from '@reduxjs/toolkit';


/*
    Goal = {
        id: ...,
        description: ...,
        complete: ...
    }
*/


export const goalsSlice = createSlice({
    name: 'goals',
    initialState: {
        goals: []
    },
    reducers: {
        insertGoal: (state, action) => {
            const { goals } = state;
            goals.push({ ...action.payload, complete: false });
        },
        removeGoal: (state, action) => {
            const { goals } = state;
            const { id } = action.payload;
            const indexToRemove = goals.findIndex(g => g.id === id);

            goals.splice(indexToRemove, 1);
        },
        markAsComplete: (state, action) => {
            const { goals } = state;
            console.log(action);
            const { id } = action.payload;
            const goal = goals.find(g => g.id === id);
            goal.complete = true;
        } 
    },

});

export const selectGoals = (state) => state.goals.goals; 

export const { insertGoal, markAsComplete, removeGoal } = goalsSlice.actions;
export default goalsSlice.reducer;