import { AuthLogin } from '../interface/auth.interface'
import authModel from '../models/profesor.models'

const obtenerProfesores = async () => {
  // código para obtener estudiantes
  const obtenerProfesores = await authModel.find()
  if (!obtenerProfesores) return { error: 'No hay maestros' }
  return { obtenerProfesores }
}
const obtenerProfesor = async (id: string) => {
  // código para obtener estudiantes
  const obtenerProfesor = await authModel.findById({ _id: id })
  if (!obtenerProfesor) return { error: 'Profesor no encontrado' }
  return { obtenerProfesor }
}

const actualizarProf = async (id: string, estuProfesor: AuthLogin) => {
  //código para actualizar estudiantes
  const actualizarProfesor = await authModel.findByIdAndUpdate(
    id,
    estuProfesor,
    { new: true }
  )
  if (!actualizarProfesor) return { error: ' No hay actualizar profesor' }
  return { actualizarProfesor }
}
const eliminarProf = async (id: string) => {
  //código para eliminar estudiantes
  const eliminarProfesor = await authModel.findByIdAndDelete(id)
  if (!eliminarProfesor) return { error: 'Profesor no encontrado' }
  return { nombre: eliminarProfesor.nombre }
}
export { obtenerProfesor, obtenerProfesores, eliminarProf, actualizarProf }
