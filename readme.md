# Weather API

A RESTful API service that provides current weather and forecast data using the OpenWeather API.

## Prerequisites

- Node.js (v18+)
- npm
- OpenWeather API key

## Installation

1. Install dependencies:
```bash
npm install
```

2. Create `.env` file in root directory:
```
OPENWEATHER_API_KEY=your_api_key_here
PORT=3000
NODE_ENV=development
```

## Running the App

Development mode:
```bash
npm run dev
```

Production build:
```bash
npm run build
npm start
```

## API Endpoints

### Get Current Weather
```
GET /v1/weather/:city
```

Example:
```bash
curl http://localhost:3005/v1/weather/London
```

### Get Weather Forecast
```
GET /v1/weather/:city/forecast?days=5
```

Example:
```bash
curl http://localhost:3005/v1/weather/London/forecast?days=5
```

Parameters:
- `days`: Number of forecast days (1-5)

## Testing

Run tests:
```bash
npm test
```

Coverage report:
```bash
npm run test:coverage
```

## Features

- Current weather data
- 5-day weather forecast
- Input validation
- Error handling
- Rate limiting
- Security headers
```
