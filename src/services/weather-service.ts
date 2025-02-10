import axios from "axios";

import constants from "../constants/constants.json";

export class WeatherService {
    private readonly apiKey: string;

    constructor() {
        this.apiKey = process.env.OPENWEATHER_API_KEY || '';

        if (!this.apiKey) {
            throw new Error('OpenWeather API key is required');
        }
    }


    async getWeatherByCity(city: string) {
        const res = await axios.get(`${constants.openWeather.baseUrl}/weather`, {
            params: {
                q: city,
                appid: this.apiKey,
                units: 'metric',
            }
        })

        return res.data
    }

    async getForecastByCity(city: string, days: number) {

        // Calculate count (8 data points per day as API returns 3-hour intervals)
        const count = days * 8;

        const res = await axios.get(`${constants.openWeather.baseUrl}/forecast`, {
            params: {
                q: city,
                appid: this.apiKey,
                units: 'metric',
                cnt: count
            }
        })

        return res.data
    }
}