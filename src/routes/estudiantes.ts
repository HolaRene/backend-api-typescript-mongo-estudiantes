import { Router } from 'express'
import {
  deleteEstudiantes,
  getEstudiante,
  getEstudiantes,
  postEstudiantes,
  putEstudiantes,
} from '../controllers/estudiantes.controller'
import { validarZodEsquema } from '../middlewares/validarZod.schema'
import { estudianteZodSchema } from '../schema/zod.estudiantes.Schema'

const rutas = Router()

rutas.get('/', getEstudiantes)
rutas.get('/:id', getEstudiante)
rutas.post('/', validarZodEsquema(estudianteZodSchema), postEstudiantes)
rutas.put('/:id', validarZodEsquema(estudianteZodSchema), putEstudiantes)
rutas.delete('/:id', deleteEstudiantes)

export { rutas }
