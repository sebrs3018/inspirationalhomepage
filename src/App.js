import { useSelector, useDispatch } from 'react-redux';
import React, { useEffect } from 'react';
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


/* Theming */
import { createTheme, responsiveFontSizes, ThemeProvider } from '@mui/material/styles';

/* Components */
import { GoalInput } from './app/component/GoalInput';
import { Goals } from './features/goals/Goals';
import { QuoteOfTheDay } from './app/component/QuoteOfTheDay';
import { Weather } from './features/weather/Weather';

/* Selectors and actions */
import { 
  selectCurrentPhotoUrl,
  fetchRandomPhoto,
  previousPhoto
 } from './features/photos/photosSlice';

let theme = createTheme();
theme = responsiveFontSizes(theme);

function App() {

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
      <Weather />
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

            <Paper elevation={1} sx={{ backgroundColor: 'rgba(207, 203, 202, 0.5)', width: "100%", height: "55%" }} >
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
