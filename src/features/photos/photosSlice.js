import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getRandomPhotoAsync } from './photosApi';


export const nextPhoto = createAsyncThunk(
    'photos/nextPhoto',
    async (id, thunkAPI) => {
        const photos = selectPhotos(thunkAPI.getState());
        const curIndex = photos.findIndex(p => p.id === id);
        if (curIndex === photos.length - 1)
            thunkAPI.dispatch(fetchRandomPhoto());
        else{
            const nPhoto = photos[curIndex + 1];
            thunkAPI.dispatch(setCurrentPhoto(nPhoto))
        }
    }
);

export const fetchRandomPhoto = createAsyncThunk(
    'photos/getRandomPhoto',
    async (args, thunkAPI) => {
        const { photoToShowUrl, id } = await getRandomPhotoAsync();
        const newPhoto = { url: photoToShowUrl, id: id };
        thunkAPI.dispatch(addNewPhoto(newPhoto));
        thunkAPI.dispatch(setCurrentPhoto(newPhoto));
    }
);

const photosSlice = createSlice({
    name: 'photos',
    initialState: {
        photosUrl: [],
        currentPhotoUrl: {},
    },
    reducers: {
        addNewPhoto: (state, action) => {
            let { photosUrl } = state;
            photosUrl.push(action.payload);
        },
        setCurrentPhoto: (state, action) => {
            state.currentPhotoUrl = action.payload;
        },
        previousPhoto: (state, action) => {
            const { id } = action.payload;
            const { photosUrl } = state;
            const currentIndex = photosUrl.findIndex(p => p.id === id);
            const length = photosUrl.length;
            const prevIndex = currentIndex - 1;
            state.currentPhotoUrl = photosUrl[prevIndex < 0 ? length - 1 : prevIndex];
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

export const selectPhotos = state => state.photos.photosUrl;
export const selectCurrentPhotoUrl = state => state.photos.currentPhotoUrl;
export const { setCurrentPhoto, previousPhoto, addNewPhoto } = photosSlice.actions;
export default photosSlice.reducer;