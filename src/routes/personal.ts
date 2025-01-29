import { Router } from 'express'
import { authMiddleware } from '../middlewares/auth.middleware'
import { inicio } from '../controllers/personal.controller'
import { getEstudiantePorProfesor } from '../controllers/estudiantes.controller'

const rutas = Router()

rutas.get('/', authMiddleware, inicio)
rutas.get('/estudiantes', authMiddleware, getEstudiantePorProfesor)

export { rutas }
