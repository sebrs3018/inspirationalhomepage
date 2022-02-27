import React, { useState, useEffect } from "react";
import { QuoteModal } from "./QuoteModal";

import {
    Paper,
    Grid,
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
            <Grid item container xs={8} lg={10} m={1}>
                <ThemeProvider theme={theme}>
                    <Grid item xs={12}>
                        <Typography variant="subtitle1" gutterBottom textAlign={'center'} component="div" >
                            {qod?.quote}
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="subtitle1" gutterBottom textAlign={'center'} component="div" >
                            {qod?.author}
                        </Typography>
                    </Grid>
                </ThemeProvider>
            </Grid>
            <Grid item xs={2} lg={1} container alignItems={'center'}>
                <QuoteModal
                    buttonText={'Learn more'}
                    headerText={'Quote of the day'}
                    quoteText={qod?.quote}
                    quoteAuthor={qod?.author}
                />
            </Grid>

        </Grid>
    </Paper>
}