import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getRandomPhotoAsync } from './photosApi';

export const fetchRandomPhoto = createAsyncThunk(
    'photos/getRandomPhoto',
    async (args, thunkAPI) => {
        const { photoToShowUrl, id } = await getRandomPhotoAsync();
        thunkAPI.dispatch(setCurrentPhoto({ url:  photoToShowUrl, id: id }));
        // return photoUrl;
    }
);

const photosSlice = createSlice({
    name: 'photos',
    initialState: {
       photosUrl: [],
       currentPhotoUrl: {},
    },
    reducers: {
        setCurrentPhoto: (state, action) => {
            let { photosUrl } = state;
            state.currentPhotoUrl = action.payload;
            photosUrl.push(action.payload);
        },
        previousPhoto: (state, action) => {
            const { id } = action.payload;
            const { photosUrl } = state;
            const currentIndex = photosUrl.findIndex( p => p.id === id );
            const length = photosUrl.length;
            const prevIndex = Math.abs(currentIndex - 1);
            state.currentPhotoUrl = photosUrl[prevIndex % length];
        }
    },
    extraReducers: {
        [fetchRandomPhoto.fulfilled]: (state, action) => {
            console.log('fulfilled');
        },
        [fetchRandomPhoto.rejected]: (state, action) => {
            console.log('rejected');
        },
        [fetchRandomPhoto.pending]: (state, action) => {
            console.log('pending');
        }
    }
});

export const selectCurrentPhotoUrl = state => state.photos.currentPhotoUrl;
export const { setCurrentPhoto, previousPhoto } = photosSlice.actions;
export default photosSlice.reducer;