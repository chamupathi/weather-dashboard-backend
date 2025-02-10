import express from 'express';
import weatherRouter from './routes/v1/weather';
import { errorHandler } from './middleware/error-handler';
import { configureSecurityMiddleware } from './middleware/security';

export const createApp = () => {
    const app = express()

    // Configure security middleware
    configureSecurityMiddleware(app)

    // Add weather routes
    app.use('/v1/weather', weatherRouter)

    // Error handler
    app.use(errorHandler)

    return app;
}