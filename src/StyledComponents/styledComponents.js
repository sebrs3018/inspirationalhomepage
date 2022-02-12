import styled from "@emotion/styled";

export const AsideSection = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100%;
`; 

export const BackgroundImage = styled.div(({url}) => ({
    backgroundImage: `linear-gradient(rgba(255,255,255,0.5), rgba(255,255,255,0.5)), url(${url})`,
    width: '100%',
    height: '100%',
    position: 'absolute',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover', 
    // opacity: 0.7
}));

export const TheySaidSoContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
`;

export const TheySaidSoAttribution = styled.a`
    max-width: 50px;
    max-height: 50px;
`;

export const QuoteContainer = styled.div`
    display: flex;
`;


/*
 display: 'flex', flexDirection: 'column', alignContent: 'center', height: '100%', justifyContent: 'center', alignItems: 'center'

*/