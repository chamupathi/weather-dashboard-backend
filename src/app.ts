import express from 'express';
import weatherRouter from './routes/v1/weather';

export const createApp = () => {
    const app = express()

    app.get('/', (req, res) => {
        res.send("hello")
    })

    app.use('/v1/weather', weatherRouter)

    return app;
}