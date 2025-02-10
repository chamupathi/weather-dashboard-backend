import { NextFunction, Response, Request, Router } from "express";
import { WeatherService } from "../../services/weather-service";
import { ForecastQuerySchema } from "../../schemas/internal/forecast";
import { transformForecastData } from "../../utils/forecast-transformer";

const router = Router()
const weatherService = new WeatherService()

router.get("/:city", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { city } = req.params;

        const weather = await weatherService.getWeatherByCity(city)

        res.json(weather);
    } catch (error) {
        next(error)
    }

})

router.get("/:city/forecast", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { city } = req.params;

        const { days } = ForecastQuerySchema.parse({ days: req.query.days })

        const forecast = await weatherService.getForecastByCity(city, days)

        const dailyForecasts = transformForecastData(forecast, days);

        res.json(dailyForecasts);
    } catch (error) {
        next(error)
    }

})

export default router;