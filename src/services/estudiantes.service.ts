import { Estudiantes } from '../interface/estudiantes.interface'
import estudianteModel from '../models/estudiantes.models'

const crearEstudiantes = async (estudiante: Estudiantes) => {
  // código para crear estudiantes
  const crearEstudiantes = await estudianteModel.create(estudiante)
  if (!crearEstudiantes) return { error: 'Estudiante no encontrado' }
  return {
    nombre: crearEstudiantes?.nombre,
    apellido: crearEstudiantes?.apellido,
    grado: crearEstudiantes?.grado,
    genero: crearEstudiantes?.sexo,
    edad: crearEstudiantes?.edad,
  }
}

const obtenerEstudiantes = async () => {
  // código para obtener estudiantes
  const obtenerEstudiantes = await estudianteModel.find()

  return obtenerEstudiantes
}
const obtenerEstudiante = async (id: string) => {
  // código para obtener estudiantes
  const obtenerEstudiante = await estudianteModel.findById({ _id: id })
  if (!obtenerEstudiante) return { error: 'Estudiante no encontrado' }
  return {
    nombre: obtenerEstudiante?.nombre,
    apellido: obtenerEstudiante?.apellido,
    grado: obtenerEstudiante?.grado,
    genero: obtenerEstudiante?.sexo,
    edad: obtenerEstudiante?.edad,
  }
}

const actualizarEstudiante = async (id: string, estuActulizar: Estudiantes) => {
  //código para actualizar estudiantes
  const actualizarEstudiante = await estudianteModel.findByIdAndUpdate(
    id,
    estuActulizar,
    { new: true }
  )
  return actualizarEstudiante
}
const eliminarEstudiante = async (id: string) => {
  //código para eliminar estudiantes
  const eliminarEstudiante = await estudianteModel.findByIdAndDelete(id)
  if (!eliminarEstudiante) return { error: 'Estudiante no encontrado' }
  return { nombre: eliminarEstudiante.nombre }
}

export {
  crearEstudiantes,
  obtenerEstudiantes,
  obtenerEstudiante,
  actualizarEstudiante,
  eliminarEstudiante,
}
