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
  // Verifica si los datos contienen un estudiante y un profesor
  if (!datos.profesor || !datos.estudiante) {
    return { error: 'Falta el estudiante o el profesor' }
  }

  // Validar si el profesor existe
  const profesor = await profesorModel.findById(datos.profesor)
  if (!profesor) {
    return { error: 'Profesor no encontrado' }
  }

  // Verificar si la materia está en el perfil del profesor
  if (!profesor.materias.includes(datos.materia)) {
    return {
      error: `La materia "${datos.materia}" no está asociada al perfil del profesor`,
    }
  }

  // Validar si el estudiante existe
  const estudiante = await estudianteModel.findById(datos.estudiante)
  if (!estudiante) {
    return { error: `Estudiante no encontrado con ID: ${datos.estudiante}` }
  }

  // Verificar si ya existe una nota para el mismo estudiante, materia y profesor
  const notaExistente = await notaModel.findOne({
    profesor: datos.profesor,
    estudiante: datos.estudiante,
    materia: datos.materia,
  })
  if (notaExistente) {
    return {
      error:
        'Ya existe una nota para este estudiante en esta materia con este profesor',
    }
  }

  // Crear y guardar la nueva nota
  const nuevaNota = new notaModel(datos)
  const savedNota = await nuevaNota.save()

  // Retornar la nota guardada
  return {
    estudiante: `${estudiante.nombre} ${estudiante.apellido}`,
    profesor: `${profesor.nombre} ${profesor.apellido}`,
    materia: savedNota.materia,
    calificacion: savedNota.calificacion,
    _id: savedNota._id,
  }
}

const actualizarNota = async (id: string, data: Notas) => {
  const updNota = await notaModel.findByIdAndUpdate(id, data, { new: true })
  const estudiante = await estudianteModel.findById({
    _id: data.estudiante,
  })
  if (!estudiante)
    return { error: 'Estudiante no encontrado', estudiante: estudiante }
  const profesor = await profesorModel.findById({ _id: data.profesor })
  if (!profesor) return { error: 'Profesor no encontrado', profesor: profesor }
  if (estudiante.profesorId.toString() !== profesor?._id.toString()) {
    return {
      error: 'No tienes permiso para actualizar esta nota',
    }
  }
  if (!updNota) {
    return {
      error: `No se encontró la nota o el ID es incorrecto`,
    }
  }

  return { updNota }
}

const eliminarNota = async (id: string, profesorId: string | undefined) => {
  const profesor = await profesorModel.findById(profesorId)
  if (!profesor) return { error: 'Profesor no encontrado' }
  const nota = await notaModel.findById(id)
  if (!nota) return { error: 'No hay Nota' }
  if (profesor?._id.toString() !== nota.profesor._id.toString()) {
    return {
      error: `No tienes permiso para eliminar esta nota ${profesor?._id} y ${nota.profesor}`,
    }
  }
  const resDelete = await notaModel.findByIdAndDelete(id)
  if (!resDelete) return { error: 'No hay tarea' }
  return { resDelete }
}
export { obtenerNotas, crearNotas, actualizarNota, obtenerNota, eliminarNota }
