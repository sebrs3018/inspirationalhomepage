//TODO: inserire qua logica per inserimento/cancellazione/modifica dei vari goal. Non dimenticarti dei thunk
import { Paper } from '@mui/material';
import { useSelector } from 'react-redux'
import { GoalChip } from '../../app/component/GoalChip';
import {
    selectGoals,
} from './goalsSlice'

export const Goals = () => {
   
    const currentGoals = useSelector(selectGoals);

    return <div style={{ height: "70%", width: "95%" }}>
        <Paper elevation={1} sx={{ backgroundColor: 'rgba(1, 162, 127, 0.4)', height: "95%", display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <div style={{ height: "95%", width: "95%" }}>
                {currentGoals.map((g, index) => (<GoalChip key={index} id={ g.id } description={ g.description } /> )) }
            </div>
        </Paper>
    </div>;
}