import axios from "axios";

import constants from "../constants/constants.json";
import { OWWeatherResponseSchema } from "../schemas/external/open-weather/weather";
import { OWForecastResponseSchema } from "../schemas/external/open-weather/forecast";
import { OpenWeatherWeatherResponse } from "../models/external/open-weather/weather";
import { OpenWeatherForecastResponse } from "../models/external/open-weather/forecast";
import { AppError } from "../errors/app-error";
import { ZodError } from "zod";


export class WeatherService {
    private readonly apiKey: string;

    constructor() {
        this.apiKey = process.env.OPENWEATHER_API_KEY || '';

        if (!this.apiKey) {
            throw new Error('OpenWeather API key is required');
        }
    }


    async getWeatherByCity(city: string): Promise<OpenWeatherWeatherResponse> {
        try {
            const res = await axios.get(`${constants.openWeather.baseUrl}/weather`, {
                params: {
                    q: city,
                    appid: this.apiKey,
                    units: 'metric',
                }
            })

            const validateData = OWWeatherResponseSchema.parse(res.data)

            return validateData
        } catch (error) {

            if (error instanceof ZodError) {
                console.error('API Response validation failed')
                throw new AppError('Invalid weather data received from API', 500, error.errors)
            }

            if (axios.isAxiosError(error)) {
                if (error.response?.status === 404) {
                    throw new AppError(`City '${city}' not found`, 404);
                }
                throw new AppError(
                    'Failed to fetch weather data',
                    error.response?.status || 500,
                    error.response?.data
                );
            }

            throw new AppError('An unexpected error occurred', 500);

        }

    }

    async getForecastByCity(city: string, days: number): Promise<OpenWeatherForecastResponse> {

        try {
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
        } catch (error) {
            if (error instanceof ZodError) {
                console.error('API Response validation failed:', error.errors);
                throw new AppError('Invalid forecast data received from API', 500, error.errors);
            }
            if (axios.isAxiosError(error)) {
                if (error.response?.status === 404) {
                    throw new AppError(`City '${city}' not found`, 404);
                }
                throw new AppError(
                    'Failed to fetch forecast data',
                    error.response?.status || 500,
                    error.response?.data
                );
            }
            throw new AppError('An unexpected error occurred', 500);
        }

    }
}