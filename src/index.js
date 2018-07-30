import 'normalize.css';
import './sass/main.sass';
import {
    Weather
} from './js/weather';
import {
    Ui
} from './js/ui';
import {
    Storage
} from './js/storage';

const storage = new Storage();
const weatherLocation = storage.getLocationData();
const weather = new Weather(weatherLocation);
const ui = new Ui();
$('.tabs').tabs();


document.addEventListener('DOMContentLoaded', getWeather(weatherLocation));
document.getElementById('city').addEventListener('keyup', changeLocation)

function getWeather(city) {
    ui.showCircularLoading(ui.weatherContainer);

    weather.getWeather(city)
        .then(weatherData => {
            if (weatherData.cod == 200) {
                ui.showCurrentLocation(weatherData);
                setTimeout(() => {
                    ui.showCurrentWeather(weatherData);
                }, 1000)
            } else {
                ui.weatherContainer.innerHTML = 'NOT FOUND';
            }
        })
    ui.showCircularLoading(ui.forecastContainer);

    weather.getForecast(city)
        .then(weatherData => {
            if (weatherData.cod == 200) {
                setTimeout(() => {
                    ui.showForecast(weatherData);
                }, 1000)
            } else {
                ui.forecastContainer.innerHTML = 'NOT FOUND';
            }
        })
}

function changeLocation(event) {
    event.preventDefault();

    if (event.keyCode == 13) getWeather(this.value);
    storage.setLocationData(this.value);
}