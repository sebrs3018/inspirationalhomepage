import React, { useState, useEffect } from "react";




import {
    Paper,
    Grid,
    Modal,
    Button,
    Typography
} from "@mui/material";





import {
    TheySaidSoContainer,
    TheySaidSoAttribution
} from "../../StyledComponents/styledComponents";

import { createTheme, responsiveFontSizes, ThemeProvider } from '@mui/material/styles';

let theme = createTheme();
theme = responsiveFontSizes(theme);

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


//TODO: inserire modal per far vedere l'intera citazione!
export const QuoteOfTheDay = () => {

    const [qod, setQod] = useState(null);

    useEffect(() => {
        if (!qod)
          getQuoteOfTheDay(setQod);
      }, [qod]);


    
    return <Paper sx={{ backgroundColor: 'rgba(207, 203, 202, 0.8)', width: '100%' }}>
        <Grid container spacing={2} wrap={'nowrap'}>
            <Grid item xs={2} lg={1}>
                <TheySaidSoContainer>
                    <TheySaidSoAttribution href="https://theysaidso.com" title="Powered by quotes from theysaidso.com" >
                        <img src="https://theysaidso.com/branding/theysaidso.png" height="auto" width="100%" alt="theysaidso.com" />
                    </TheySaidSoAttribution>
                </TheySaidSoContainer>
            </Grid>
            <Grid item container xs={8} lg={10} m={1} alignItems={'center'} justifyContent={'center'}>
                <ThemeProvider theme={theme}>
                    <Typography variant="subtitle1" gutterBottom noWrap={true} component="div" >
                        {qod?.quote}
                    </Typography>
                    <Typography variant="subtitle1" gutterBottom component="div" >
                        {qod?.author}
                    </Typography>
                </ThemeProvider>
            </Grid>
            <Grid item xs={2} lg={1} container alignItems={'center'}>
                <Button variant="text">
                    <Typography variant="button" gutterBottom display="block" textAlign={"center"}>Learn more</Typography>
                </Button>
            </Grid>

        </Grid>
    </Paper>
}