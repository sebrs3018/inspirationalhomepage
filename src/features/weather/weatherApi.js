const weatherApiKey = '6e95be333e976ec7511e4989d48958fe';

const GeolocationPermissionDenied = function (message) {
    this.message = message
};

const getCurrentPositionAsync = () => {
    return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition((position) => {
            let res = null;
            res = {
                lat: position.coords.latitude,
                long: position.coords.longitude
            }
            resolve(res)
        }, (error) => {
            //It's interesting to notice that when the promise is rejected, than in a try catch block, the rejection will be captured by the catch block!
            reject(new GeolocationPermissionDenied(error.message))
        });
    })
}


export const getWeatherByCityName = async (cityName) => {
    if (!cityName) return null;
    cityName = cityName.toLowerCase();
    let data = null;
    try {
        const position = await getCurrentPositionAsync();
        data = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${position.lat}&lon=${position.long}&appid=${weatherApiKey}&units=metric`)
    }
    catch (err) {
        if (err instanceof GeolocationPermissionDenied) {
            //The default weater is Sevilla!
            data = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${weatherApiKey}&units=metric`);
        }
    }
    const json = await data.json();
    const { weather, main } = json;
    return { iconName: weather[0].main, description: weather[0].description, temperature: main.temp };
}
