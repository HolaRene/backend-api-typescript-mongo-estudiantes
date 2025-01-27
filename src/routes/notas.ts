import { Router } from 'express'
import {
  deleteNotas,
  getNotaEstudiante,
  getNotas,
  postNotas,
  putNotas,
} from '../controllers/notas.controller'
import { validarZodEsquema } from '../middlewares/validarZod.schema'
import { notaSchema } from '../schema/zod.nota'
import { authMiddleware } from '../middlewares/auth.middleware'

const rutas = Router()

rutas.get('/', getNotas)
// rutas.get('/:id', authMiddleware, getNotaEstudiante)
rutas.get('/:id', getNotaEstudiante)
// rutas.post('/', validarZodEsquema(notaSchema), authMiddleware, postNotas)
rutas.post('/', validarZodEsquema(notaSchema), postNotas)
// rutas.put('/:id', validarZodEsquema(notaSchema), authMiddleware, putNotas)
rutas.put('/:id', validarZodEsquema(notaSchema), putNotas)
rutas.delete('/:id', authMiddleware, deleteNotas)

export { rutas }
