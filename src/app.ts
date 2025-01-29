import 'dotenv/config'
import express, { Application } from 'express'
import { rutas } from './routes/index'
import cookieParser from 'cookie-parser'
import cors from 'cors'

const app: Application = express()

app.use(cors())
// app.use(
//   cors({
//     credentials: true,
//     origin: 'http://localhost:3000',
//   })
// )
// Middlewares

app.use(express.json()) // Asegúrate de incluir este middleware
app.use(express.urlencoded({ extended: true }))

app.use(cookieParser())
// Rutas
app.use(rutas)

export default app
