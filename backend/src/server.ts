import express from "express"
import morgan from 'morgan'
import dotenv from "dotenv"
import swaggerUI from "swagger-ui-express"
import swaggerDocument from "../swagger.json"
import cors from "cors"
import helmet from "helmet"

import loggerMiddleware from "./middlewares/loggerMiddleware"
import router from "./routes"
import { corsConfig } from "./utils/util"

dotenv.config()

const app = express()

const PORT = process.env.DEVELOPMENT_PORT || 8080

app.use(morgan('dev'))

app.use(loggerMiddleware)

app.use(helmet())

app.use(cors(corsConfig()))

app.get('/health', (req, res) => {
    res.send('Health Check');
});

app.use("/api/v1", router)

app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument));

app.use((req, res) => {
    res.status(404).json({ message: "Route not found" });
});


app.listen(PORT, () => {
    console.log(`Server is running on PORT ${PORT}`);
});



export default app

