import { Router } from 'express'
import {
  loginController,
  registroController,
  salirController,
  verificarRequestTOken,
} from '../controllers/auth.controller'
import { validarZodEsquema } from '../middlewares/validarZod.schema'
import { authZodSchema, loginZodSchema } from '../schema/zod.profesor'

const rutas = Router()

// Definimos las rutas de autenticacion de la API

rutas.post('/login', validarZodEsquema(loginZodSchema), loginController)
rutas.post('/registro', validarZodEsquema(authZodSchema), registroController)
rutas.get('/logout', salirController)
rutas.get('/verificar', verificarRequestTOken)

export { rutas }
