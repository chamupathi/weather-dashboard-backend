import request from 'supertest';
import { Express } from 'express';
import nock from 'nock';

import { mockWeatherResponse, mockForecastResponse } from '../mocks/weather';
import { createApp } from '../../app';

describe('Weather API Integration', () => {
  let app: Express;

  beforeAll(() => {
    process.env.OPENWEATHER_API_KEY = 'test-api-key';
    app = createApp();
  });

  beforeEach(() => {
    nock.cleanAll();
  });

  afterAll(() => {
    delete process.env.OPENWEATHER_API_KEY;
  });

  it('should get current weather', async () => {
    nock('https://api.openweathermap.org')
      .get('/data/2.5/weather')
      .query(true)
      .reply(200, mockWeatherResponse);

    const response = await request(app)
      .get('/v1/weather/London')
      .expect(200);

    expect(response.body.name).toBe("London");
  });

  it('should get forecast', async () => {
    nock('https://api.openweathermap.org')
      .get('/data/2.5/forecast')
      .query(true)
      .reply(200, mockForecastResponse);

    const response = await request(app)
      .get('/v1/weather/London/forecast?days=3')
      .expect(200);

    expect(response.body.length).toBe(3);
    expect(response.body[0].city).toBe("Galle");
    expect(response.body[0].country).toBe("LK");
    expect(response.body[0].humidity).toBe(85);
  });
}); 