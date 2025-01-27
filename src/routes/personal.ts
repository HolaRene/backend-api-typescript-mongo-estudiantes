import { Router } from 'express'
import { authMiddleware } from '../middlewares/auth.middleware'
import { inicio } from '../controllers/personal.controller'

const rutas = Router()

rutas.get('/', authMiddleware, inicio)

export { rutas }
