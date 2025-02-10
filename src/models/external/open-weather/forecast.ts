import { z } from 'zod';
import { OWForecastResponseSchema } from '../../../schemas/external/open-weather/forecast';


// Type for OpenWeatherMap API Response
export type OpenWeatherForecastResponse = z.infer<typeof OWForecastResponseSchema>; 