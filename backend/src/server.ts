import express from "express"
import morgan from 'morgan'
import dotenv from "dotenv"
import swaggerUI from "swagger-ui-express"
import swaggerDocument from "../swagger.json"

dotenv.config()

const app = express()

const PORT = process.env.DEVELOPMENT_PORT || 8080

app.use(morgan('dev'))

app.get('/health', (req, res) => {
    res.send('Health Check');
});

app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument));

app.listen(PORT, () => {
    console.log(`Server is running on PORT ${PORT}`);
});


export default app

