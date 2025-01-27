import authModel from '../models/profesor.models'
import estudianteModel from '../models/estudiantes.models'

export const borrarDatos = async () => {
  try {
    await estudianteModel.deleteMany({})
    console.log('Todos los estudiantes han sido eliminados.')

    await authModel.deleteMany({})
    console.log('Todos los profesores han sido eliminados.')
  } catch (error) {
    console.error('Error al borrar los datos:', error)
  }
}
