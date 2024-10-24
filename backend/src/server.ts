import express from "express"
import morgan from 'morgan'
import dotenv from "dotenv"

dotenv.config()

const app = express()

const PORT = process.env.DEVELOPMENT_PORT || 8080

