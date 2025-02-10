import { z } from 'zod';

// OpenWeatherMap API Response Schema
export const OWForecastResponseSchema = z.object({
  list: z.array(z.object({
    dt: z.number(),
    main: z.object({
      temp: z.number(),
      feels_like: z.number(),
      temp_min: z.number(),
      temp_max: z.number(),
      pressure: z.number(),
      humidity: z.number(),
    }),
    weather: z.array(z.object({
      id: z.number(),
      main: z.string(),
      description: z.string(),
      icon: z.string(),
    })),
    clouds: z.object({
      all: z.number(),
    }),
    wind: z.object({
      speed: z.number(),
      deg: z.number(),
    }),
    dt_txt: z.string(),
  })),
  city: z.object({
    id: z.number(),
    name: z.string(),
    coord: z.object({
      lat: z.number(),
      lon: z.number(),
    }),
    country: z.string(),
    timezone: z.number(),
  }),
});
