import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import { Counter } from './features/counter/Counter';
import './App.css';
import Button from '@mui/material/Button';
import { createApi } from 'unsplash-js';
import { Grid } from '@mui/material';
import { Stack } from '@mui/material';
import { Paper } from '@mui/material';
import { TextField } from '@mui/material';
import { width } from '@mui/system';
import { Chip } from '@mui/material';

import Typography from '@mui/material/Typography';


const accesskey = 'nvsbiflO7X6Hlunn1K1KCQtJAb-bb79xr0LLQgAnndE';
const baseUrl = `https://api.unsplash.com/photos/?client_id=${accesskey}/random`;

const unsplash = createApi({
  accessKey: 'nvsbiflO7X6Hlunn1K1KCQtJAb-bb79xr0LLQgAnndE',
  fetch: fetch,
});


const getRandomPhotoAsync = async (setUrlFunc) => {
  try {
    const result = await unsplash.photos.get({ photoId: 'mtNweauBsMQ' });
    if (result.errors) {
      console.log('some error happened!');
    }
    else {
      const photo = result.response;
      const photoToShowUrl = photo.urls.full; //da gestire con redux
      setUrlFunc(photoToShowUrl);
    }
  }
  catch (err) {
    console.log(err);
  }
}


function App() {

  const [randomPhoto, setRandomPhoto] = useState(''); //Da gestire con redux

  useEffect(() => {
    getRandomPhotoAsync(setRandomPhoto);
  }, [randomPhoto]);



  console.log(randomPhoto);
  //TODO: pensare a come inserire background trasparente che legge stato => idea: styled components!
  return (
    <>
      <div className="background" style={{ backgroundImage: `url(${randomPhoto})` }} >
        {/* <img src={randomPhoto} /> */}
      </div>
      <Grid container spacing={2} marginTop={0} height={"100%"}>
        <Grid item xs={1}>
          hey
        </Grid>
        <Grid item xs={10}>
          <Stack
            height={"100%"}
            direction="column"
            justifyContent="space-between"
            alignItems="center">
            <Typography variant="h3" gutterBottom component="div">
              How is your day going?
            </Typography>

            
            <Paper elevation={2} sx={{ backgroundColor: 'white', width: "100%", height: "60%", opacity: "0.9" }} >

              <Stack
                height={"100%"}
                alignItems="center"
              >

                <div style={{ height: "50%", width: "90%", display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  {/* Text field area */}
                  <TextField id="outlined-basic" label="Outlined" variant="outlined" fullWidth />
                </div>

                {/* Chips Area */}
                <div style={{ height: "50%", width: "95%" }}>
                  <Paper elevation={2} sx={{ height: "95%", display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <div style={{ height: "95%", width: "95%" }}>
                      <Chip 
                        label="Clickable Deletable"
                        onClick={() => console.log('click!')}
                        onDelete={() => console.log('delete!')}
                      />
                    </div>
                  </Paper>
                </div>

              </Stack>
            </Paper>


            <div>C</div>
          </Stack>
        </Grid>
        <Grid item xs={1}>
          see
        </Grid>
      </Grid>
    </>
  );
}

export default App;
