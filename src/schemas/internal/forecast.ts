import { z } from 'zod';

export const ForecastQuerySchema = z.object({
  days: z.string()
    .transform(Number)
    .pipe(
      z.number()
        .min(1, 'Minimum forecast days is 1')
        .max(5, 'Maximum forecast days is 5')
    )
    .optional()
    .default('3')
});
