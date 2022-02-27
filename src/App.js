import { useSelector, useDispatch } from 'react-redux';
import React, { useEffect, useState } from 'react';
import './App.css';
import {
  Grid,
  Stack,
  Paper,
  IconButton,
  Typography
} from '@mui/material';


/* Styled components */
import {
  AsideSection
} from './StyledComponents/styledComponents';

/* Icons */
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import WbCloudyIcon from '@mui/icons-material/WbCloudy';


/* Theming */
import { createTheme, responsiveFontSizes, ThemeProvider } from '@mui/material/styles';
import { GoalInput } from './app/component/GoalInput';
import { Goals } from './features/goals/Goals';
import { QuoteOfTheDay } from './app/component/QuoteOfTheDay';


/* Selectors and actions */
import { 
  selectCurrentPhotoUrl,
  fetchRandomPhoto,
  previousPhoto
 } from './features/photos/photosSlice';



let theme = createTheme();
theme = responsiveFontSizes(theme);

const weatherApiKey = '6e95be333e976ec7511e4989d48958fe';

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


function App() {

  const [weather, setWeather] = useState(null);

  const dispatch = useDispatch();
  let randomPhoto = useSelector(selectCurrentPhotoUrl);


  const handleNextClick = () => {
    dispatch(fetchRandomPhoto());
  }

  const handlePrevClick = () => {
    dispatch(previousPhoto({id: randomPhoto?.id}));
  }


  useEffect(() => {
    if (!randomPhoto || Object.keys(randomPhoto).length === 0) {
      dispatch(fetchRandomPhoto());
    }
  }, []);


  useEffect(() => {
    if (!weather)
      console.log('hey');

    // getWeatherByCityName('sevilla', setWeather);
  }, [weather]);


  const styles = {
    testBackground: {
      backgroundImage:
        `linear-gradient(rgba(255,255,255,0.1), rgba(255,255,255,0.1)), url(${randomPhoto?.url})`,
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
            <IconButton aria-label='previous foto' sx={{ maxWidth: 50 }} onClick={handlePrevClick}>
              <ArrowBackIosNewIcon fontSize='large' />
            </IconButton>
          </AsideSection>
        </Grid>
        {/* Middle content area */}
        <Grid item xs={10}>

          <Stack
            height={"100%"}
            direction="column"
            justifyContent="space-around"
            alignItems="center">

            <Paper sx={{ backgroundColor: 'rgba(207, 203, 202, 0.5)' }}>
              <ThemeProvider theme={theme}>
                <Typography variant="h3" gutterBottom component="div" m={2} color={'#8F3D52'}>
                  How is your day going?
                </Typography>
              </ThemeProvider>
            </Paper>

            <Paper elevation={1} sx={{ backgroundColor: 'rgba(207, 203, 202, 0.9)', width: "100%", height: "55%" }} >
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

            <QuoteOfTheDay />
            
          </Stack>
        </Grid>
        {/* Next Slide Section */}
        <Grid item xs={1}>
          <AsideSection>
            <IconButton aria-label='previous foto' sx={{ maxWidth: 50 }} onClick={ handleNextClick }>
              <ArrowForwardIosIcon fontSize='large' />
            </IconButton>
          </AsideSection>
        </Grid>
      </Grid>

    </>
  );
}

export default App;
