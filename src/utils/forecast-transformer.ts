import { ForecastResponse, DailyForecast } from '../models/internal/forecast';

export function transformForecastData(forecast: ForecastResponse, days: number): DailyForecast[] {

    // Transformation logic is from chat GPT
    return forecast.list.reduce((acc: DailyForecast[], item) => {
        const date = new Date(item.dt * 1000).toLocaleDateString();

        if (!acc.find(f => f.date === date)) {
            acc.push({
                date,
                city: forecast.city.name,
                country: forecast.city.country,
                temperature: {
                    min: item.main.temp_min,
                    max: item.main.temp_max,
                    average: item.main.temp
                },
                weather: {
                    main: item.weather[0].main,
                    description: item.weather[0].description,
                    icon: item.weather[0].icon
                },
                wind: item.wind,
                humidity: item.main.humidity
            });
        }
        return acc;
    }, []).slice(0, days);
} 