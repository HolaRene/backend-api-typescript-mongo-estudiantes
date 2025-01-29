import { Response, Request } from 'express'
import {
  actualizarEstudiante,
  crearEstudiantes,
  eliminarEstudiante,
  obtenerEstudiante,
  obtenerEstudiantes,
  obtenerEstudiantesPorProfesor,
} from '../services/estudiantes.service'
import { verificarJWT } from '../utils/jwt.handle'

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

const getEstudiantePorProfesor = async (req: Request, res: Response) => {
  try {
    const token = req.cookies.access_token

    // Verificar y decodificar el token para obtener el ID del profesor
    const decodedToken = verificarJWT(token)
    const profesorId = decodedToken.decoded?.id // Asume que el ID del profesor está en el token
    const estudiantes = await obtenerEstudiantesPorProfesor(profesorId)
    res.status(200).json({
      message: 'Estudiantes obtenidos del profesor',
      data: estudiantes,
    })
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Error al obtener estudiantes por profesor' })
  }
}

const getEstudiante = async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const estudiante = await obtenerEstudiante(id)
    if (estudiante.error) {
      res.status(404).json({ error: estudiante.error })
      return
    }
    res.status(200).json({ message: 'Estudiante obtenido', data: estudiante })
  } catch (error) {
    console.error('Error al obtener estudiante:', error)
    res.status(500).json({ message: 'Error al obtener estudiante', error })
  }
}

const postEstudiantes = async (req: Request, res: Response) => {
  try {
    // Extraer el token de las cookies
    const token = req.cookies.access_token

    // Verificar y decodificar el token para obtener el ID del profesor
    const decodedToken = verificarJWT(token)
    const profesorId = decodedToken.decoded?.id // Asume que el ID del profesor está en el token

    // Agregar el ID del profesor al cuerpo del estudiante
    const estudianteData = {
      ...req.body,
      profesorId: profesorId, // Asignar el ID del profesor al estudiante
    }

    // Crear el estudiante con el ID del profesor
    const nuevoEstudiante = await crearEstudiantes(estudianteData)
    if (nuevoEstudiante.error) {
      res.status(400).json({ error: nuevoEstudiante.error })
      return
    }

    res
      .status(201)
      .json({ message: 'Estudiante creado', data: nuevoEstudiante })
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Ocurrió un error inesperado.' })
  }
}

const putEstudiantes = async (req: Request, res: Response) => {
  try {
    const { id } = req.params // ID del estudiante a actualizar
    const token = req.cookies.access_token // Token JWT del profesor

    // Verificar y decodificar el token para obtener el ID del profesor
    const decodedToken = verificarJWT(token)
    const profesorId = decodedToken.decoded?.id

    // Obtener el estudiante existente
    const estudianteExistente = await obtenerEstudiante(id)
    // Verificar si el estudiante existe
    if (!estudianteExistente) {
      res.status(404).json({ message: 'Estudiante no encontrado' })
      return
    }

    // Verificar que el estudiante pertenezca al profesor
    if (estudianteExistente.profesorId?.toString() !== profesorId) {
      res
        .status(403)
        .json({ message: 'No tienes permiso para editar este estudiante' })
      return
    }

    // Actualizar el estudiante
    const estudianteActualizado = await actualizarEstudiante(id, req.body)

    res
      .status(200)
      .json({ message: 'Estudiante actualizado', data: estudianteActualizado })
  } catch (error) {
    console.error('Error al actualizar estudiante:', error)
    res.status(500).json({ message: 'Error al actualizar estudiante', error })
  }
}

const deleteEstudiantes = async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const token = req.cookies.access_token

    const decodedToken = verificarJWT(token)
    const profesorId = decodedToken.decoded?.id
    const estudiante = await obtenerEstudiante(id)

    console.log('Estudiante encontrado:', estudiante) // Verifica el estudiante

    if (estudiante.error) {
      res.status(404).json({ error: estudiante.error })
      return
    }

    if (estudiante.profesorId?.toString() !== profesorId) {
      return res
        .status(403)
        .json({ message: 'No tienes permiso para eliminar este estudiante' })
    }

    const respon = await eliminarEstudiante(id)

    if (respon.error) {
      res.status(400).json(respon.error)
      return
    }

    res.status(200).json({ message: `Estudiante eliminado: ${respon.nombre}` })
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
  getEstudiantePorProfesor,
}
