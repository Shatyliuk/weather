export class Weather {
    constructor(city) {
        this.apiKey = '2cd1cc3cdda39d30e6a709671b3b688d';
        this.city = city;
    }
    getWeather(city) {
        this.city = city;
        return new Promise((resolve, reject) => {
            fetch(`https://api.openweathermap.org/data/2.5/weather?q=${this.city}&APPID=${this.apiKey}`)
                .then(response => response.json())
                .then(data => resolve(data))
                .catch(err => reject(err) );
        });
    }
    getForecast(city) {
        this.city = city;
        return new Promise((resolve, reject) => {
            fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${this.city}&APPID=${this.apiKey}`)
                .then(response => response.json())
                .then(data => resolve(data))
                .catch(err => reject(err));
        }); 
    }
    static convertToCelsium(kelvin) {
        return Math.floor(kelvin - 273.15);
    }

    changeLocation(city) {
        this.city = city;
    }
}