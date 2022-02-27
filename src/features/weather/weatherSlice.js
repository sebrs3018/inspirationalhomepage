import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getWeatherByCityName } from './weatherApi';

export const fetchWeatherByCity = createAsyncThunk(
    'weather/fetchWeatherByCity',
    async (cityName, thunkAPI) => {
        // console.log(cityName);
        const response = await getWeatherByCityName(cityName);
        thunkAPI.dispatch(setWeather(response));
        return response;
    }
);

const weatherSlice = createSlice({
    name: 'weather',
    initialState: {
        weather: {}
    },
    reducers: {
        setWeather: (state, action) => {
            state.weather = action.payload;
        }
    },
    extraReducers: {
        [fetchWeatherByCity.fulfilled]: (state, action) => {
            console.log('fulfilled');
        },
        [fetchWeatherByCity.pending]: (state, action) => {
            console.log('pending');
        },
        [fetchWeatherByCity.rejected]: (state, action) => {
            console.log('rejected');
        }
    }
});


export const { setWeather } = weatherSlice.actions;
export const selectWeather = state => state.weather.weather;
export default weatherSlice.reducer;