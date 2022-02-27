import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import {
    Paper,
    Grid,
} from '@mui/material';

import WbCloudyIcon from '@mui/icons-material/WbCloudy';

import {
    fetchWeatherByCity,
    selectWeather
} from './weatherSlice';

export const Weather = () => {
    const dispatch = useDispatch()
    let weather = useSelector(selectWeather);

    useEffect(() => {
        if (!weather || Object.keys(weather).length === 0) {
            console.log('getting the meteo');
            dispatch(fetchWeatherByCity('sevilla'));
        }
    }, [weather, dispatch]); 

    return <div style={{ position: 'absolute', right: 20, top: 20 }}>
        <Paper elevation={1} sx={{ backgroundColor: 'rgba(40, 175, 176, 0.8)', color: 'white' }}>
            <Grid container px={2} py={2} >
                <Grid item xs={6} sx={{ alignSelf: 'center' }}>
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                        <WbCloudyIcon fontSize='large' />
                    </div>
                </Grid>
                <Grid item container xs={6} alignItems='center' spacing={2}>
                    <Grid item xs={12}>
                        {`${weather?.temperature}°C`}
                    </Grid>
                    <Grid item xs={12}>
                        {weather?.description}
                    </Grid>
                </Grid>
            </Grid>
        </Paper>
    </div>
} 