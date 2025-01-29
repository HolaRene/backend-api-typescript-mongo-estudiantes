import { Estudiantes } from '../interface/estudiantes.interface'
import estudianteModel from '../models/estudiantes.models'
import profesorModel from '../models/profesor.models'

const crearEstudiantes = async (estudiante: Estudiantes) => {
  try {
    const profesorInfo = await profesorModel.findById(estudiante.profesorId)
    if (!profesorInfo?.grado.includes(estudiante.grado)) {
      return {
        error:
          'El profesor no puede crear un estudiante distinto del grado suyo',
      }
    }
    // Crear el estudiante en la base de datos
    const nuevoEstudiante = await estudianteModel.create(estudiante)
    // Devolver el objeto completo del estudiante creado
    return { nuevoEstudiante }
  } catch (error) {
    throw error
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
    description: obtenerEstudiante?.description,
    profesorId: obtenerEstudiante?.profesorId,
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

const obtenerEstudiantesPorProfesor = async (
  profesorId: string | undefined
) => {
  // código para obtener estudiantes por profesor
  const obtenerEstudiantes = await estudianteModel.find({
    profesorId: profesorId,
  })
  if (!obtenerEstudiantes)
    return { error: 'No hay estudiantes para este profesor' }
  return obtenerEstudiantes
}
const obtenerEstudiantesPorGrado = async (profesorId: string | undefined) => {
  // código para obtener estudiantes por profesor
  const obtenerEstudiantes = await estudianteModel.find({
    profesorId: profesorId,
  })
  if (!obtenerEstudiantes)
    return { error: 'No hay estudiantes para este profesor' }
  return obtenerEstudiantes
}

export {
  crearEstudiantes,
  obtenerEstudiantes,
  obtenerEstudiante,
  actualizarEstudiante,
  eliminarEstudiante,
  obtenerEstudiantesPorProfesor,
}
