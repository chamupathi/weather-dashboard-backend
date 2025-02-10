import { transformForecastData } from '../forecast-transformer';
import { mockForecastResponse } from '../../test/mocks/weather';

describe('forecastTransformer', () => {
  it('should transform forecast data correctly', () => {
    const result = transformForecastData(mockForecastResponse, 3);

    expect(result).toHaveLength(3);
    expect(result[0]).toMatchObject({
      date: expect.any(String),
      temperature: {
        min: expect.any(Number),
        max: expect.any(Number),
        average: expect.any(Number)
      }
    });
  });
}); 