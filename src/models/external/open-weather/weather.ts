import { z } from 'zod';
import { OWWeatherResponseSchema } from '../../../schemas/external/open-weather/weather';

export type OpenWeatherWeatherResponse = z.infer<typeof OWWeatherResponseSchema>;