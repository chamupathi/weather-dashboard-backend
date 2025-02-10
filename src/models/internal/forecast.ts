import { z } from 'zod';
import { ForecastQuerySchema } from '../../schemas/internal/forecast';

export type ForecastQueryParams = z.infer<typeof ForecastQuerySchema>; 

export interface ForecastItem {
  dt: number;
  main: {
    temp_min: number;
    temp_max: number;
    temp: number;
    humidity: number;
  };
  weather: Array<{
    main: string;
    description: string;
    icon: string;
  }>;
  wind: {
    speed: number;
    deg: number;
  };
}

export interface ForecastResponse {
  list: ForecastItem[];
  city: {
    name: string;
    country: string;
  };
}

export interface DailyForecast {
  date: string;
  city: string;
  country: string;
  temperature: {
    min: number;
    max: number;
    average: number;
  };
  weather: {
    main: string;
    description: string;
    icon: string;
  };
  wind: {
    speed: number;
    deg: number;
  };
  humidity: number;
} 