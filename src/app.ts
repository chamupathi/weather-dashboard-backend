import express from 'express';
import weatherRouter from './routes/v1/weather';
import { errorHandler } from './middleware/error-handler';

export const createApp = () => {
    const app = express()

    app.get('/', (req, res) => {
        res.send("hello")
    })

    app.use('/v1/weather', weatherRouter)

    app.use(errorHandler)

    return app;
}