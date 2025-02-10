import { Router } from "express";
import { WeatherService } from "../../services/weather-service";

const router = Router()
const weatherService = new WeatherService()

router.get("/:city", async(req, res) => {
    const { city } = req.params;

    const weather = await weatherService.getWeatherByCity(city)
    res.json(weather);
})

router.get("/:city/forecasts", async(req, res) => {
    const { city } = req.params;

    const forecast = await weatherService.getForecastByCity(city, 3)
    res.json(forecast);
})

export default router;