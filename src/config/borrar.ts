import authModel from '../models/profesor.models'
import estudianteModel from '../models/estudiantes.models'
import notaModel from '../models/notas.models'

export const borrarDatos = async () => {
  try {
    await estudianteModel.deleteMany({})
    console.log('Todos los estudiantes han sido eliminados.')

    await authModel.deleteMany({})
    console.log('Todos los profesores han sido eliminados.')
    await notaModel.deleteMany({})
    console.log('Todas las notas han sido eliminados.')
  } catch (error) {
    console.error('Error al borrar los datos:', error)
  }
}
