import { Response, Request } from 'express'
import {
  actualizarEstudiante,
  crearEstudiantes,
  eliminarEstudiante,
  obtenerEstudiante,
  obtenerEstudiantes,
} from '../services/estudiantes.service'

const getEstudiantes = async (req: Request, res: Response) => {
  try {
    const estudiantes = await obtenerEstudiantes()
    if (!estudiantes || estudiantes.length === 0) {
      res.status(404).json({ message: 'No se encontraron estudiantes' })
      return
    }
    res.status(200).json({ data: estudiantes })
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener estudiantes' })
  }
}

const getEstudiante = async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const estudiante = await obtenerEstudiante(id)
    if (!estudiante) {
      res.status(404).json({ message: 'Estudiante no encontrado' })
    }
    res.status(200).json({ message: 'Estudiante obtenido', data: estudiante })
  } catch (error) {
    console.error('Error al obtener estudiante:', error)
    res.status(500).json({ message: 'Error al obtener estudiante', error })
  }
}

const postEstudiantes = async ({ body }: Request, res: Response) => {
  try {
    const nuevoEstudiante = await crearEstudiantes(body)
    res
      .status(201)
      .json({ message: 'Estudiante creado', data: nuevoEstudiante })
  } catch (error) {
    // Verificar si el error es de Mongoose
    console.log(error)
    res.status(500).json({ message: 'Ocurrió un error inesperado.' })
  }
}

const putEstudiantes = async ({ body, params }: Request, res: Response) => {
  try {
    const { id } = params
    if (!body) {
      res.status(400).json({ message: 'No hay datos para actualizar' })
    }
    const estudianteExistente = await obtenerEstudiante(id)
    if (!estudianteExistente) {
      res.status(404).json({ message: 'Estudiante no encontrado' })
    }
    const estudianteActualizado = await actualizarEstudiante(id, body)
    res
      .status(200)
      .json({ message: 'Estudiante actualizado', data: estudianteActualizado })
  } catch (error) {
    console.error('Error al actualizar estudiante:', error)
    res.status(500).json({ message: 'Error al actualizar estudiante', error })
  }
}

const deleteEstudiantes = async ({ params }: Request, res: Response) => {
  try {
    const { id } = params
    const estudiante = await obtenerEstudiante(id)
    if (!estudiante) {
      res.status(404).json({ message: 'Estudiante no encontrado' })
    }
    const respon = await eliminarEstudiante(id)
    if (respon.error) {
      res.status(400).json(respon.error)
      return
    }
    res.status(200).json({ message: `Estudiante eliminado ${respon.nombre}` })
  } catch (error) {
    console.error('Error al eliminar estudiante:', error)
    res.status(500).json({ message: 'Error al eliminar estudiante', error })
  }
}

export {
  getEstudiantes,
  getEstudiante,
  postEstudiantes,
  putEstudiantes,
  deleteEstudiantes,
}
