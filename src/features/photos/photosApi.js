import { createApi } from 'unsplash-js';

const unsplash = createApi({
    accessKey: 'nvsbiflO7X6Hlunn1K1KCQtJAb-bb79xr0LLQgAnndE',
    fetch: fetch,
});

export const getRandomPhotoAsync = async () => {
    // try {
    const result = await unsplash.photos.getRandom({
        collectionIds: ['11649432']
    });

    if (result.errors) {
        return null;
    }
    else {
        const photo = result.response;
        const photoToShowUrl = photo.urls.full; //da gestire con redux
        const {id} = photo; 
        return {photoToShowUrl, id};
    }
    // }
    // catch (err) {
    //     console.log(err);
    // }
}