import { Notas } from '../interface/nota.interface'
import estudianteModel from '../models/estudiantes.models'
import notaModel from '../models/notas.models'
import profesorModel from '../models/profesor.models'

const obtenerNotas = async () => {
  const notas = await notaModel
    .find()
    .populate('estudiante', 'nombre') // Asegúrate de que la colección Estudiantes tiene el campo 'nombre'
    .populate('profesor', 'nombre') // Asegúrate de que la colección Profesor tiene el campo 'nombre'
    .exec() // Ejecuta la consulta

  return notas
}
const obtenerNota = async (id: string) => {
  try {
    // Busca por ID directamente, sin envolver en un objeto
    const nota = await notaModel
      .findById(id) // Solo pasa el ID directamente
      .populate('estudiante', 'nombre') // Relación con Estudiantes
      .populate('profesor', 'nombre') // Relación con Profesor
      .exec()

    if (!nota) {
      return { error: 'No se encontró la nota o el ID es incorrecto' }
    }

    return { nota }
  } catch (error) {
    return { errors: 'Error al buscar la nota', error: error }
  }
}

const crearNotas = async (datos: Notas) => {
  // Implementación para crear notas en la base de datos
  const nuevaNota = new notaModel(datos)
  if (!nuevaNota.profesor && nuevaNota.estudiante)
    return { error: 'No tiene estudiante o profesor' }
  const profesorName = await profesorModel.findById(nuevaNota.profesor)
  if (!profesorName) return { error: 'Profesor no encontrado' }
  const estudianteNombre = await estudianteModel.findById(nuevaNota.estudiante)
  if (!estudianteNombre) return { error: 'Estudiante no encontrado' }
  // Guardar en la base de datos
  const savedNota = await nuevaNota.save() // Asegúrate de guardar el documento

  // Retornar la nota guardada
  return {
    estudiante: `${profesorName.nombre} ${profesorName.apellido}`,
    profesor: `${profesorName.nombre} ${profesorName.apellido}`,
    materia: savedNota.materia,
    calificacion: savedNota.calificacion,
    _id: savedNota._id,
  }
}
const actualizarNota = async (id: string, data: Notas) => {
  const updNota = await notaModel.findByIdAndUpdate(id, data, { new: true })
  if (!updNota) {
    return { error: 'No se encontró la nota o el ID es incorrecto' }
  }
  return { updNota }
}

const eliminarNota = async (id: string) => {
  const resDelete = await notaModel.findByIdAndDelete(id)
  if (!resDelete) return { error: 'No hay tarea' }
  return { resDelete }
}
export { obtenerNotas, crearNotas, actualizarNota, obtenerNota, eliminarNota }
