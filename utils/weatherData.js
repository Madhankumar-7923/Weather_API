import axios from "axios";
import env from "dotenv";

env.config();

const openweatherApp = {
    BASE_URL: process.env.API_URL,
    API_KEY: process.env.API_KEY,
}

const weatherData = (address, callback) => {
    const url = `${openweatherApp.BASE_URL}${encodeURIComponent(address)}&APPID=${openweatherApp.API_KEY}`;
    console.log(`Requesting weather data from: Weather API`);

    axios.get(url)
        .then(response => {
            callback(null, response.data);
        })
        .catch(error => {
            console.error("Error fetching weather data:", error);
            callback(true, `Unable to fetch data, please try again: ${error.message}`);
        });
}

export default weatherData;