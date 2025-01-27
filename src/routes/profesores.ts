import { Router } from 'express'
import {
  actualizarProfesor,
  eliminarProfesor,
  getProfesores,
  getProfesorPorId,
} from '../controllers/profesores.controller'

const rutas = Router()

rutas.get('/', getProfesores)
rutas.get('/:id', getProfesorPorId)
rutas.delete('/:id', eliminarProfesor)
rutas.put('/:id', actualizarProfesor)

export { rutas }
