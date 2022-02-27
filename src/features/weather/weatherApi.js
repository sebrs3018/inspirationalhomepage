const weatherApiKey = '6e95be333e976ec7511e4989d48958fe';

export const getWeatherByCityName = async (cityName) => {
    // console.log(cityName);

    if (!cityName) return null;
    cityName = cityName.toLowerCase();
    try {
        const data = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${weatherApiKey}&units=metric`);
        // if (data.ok) {
        const json = await data.json();
        const { weather, main } = json;
        return { iconName: weather[0].main, description: weather[0].description, temperature: main.temp };
    }
    // else {
    //   console.log('smt bad happened!');
    // return null;
    // }
    //   }
    catch (err) {
        console.log(err);
    }
}
