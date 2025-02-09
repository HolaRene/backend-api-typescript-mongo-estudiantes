import { Response, Request } from 'express'
import {
  actualizarNota,
  crearNotas,
  eliminarNota,
  obtenerNota,
  obtenerNotas,
} from '../services/notas.service'
import { verificarJWT } from '../utils/jwt.handle'

const getNotas = async (req: Request, res: Response) => {
  try {
    const notas = await obtenerNotas()
    res.status(200).json({ message: 'Notas obtenidas', data: notas })
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener notas' })
  }
}

const getNotaEstudiante = async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const notaId = await obtenerNota(id)
    if (notaId.error) {
      res.status(404).json({ message: notaId.error })
      return
    }
    res.status(200).json({ message: 'Nota obtenida', data: notaId })
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener estudiante', error })
  }
}

const postNotas = async ({ body, cookies }: Request, res: Response) => {
  try {
    const token = cookies.access_token
    const verfiID = verificarJWT(token)
    const id = verfiID.decoded?.id
    const cuerpo = { ...body, profesor: id }
    const nota = await crearNotas(cuerpo)
    if (nota.error) {
      res
        .status(400)
        .json({ message: 'Error al crear la nota', error: nota.error })
      return
    }
    res.status(201).json({ message: 'Nota guardada', data: nota })
  } catch (error) {
    res.status(500).json({ message: 'Ocurrió un error inesperado.' })
  }
}

const putNotas = async ({ body, params, cookies }: Request, res: Response) => {
  try {
    const { id } = params
    const token = cookies.access_token
    const verfiID = verificarJWT(token)
    const profesorId = verfiID.decoded?.id
    const cuerpo = { ...body, profesor: profesorId }
    console.log(cuerpo)
    const actNota = await actualizarNota(id, cuerpo)

    if (actNota.error) {
      res.status(404).json({ error: actNota.error })
      return // No se continúa con la actualización si hay un error
    }
    res.status(200).json({
      message: 'Estudiante actualizado',
      data: actNota,
    })
  } catch (error) {
    console.error('Error al actualizar estudiante:', error)
    res.status(500).json({ message: 'Error al actualizar estudiante', error })
  }
}

const deleteNotas = async ({ params, cookies }: Request, res: Response) => {
  try {
    const { id } = params
    const token = cookies.access_token
    const verfiID = verificarJWT(token)
    const profesorId = verfiID.decoded?.id
    const notaEli = await eliminarNota(id, profesorId)

    if (notaEli.error) {
      res.status(400).json(notaEli.error)
      return
    }
    res.status(200).json({ message: `nota eliminada` })
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar estudiante', error })
  }
}

export { getNotas, getNotaEstudiante, postNotas, putNotas, deleteNotas }
