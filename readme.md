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

## Architecture Overview

### Technology Stack

#### Frontend
- **Next.js**: Chosen for its powerful features including:
  - Server-side rendering capabilities
  - Built-in routing
  - Optimized performance
  - TypeScript support
  - Easy deployment

#### Backend
- **Express.js**: Selected as the backend framework to:
  - Provide a standalone API service
  - Enable future extensibility (e.g., mobile app backend)
  - Handle API routing and middleware effectively
  - Support TypeScript for type safety

### Key Architectural Decisions

#### Service Layer Pattern
- External API communications (OpenWeather) are abstracted into service classes
- Benefits:
  - Separation of concerns
  - Easier testing through mocking
  - Centralized API configuration
  - Simplified error handling
  - Easy to swap external providers if needed

#### API Versioning
- Routes are versioned (e.g., `/api/v1/weather`)
- Ensures:
  - Backward compatibility
  - Future API evolution without breaking existing clients
  - Clear documentation and maintenance

#### Error Handling
- Centralized error handling using custom error classes
- Consistent error responses across the application
- Types of errors:
  - `AppError`: Base error class for application-specific errors
  - HTTP status codes mapped to appropriate error responses
  - Validation errors with detailed feedback