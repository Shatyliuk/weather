import {
    Weather
} from "./weather";

export class Ui {
    constructor() {
        this.app = document.getElementById('app');
        this.weatherContainer = document.getElementById('weather');
        this.forecastContainer = document.getElementById('forecast');
        this.cityName = document.createElement('h2');
    }
    showCurrentLocation(weatherData) {
        if(app.querySelector('.cityName')) {
            app.querySelector('.cityName').remove();
        } 
        if(weatherData.cod == 200) {
            this.cityName.className = 'cityName';
            this.cityName.textContent = `${weatherData.name}, ${weatherData.sys.country}`;
            app.querySelector('.cardHeading').appendChild(this.cityName);
        }
    }
    showCurrentWeather(weatherData) {
        let output = `
            <ul class='collection with-header left-align'>
                <li class="collection-header"><h4>Current weather in ${weatherData.name}:</h4></li>
                <li class='collection-item'>Weather condition: ${weatherData.weather[0].description}</li>
                <li class='collection-item'>Humidity: ${weatherData.main.humidity}, %</li>
                <li class='collection-item'>Current temperature: ${Weather.convertToCelsium(weatherData.main.temp)}, C</li>
                <li class='collection-item'>Pressure: ${weatherData.main.pressure}, hPa</li>
                <li class='collection-item'>Wind speed: ${weatherData.wind.speed}, meter/sec</li>
                <li class='collection-item'>Cloudiness: ${weatherData.clouds.all}, %</li>
            </ul>
        `;
        this.weatherContainer.innerHTML = output;
    }

    showForecast(weatherData) {
        const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        let output = ``;
        weatherData.list.forEach((item) => {
            let time = new Date(item.dt_txt);
            
            output += `
            <ul class='collection left-align'>
                <li class='collection-item'>
                    <h5>${months[time.getMonth()]} ${time.getDate()}, ${time.getHours()}:${time.getMinutes()}0</h4>
                </li>
                <li class='collection-item'>
                    <p>Temperature: ${Weather.convertToCelsium(item.main.temp)}, C</p>
                </li>
                <li class='collection-item'>
                    <p>Humidity: ${item.main.humidity}, %</p>
                </li>
                <li class='collection-item'>
                    <p>Pressure: ${item.main.pressure}, hPa</p>
                </li>
                <li class='collection-item'>
                    <p>Cloudiness: ${item.clouds.all}, %</p>
                </li>
                <li class='collection-item'>
                    <p>Wind speed: ${item.wind.speed}, meter/sec</p>
                </li>
            </ul>
        `;
        });
        this.forecastContainer.innerHTML = output;
    }

    showCircularLoading(container) {
        let loading = `
        <div class="preloader-wrapper active">
            <div class="spinner-layer spinner-red-only">
                <div class="circle-clipper left">
                    <div class="circle"></div>
                </div><div class="gap-patch">
                    <div class="circle"></div>
                </div><div class="circle-clipper right">
                    <div class="circle"></div>
                </div>
            </div>
        </div>
        `;
        container.innerHTML = loading;
    }
}