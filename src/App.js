import React, { useEffect, useState } from 'react';
import './App.css';
import { createApi } from 'unsplash-js';
import {
  Grid,
  Stack,
  Paper,
  IconButton,
  Button
} from '@mui/material';

import Typography from '@mui/material/Typography';

/* Styled components */
import {
  AsideSection,
  TheySaidSoContainer,
  TheySaidSoAttribution
} from './StyledComponents/styledComponents';



/* Icons */
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import WbCloudyIcon from '@mui/icons-material/WbCloudy';


/* Theming */
import { createTheme, responsiveFontSizes, ThemeProvider } from '@mui/material/styles';
import { GoalInput } from './app/component/GoalInput';
import { Goals } from './features/goals/Goals';


let theme = createTheme();
theme = responsiveFontSizes(theme);

const weatherApiKey = '6e95be333e976ec7511e4989d48958fe';

const unsplash = createApi({
  accessKey: 'nvsbiflO7X6Hlunn1K1KCQtJAb-bb79xr0LLQgAnndE',
  fetch: fetch,
});


const getRandomPhotoAsync = async (setUrlFunc) => {
  try {
    const result = await unsplash.photos.getRandom();
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

const getWeatherByCityName = async (cityName, setWeather) => {
  if (!cityName) return null;
  cityName = cityName.toLowerCase();

  try {
    const data = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${weatherApiKey}&units=metric`);
    if (data.ok) {
      const json = await data.json();
      const { weather, main } = json;
      setWeather({ iconName: weather[0].main, description: weather[0].description, temperature: main.temp });
    }
    else {
      console.log('smt bad happened!');
      // return null;
    }
  }
  catch (err) {

  }
}


const QuotesApiUrl = 'https://quotes.rest/qod?category=inspire&language=en';

const getQuoteOfTheDay = async (setQuote) => {
  try {
    const data = await fetch(QuotesApiUrl);
    const json = await data.json();
    const { quotes } = json.contents;
    const { quote, author } = quotes[0];  //Getting the single quote of the day
    setQuote({ quote, author });
  }
  catch (err) {

  }
};


function App() {

  const [randomPhoto, setRandomPhoto] = useState(''); //Da gestire con redux
  const [qod, setQod] = useState(null);
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    if (!randomPhoto) {
      getRandomPhotoAsync(setRandomPhoto);
    }
  }, [randomPhoto]);

  useEffect(() => {
    if (!qod)
      getQuoteOfTheDay(setQod);
  }, [qod]);

  useEffect(() => {
    if (!weather)
      console.log('hey');

    // getWeatherByCityName('sevilla', setWeather);
  }, [weather]);



  const styles = {
    testBackground: {
      backgroundImage:
        `linear-gradient(rgba(255,255,255,0.5), rgba(255,255,255,0.5)), url(${randomPhoto})`,
      backgroundSize: "cover",
      backgroundPosition: "center",
    }
  };




  return (
    <>
      <div style={{ position: 'absolute', right: 20, top: 20 }}>
        <Paper elevation={1} sx={{ backgroundColor: 'rgba(40, 175, 176, 0.8)', color: 'white' }}>
          <Grid container px={2} py={2} >
            <Grid item xs={6} sx={{ alignSelf: 'center' }}>
              <div style={{ display: 'flex', justifyContent: 'center' }}>
                <WbCloudyIcon fontSize='large' />
              </div>
            </Grid>
            <Grid item container xs={6} alignItems='center' spacing={2}>
              <Grid item xs={12}>
                {/* {`${weather.temperature}°C`} */}
                8.96°C
              </Grid>
              <Grid item xs={12}>
                {/* {weather.description} */}
                Clear Sky
              </Grid>
            </Grid>
          </Grid>
        </Paper>
      </div>




      <Grid container spacing={2}
        marginTop={0}
        paddingBottom={2}
        height={"100%"}
        style={styles.testBackground}
      >
        {/* Previous Slide Section */}
        <Grid item xs={1}>
          <AsideSection>
            <IconButton aria-label='previous foto' sx={{ maxWidth: 50 }}>
              <ArrowBackIosNewIcon fontSize='large' />
            </IconButton>
          </AsideSection>
        </Grid>
        {/* Middle content area */}
        <Grid item xs={10}>
          <Stack
            spacing={2}
            height={"100%"}
            direction="column"
            justifyContent="space-around"
            alignItems="center">
            <ThemeProvider theme={theme}>
              <Typography variant="h3" gutterBottom component="div" color={'#8F3D52'}>
                How is your day going?
              </Typography>
            </ThemeProvider>
            <Paper elevation={1} sx={{ backgroundColor: 'rgba(2, 195, 154, 0.9)', width: "100%", height: "55%" }} >
              <Stack
                height={"100%"}
                alignItems="center"
              >
                <div style={{ height: "30%", width: "90%", display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <GoalInput />

                </div>

                {/* Chips Area */}
                <Goals />

              </Stack>
            </Paper>

            <Grid container spacing={2}>

              <Grid item xs={1}>
                <TheySaidSoContainer>
                  <TheySaidSoAttribution href="https://theysaidso.com" title="Powered by quotes from theysaidso.com" >
                    <img src="https://theysaidso.com/branding/theysaidso.png" height="auto" width="100%" alt="theysaidso.com" />
                  </TheySaidSoAttribution>
                </TheySaidSoContainer>
              </Grid>
              <Grid item xs={10}>
                <ThemeProvider theme={theme}>
                  <Typography variant="subtitle1" gutterBottom noWrap={true} component="div" textAlign={"center"}>
                    {qod?.quote}
                  </Typography>
                  <Typography variant="subtitle1" gutterBottom component="div" textAlign={"center"}>
                    {qod?.author}
                  </Typography>
                </ThemeProvider>
              </Grid>
              <Grid item xs={1}>
                <Button variant="text">
                  {/* TODO: quando vi sono troppe parole, far comparire questo pulsante il quale in seguito al click deve mostrare il testo che la citazione contiene */}
                  <Typography variant="button" gutterBottom display="block" textAlign={"center"}>Learn more</Typography>
                </Button>
              </Grid>
            </Grid>
          </Stack>
        </Grid>
        {/* Next Slide Section */}
        <Grid item xs={1}>
          <AsideSection>
            <IconButton aria-label='previous foto' sx={{ maxWidth: 50 }}>
              <ArrowForwardIosIcon fontSize='large' />
            </IconButton>
          </AsideSection>
        </Grid>
      </Grid>
    </>
  );
}

export default App;
