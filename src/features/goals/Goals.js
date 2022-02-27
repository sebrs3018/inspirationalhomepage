import { Paper } from '@mui/material';
import { useSelector } from 'react-redux'
import { GoalChip } from '../../app/component/GoalChip';
import {
    selectGoals,
} from './goalsSlice'


export const Goals = () => {

    const currentGoals = useSelector(selectGoals);

    return <div style={{ height: "70%", width: "95%" }}>
        <Paper elevation={1} sx={{ backgroundColor: 'rgba(207, 203, 202, 0.5)', height: "95%", display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <div style={{ height: "90%", width: "95%" }}>
                {currentGoals.map(g => (<GoalChip key={g.id}
                    id={g.id}
                    description={g.description}
                    completed={g.complete}
                />))}
            </div>
        </Paper>
    </div>;
}