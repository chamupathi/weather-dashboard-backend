import axios from "axios";

import constants from "../constants/constants.json";
import { OWWeatherResponseSchema } from "../schemas/external/open-weather/weather";
import { OWForecastResponseSchema } from "../schemas/external/open-weather/forecast";
import { OpenWeatherWeatherResponse } from "../models/external/open-weather/weather";
import { OpenWeatherForecastResponse } from "../models/external/open-weather/forecast";


export class WeatherService {
    private readonly apiKey: string;

    constructor() {
        this.apiKey = process.env.OPENWEATHER_API_KEY || '';

        if (!this.apiKey) {
            throw new Error('OpenWeather API key is required');
        }
    }


    async getWeatherByCity(city: string): Promise<OpenWeatherWeatherResponse> {
        const res = await axios.get(`${constants.openWeather.baseUrl}/weather`, {
            params: {
                q: city,
                appid: this.apiKey,
                units: 'metric',
            }
        })

        const validateData = OWWeatherResponseSchema.parse(res.data)

        return validateData
    }

    async getForecastByCity(city: string, days: number):Promise<OpenWeatherForecastResponse> {

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

        const validateData = OWForecastResponseSchema.parse(res.data)

        return validateData
    }
}