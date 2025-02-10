import dotEnv from "dotenv"
dotEnv.config()

import { createApp } from "./app";

const app = createApp();
const port = process.env.PORT || 3005;
app.listen(port, () => {
    console.log(`server is running at http://localhost:${port}`)
})